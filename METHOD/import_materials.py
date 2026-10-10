#!/usr/bin/env python3
"""Importatore risolutivo per la libreria del Metodo 21 Universale.

Copia ogni sorgente come capsula autonoma, conserva le varianti HTML, prova a
localizzare le dipendenze remote e ripara i riferimenti locali quando esiste
un solo candidato affidabile. Il risultato viene consumato da MaterialHost.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlsplit

from _material_reader import catalog_material, clean_local_ref, iter_files, read_text


BRIDGE_NAME = "_method_capsule_bridge.js"
OFFLINE_MARKER = "method21-offline"
OFFLINE_META = (
    '<meta name="method21-offline" content="true">\n'
    '<meta http-equiv="Content-Security-Policy" content="default-src \'self\' data: blob:; '
    'script-src \'self\' \'unsafe-inline\' blob:; style-src \'self\' \'unsafe-inline\'; '
    'img-src \'self\' data: blob:; media-src \'self\' data: blob:; font-src \'self\' data:; '
    'connect-src \'self\'; worker-src \'self\' blob:; frame-src \'none\'; object-src \'none\'; base-uri \'self\'">'
)
BRIDGE_SOURCE = r"""(function () {
  'use strict';
  function send(type, value) {
    try { parent.postMessage({ source: 'metodo21-capsule', type: type, value: value, message: value }, '*'); }
    catch (_) {}
  }
  function height() {
    var body = document.body, root = document.documentElement;
    var value = Math.max(
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0,
      root ? root.scrollHeight : 0,
      root ? root.offsetHeight : 0,
      window.innerHeight || 0
    );
    send('height', value);
  }
  window.addEventListener('error', function (event) { send('error', event.message || 'Errore runtime nella capsula'); });
  window.addEventListener('unhandledrejection', function (event) {
    send('error', event.reason && event.reason.message ? event.reason.message : String(event.reason || 'Promise rifiutata'));
  });
  window.addEventListener('load', function () { send('ready', true); height(); });
  window.addEventListener('resize', height);
  document.addEventListener('click', function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    try {
      var target = new URL(anchor.href, location.href);
      if (target.origin !== location.origin) {
        event.preventDefault();
        event.stopPropagation();
        send('external-link-blocked', target.href);
      }
    } catch (_) {}
  }, true);
  if (window.ResizeObserver) new ResizeObserver(height).observe(document.documentElement);
  setTimeout(height, 0);
})();
"""


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "materiale"


def unique_slug(base: str, used: set[str]) -> str:
    slug = base
    number = 2
    while slug in used:
        slug = f"{base}-{number}"
        number += 1
    used.add(slug)
    return slug


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def choose_entrypoints(root: Path) -> list[Path]:
    entries = [
        path for path in root.rglob("*")
        if path.is_file()
        and not any(part in {".git", "node_modules", ".cache", ".parcel-cache"} for part in path.parts)
        if path.suffix.lower() in {".html", ".htm"} and path.name.lower().startswith("index")
    ]
    return sorted(
        entries,
        key=lambda path: (
            0 if path.name.lower() in {"index.html", "index.htm"} else 1,
            len(path.relative_to(root).parts),
            str(path.relative_to(root)).lower(),
        ),
    )


def has_direct_entrypoint(root: Path) -> bool:
    return any(
        path.is_file() and path.suffix.lower() in {".html", ".htm"} and path.name.lower().startswith("index")
        for path in root.iterdir()
    )


def copy_source(source: Path, target: Path) -> None:
    ignored = shutil.ignore_patterns(".git", "node_modules", ".cache", ".parcel-cache", ".DS_Store")
    shutil.copytree(source, target, dirs_exist_ok=True, ignore=ignored)


def built_entrypoints(root: Path) -> list[Path]:
    candidates = []
    for folder in ("dist", "build", "public-build", "out"):
        output = root / folder
        if output.is_dir():
            candidates.extend(choose_entrypoints(output))
    return sorted(candidates, key=lambda path: (len(path.parts), str(path).lower()))


def run_package_build(root: Path, enabled: bool) -> dict:
    package_path = root / "package.json"
    if not package_path.is_file():
        return {"state": "static"}
    existing_outputs = built_entrypoints(root)
    if existing_outputs:
        return {"state": "prebuilt", "output": str(existing_outputs[0].parent.relative_to(root))}
    try:
        package = json.loads(package_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        return {"state": "source-fallback", "message": f"package.json non valido: {error}"}
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    if not enabled or not isinstance(scripts, dict) or "build" not in scripts:
        return {"state": "source-fallback", "message": "build automatico non disponibile"}

    environment = os.environ.copy()
    environment.setdefault("NODE_OPTIONS", "--openssl-legacy-provider")
    commands = [
        ["npm", "install", "--no-audit", "--no-fund"],
        ["npm", "run", "build"],
    ]
    logs = []
    try:
        for command in commands:
            result = subprocess.run(
                command,
                cwd=root,
                env=environment,
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                timeout=900,
                check=False,
            )
            logs.append(result.stdout[-4000:])
            if result.returncode != 0 and command[1] == "install":
                retry = subprocess.run(
                    ["npm", "install", "--legacy-peer-deps", "--no-audit", "--no-fund"],
                    cwd=root,
                    env=environment,
                    text=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    timeout=900,
                    check=False,
                )
                logs.append(retry.stdout[-4000:])
                if retry.returncode != 0:
                    return {"state": "source-fallback", "message": "installazione dipendenze non riuscita", "log": "\n".join(logs)[-6000:]}
            elif result.returncode != 0:
                return {"state": "source-fallback", "message": "compilazione non riuscita", "log": "\n".join(logs)[-6000:]}
        outputs = built_entrypoints(root)
        if not outputs:
            return {"state": "source-fallback", "message": "build completata senza entrypoint HTML", "log": "\n".join(logs)[-6000:]}
        return {"state": "built", "output": str(outputs[0].parent.relative_to(root))}
    except (OSError, subprocess.TimeoutExpired) as error:
        return {"state": "source-fallback", "message": str(error), "log": "\n".join(logs)[-6000:]}
    finally:
        modules = root / "node_modules"
        if modules.is_dir():
            shutil.rmtree(modules)


def detect_framework(root: Path) -> str:
    for package_path in root.rglob("package.json"):
        if "node_modules" in package_path.parts:
            continue
        try:
            package = json.loads(package_path.read_text(encoding="utf-8", errors="replace"))
        except json.JSONDecodeError:
            continue
        dependencies = {}
        for key in ("dependencies", "devDependencies", "peerDependencies"):
            values = package.get(key, {}) if isinstance(package, dict) else {}
            if isinstance(values, dict):
                dependencies.update(values)
        if any(name in {"react", "react-dom"} or name.startswith("@react-three/") for name in dependencies):
            return "react"
    return "vanilla"


def file_index(root: Path) -> dict[str, list[Path]]:
    result: dict[str, list[Path]] = {}
    for path in iter_files(root):
        result.setdefault(path.name.lower(), []).append(path)
    return result


def repair_local_references(root: Path, material: dict) -> list[dict]:
    index = file_index(root)
    repaired = []
    for ref in material.get("missing_local", []):
        owner = root / ref["owner"]
        if not owner.is_file():
            continue
        relative = clean_local_ref(ref["value"])
        target = (owner.parent / relative).resolve() if not relative.startswith("/") else (root / relative.lstrip("/")).resolve()
        try:
            target.relative_to(root.resolve())
        except ValueError:
            continue
        candidates = [item for item in index.get(target.name.lower(), []) if item.resolve() != target]
        if not candidates:
            continue
        hashes = {sha256(item) for item in candidates}
        if len(candidates) != 1 and len(hashes) != 1:
            continue
        source = sorted(candidates, key=lambda item: (len(item.parts), str(item)))[0]
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        repaired.append({"owner": ref["owner"], "source": str(source.relative_to(root)), "target": str(target.relative_to(root))})
    return repaired


def vendor_filename(url: str) -> str:
    parts = urlsplit("https:" + url if url.startswith("//") else url)
    name = Path(parts.path).name or "dependency.bin"
    safe = re.sub(r"[^A-Za-z0-9._-]+", "-", name)
    stamp = hashlib.sha256(url.encode("utf-8")).hexdigest()[:10]
    return f"{stamp}-{safe}"


def known_vendor(url: str, vendor_root: Path) -> Path | None:
    lower = url.lower()
    names = []
    if "lenis-snap" in lower:
        names.append("lenis-snap.min.js")
    elif "scrolltrigger" in lower:
        names.append("ScrollTrigger.min.js")
    elif "motionpathplugin" in lower:
        names.append("MotionPathPlugin.min.js")
    elif re.search(r"(?:^|/)gsap(?:\.min)?\.js(?:$|[?#])", lower):
        names.append("gsap.min.js")
    elif "lenis" in lower and lower.endswith(".css"):
        names.append("lenis.css")
    elif "lenis" in lower and ".js" in lower:
        names.append("lenis.min.js")
    elif "splitting" in lower and "cells" in lower:
        names.append("splitting-cells.css")
    elif "splitting" in lower and lower.endswith(".css"):
        names.append("splitting.css")
    elif "splitting" in lower:
        names.append("splitting.min.js")
    elif "imagesloaded" in lower:
        names.append("imagesloaded.pkgd.min.js")
    elif "anime" in lower and ".js" in lower:
        names.append("anime.min.js")
    elif "charming" in lower:
        names.append("charming.min.js")
    elif "tweenmax" in lower:
        names.append("TweenMax-1.20.3.min.js")
    for name in names:
        candidate = vendor_root / name
        if candidate.is_file():
            return candidate
    return None


def localize_remote_references(root: Path, material: dict, enabled: bool, vendor_root: Path) -> tuple[list[dict], list[dict]]:
    localized = []
    unresolved = []
    cache: dict[str, Path] = {}
    vendor = root / "_method_vendor"
    for ref in material.get("remote", []):
        owner = root / ref["owner"]
        url = ref["value"]
        if not enabled or not owner.is_file():
            unresolved.append({"owner": ref["owner"], "url": url, "reason": "download-disabled" if not enabled else "owner-missing"})
            continue
        try:
            target = cache.get(url)
            if target is None:
                vendor.mkdir(parents=True, exist_ok=True)
                target = vendor / vendor_filename(url)
                bundled = known_vendor(url, vendor_root)
                if bundled:
                    shutil.copy2(bundled, target)
                else:
                    request = urllib.request.Request(
                        "https:" + url if url.startswith("//") else url,
                        headers={"User-Agent": "Metodo21-Importer/1.0"},
                    )
                    with urllib.request.urlopen(request, timeout=20) as response, target.open("wb") as handle:
                        shutil.copyfileobj(response, handle)
                cache[url] = target
            text = read_text(owner)
            local_ref = Path(os.path.relpath(target, owner.parent)).as_posix()
            if not local_ref.startswith("."):
                local_ref = "./" + local_ref
            owner.write_text(text.replace(url, local_ref), encoding="utf-8")
            localized.append({"owner": ref["owner"], "url": url, "local": str(target.relative_to(root))})
        except (OSError, ValueError, urllib.error.URLError) as error:
            unresolved.append({"owner": ref["owner"], "url": url, "reason": str(error)})
    return localized, unresolved


def inject_bridge(root: Path, entries: list[Path]) -> None:
    (root / BRIDGE_NAME).write_text(BRIDGE_SOURCE, encoding="utf-8")
    marker = f'<script src="./{BRIDGE_NAME}"></script>'
    for entry in entries:
        relative_bridge = Path(os.path.relpath(root / BRIDGE_NAME, entry.parent))
        tag = f'<script src="{relative_bridge.as_posix()}"></script>'
        text = entry.read_text(encoding="utf-8", errors="replace")
        if OFFLINE_MARKER not in text:
            if re.search(r"<head(?:\s[^>]*)?>", text, re.I):
                text = re.sub(r"(<head(?:\s[^>]*)?>)", r"\1\n" + OFFLINE_META, text, count=1, flags=re.I)
            else:
                text = OFFLINE_META + "\n" + text
        if BRIDGE_NAME in text:
            entry.write_text(text, encoding="utf-8")
            continue
        if re.search(r"</body\s*>", text, re.I):
            text = re.sub(r"</body\s*>", tag + "\n</body>", text, count=1, flags=re.I)
        else:
            text += "\n" + (tag if entry.parent != root else marker) + "\n"
        entry.write_text(text, encoding="utf-8")


def variant_id(path: Path, root: Path, used: set[str]) -> str:
    relative = path.relative_to(root)
    base = "-".join(relative.with_suffix("").parts)
    return unique_slug(slugify(base), used)


def import_one(source: Path, library: Path, public_prefix: str, slug: str, download: bool, vendor_root: Path, build: bool) -> dict:
    target = library / slug
    target.mkdir(parents=True, exist_ok=True)
    copy_source(source, target)
    build_result = run_package_build(target, build)

    initial = catalog_material(target)
    repaired = repair_local_references(target, initial)
    after_repair = catalog_material(target)
    localized, remote_fallbacks = localize_remote_references(target, after_repair, download, vendor_root)
    final = catalog_material(target)
    framework = detect_framework(target)
    entries = built_entrypoints(target) if build_result["state"] in {"built", "prebuilt"} else choose_entrypoints(target)
    inject_bridge(target, entries)

    used_variants: set[str] = set()
    variants = []
    for entry in entries:
        identifier = variant_id(entry, target, used_variants)
        relative = entry.relative_to(target).as_posix()
        variants.append({
            "id": identifier,
            "entry": relative,
            "url": f"{public_prefix.rstrip('/')}/{slug}/{relative}",
        })

    return {
        "slug": slug,
        "title": source.name,
        "source": str(source.resolve()),
        "mode": "capsule",
        "framework": framework,
        "enabled": framework != "react",
        "julesEligible": framework != "react" and build_result["state"] in {"static", "prebuilt", "built"},
        "exclusionReason": "react-disabled-by-policy" if framework == "react" else None,
        "build": build_result,
        "isolation": "required" if any(name in final["libraries"] for name in ("gsap-2", "webgl", "canvas")) else "preferred",
        "runtime": final["runtime"],
        "libraries": final["libraries"],
        "defaultVariant": variants[0]["id"] if variants else None,
        "variants": variants,
        "repairsApplied": repaired,
        "remoteLocalized": localized,
        "remoteFallbacks": remote_fallbacks,
        "fileCount": final["file_count"],
        "totalBytes": final["total_bytes"],
    }


def read_manifest(path: Path) -> dict:
    if not path.is_file():
        return {"schema": "metodo21.material-library/v1", "materials": []}
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(value, dict) and isinstance(value.get("materials"), list):
            return value
    except (OSError, json.JSONDecodeError):
        pass
    return {"schema": "metodo21.material-library/v1", "materials": []}


def main() -> int:
    parser = argparse.ArgumentParser(description="Importa componenti come capsule autonome pronte per MaterialHost")
    parser.add_argument("sources", nargs="+", type=Path, help="Cartelle singole o contenitori di materiali")
    parser.add_argument("--library", type=Path, default=Path("MOTION_COMPONENTE/ARCHIVIO"))
    parser.add_argument("--public-prefix", default="MOTION_COMPONENTE/ARCHIVIO")
    parser.add_argument("--no-download", action="store_true", help="Mantieni online le dipendenze remote")
    parser.add_argument("--no-build", action="store_true", help="Non compilare automaticamente i progetti npm")
    args = parser.parse_args()

    sources = []
    for supplied in args.sources:
        path = supplied.resolve()
        if not path.is_dir():
            print(f"Sorgente ignorata (non e una cartella): {path}", file=sys.stderr)
            continue
        if has_direct_entrypoint(path) or ((path / "package.json").is_file() and choose_entrypoints(path)):
            sources.append(path)
        else:
            sources.extend(
                child.resolve() for child in sorted(path.iterdir(), key=lambda item: item.name.lower())
                if child.is_dir() and choose_entrypoints(child)
            )
    if not sources:
        print("Nessun materiale HTML importabile trovato", file=sys.stderr)
        return 2

    library = args.library.resolve()
    vendor_root = Path(__file__).resolve().parent.parent / "MOTORE" / "vendor"
    library.mkdir(parents=True, exist_ok=True)
    manifest_path = library / "materials.manifest.json"
    manifest = read_manifest(manifest_path)
    existing = {item.get("source"): item for item in manifest["materials"] if item.get("source")}
    used = {item.get("slug") for item in manifest["materials"] if item.get("slug")}

    imported = []
    for source in sources:
        source_key = str(source)
        prior = existing.get(source_key)
        slug = prior["slug"] if prior else unique_slug(slugify(source.name), used)
        item = import_one(source, library, args.public_prefix, slug, not args.no_download, vendor_root, not args.no_build)
        existing[source_key] = item
        imported.append(item)
        print(f"importato {slug}: {len(item['variants'])} varianti, {item['fileCount']} file")

    manifest["schema"] = "metodo21.material-library/v1"
    manifest["materials"] = sorted(existing.values(), key=lambda item: item["slug"])
    manifest["materialCount"] = len(manifest["materials"])
    manifest["enabledMaterialCount"] = sum(1 for item in manifest["materials"] if item.get("enabled", True))
    manifest["julesEligibleCount"] = sum(1 for item in manifest["materials"] if item.get("julesEligible", True))
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"manifest: {manifest_path} ({len(imported)} aggiornati, {manifest['materialCount']} totali)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
