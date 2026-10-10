#!/usr/bin/env python3
"""Lettore interno usato dall'importatore risolutivo del Metodo 21.

Riconosce entrypoint e dipendenze per decidere come copiare e isolare il
materiale. Non fa parte del flusso utente e non e un gate di consegna.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.parse import urlsplit


IGNORED_DIRS = {".git", "node_modules", "dist", "build", "__MACOSX", ".idea", ".vscode"}
TEXT_SUFFIXES = {".html", ".htm", ".css", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx", ".json", ".md"}
MAX_TEXT_BYTES = 2_000_000

LIBRARY_PATTERNS = {
    "gsap-2": re.compile(r"\b(?:TweenMax|TweenLite|TimelineMax|TimelineLite)\b|TweenMax\.min\.js", re.I),
    "gsap-3": re.compile(r"\bgsap(?:\.|\b)|gsap(?:\.min)?\.js", re.I),
    "scrolltrigger": re.compile(r"\bScrollTrigger\b", re.I),
    "motion-path-plugin": re.compile(r"\bMotionPathPlugin\b", re.I),
    "lenis": re.compile(r"\bLenis\b|lenis(?:\.min)?\.js", re.I),
    "splitting": re.compile(r"\bSplitting\b|splitting(?:\.min)?\.js", re.I),
    "imagesloaded": re.compile(r"\bimagesLoaded\b|imagesloaded", re.I),
    "anime": re.compile(r"\banime(?:\.timeline|\()|anime(?:\.min)?\.js", re.I),
    "charming": re.compile(r"\bcharming\b", re.I),
    "three": re.compile(r"\bTHREE\b|three(?:\.min)?\.js", re.I),
    "pixi": re.compile(r"\bPIXI\b|pixi(?:\.min)?\.js", re.I),
    "swiper": re.compile(r"\bSwiper\b|swiper(?:\.min)?\.js", re.I),
    "barba": re.compile(r"\bbarba\b", re.I),
    "locomotive-scroll": re.compile(r"\bLocomotiveScroll\b|locomotive-scroll", re.I),
    "matter": re.compile(r"\bMatter\b|matter(?:\.min)?\.js", re.I),
    "p5": re.compile(r"\bnew\s+p5\b|p5(?:\.min)?\.js", re.I),
    "webgl": re.compile(r"WebGLRenderer|WebGLRenderingContext|fragmentShader|vertexShader", re.I),
    "canvas": re.compile(r"getContext\s*\(\s*['\"](?:2d|webgl|webgl2)['\"]|<canvas\b", re.I),
}

HTML_ATTRS = {
    "script": ("src",),
    "link": ("href",),
    "img": ("src", "srcset"),
    "source": ("src", "srcset"),
    "video": ("src", "poster"),
    "audio": ("src",),
    "iframe": ("src",),
    "object": ("data",),
}

CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)", re.I)
CSS_IMPORT_RE = re.compile(r"@import\s+(?:url\()?\s*['\"]([^'\"]+)", re.I)
JS_IMPORT_RE = re.compile(
    r"(?:\bimport\s*(?:[^'\"]*?\s+from\s*)?|\bexport\s+[^'\"]*?\s+from\s*|\bimport\s*\(|\brequire\s*\()\s*['\"]([^'\"]+)['\"]",
    re.M,
)


class RefParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str]] = []
        self.module_script = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = {key.lower(): value for key, value in attrs if value is not None}
        tag = tag.lower()
        if tag == "script" and data.get("type", "").lower() == "module":
            self.module_script = True
        for attr in HTML_ATTRS.get(tag, ()):
            value = data.get(attr)
            if not value:
                continue
            if attr == "srcset":
                for item in value.split(","):
                    candidate = item.strip().split(" ", 1)[0]
                    if candidate:
                        self.refs.append((f"{tag}:{attr}", candidate))
            else:
                self.refs.append((f"{tag}:{attr}", value.strip()))


def iter_files(root: Path) -> Iterable[Path]:
    for path in root.rglob("*"):
        if not path.is_file() or any(part in IGNORED_DIRS for part in path.parts):
            continue
        if path.name == ".DS_Store":
            continue
        yield path


def read_text(path: Path) -> str:
    if path.stat().st_size > MAX_TEXT_BYTES:
        return ""
    return path.read_text(encoding="utf-8", errors="replace")


def is_external(value: str) -> bool:
    raw = value.strip()
    if raw.startswith("//"):
        return True
    scheme = urlsplit(raw).scheme.lower()
    return scheme in {"http", "https"}


def is_ignored_ref(value: str) -> bool:
    raw = value.strip().lower()
    return not raw or raw.startswith(("#", "data:", "blob:", "mailto:", "tel:", "javascript:"))


def is_package_ref(kind: str, value: str) -> bool:
    return kind == "js:import" and not value.startswith((".", "/"))


def clean_local_ref(value: str) -> str:
    return urlsplit(value.strip()).path


def file_refs(path: Path, text: str) -> tuple[list[tuple[str, str]], bool]:
    suffix = path.suffix.lower()
    refs: list[tuple[str, str]] = []
    module_script = False
    if suffix in {".html", ".htm"}:
        parser = RefParser()
        parser.feed(text)
        refs.extend(parser.refs)
        module_script = parser.module_script
    elif suffix == ".css":
        refs.extend(("css:url", match.group(2).strip()) for match in CSS_URL_RE.finditer(text))
        refs.extend(("css:import", match.group(1).strip()) for match in CSS_IMPORT_RE.finditer(text))
    elif suffix in {".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx"}:
        refs.extend(("js:import", match.group(1).strip()) for match in JS_IMPORT_RE.finditer(text))
        module_script = bool(re.search(r"^\s*(?:import|export)\b", text, re.M))
    return refs, module_script


def resolve_local(owner: Path, value: str, material_root: Path) -> Path:
    relative = clean_local_ref(value)
    if relative.startswith("/"):
        return (material_root / relative.lstrip("/")).resolve()
    return (owner.parent / relative).resolve()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def direct_materials(path: Path) -> list[Path]:
    path = path.resolve()
    if not path.is_dir():
        return []
    top_files = {item.name.lower() for item in path.iterdir() if item.is_file()}
    if "package.json" in top_files or any(name.startswith("index") and name.endswith((".html", ".htm")) for name in top_files):
        return [path]
    children = []
    for child in sorted(path.iterdir(), key=lambda item: item.name.lower()):
        if child.is_dir() and not child.name.startswith(".") and child.name not in IGNORED_DIRS:
            if any(True for _ in iter_files(child)):
                children.append(child.resolve())
    return children or [path]


def catalog_material(root: Path) -> dict:
    files = list(iter_files(root))
    entrypoints = sorted(
        str(path.relative_to(root))
        for path in files
        if path.suffix.lower() in {".html", ".htm"} and path.name.lower().startswith("index")
    )
    package_data: dict = {}
    package_path = root / "package.json"
    if package_path.is_file():
        try:
            package_data = json.loads(read_text(package_path))
        except json.JSONDecodeError:
            package_data = {"_invalid": True}

    libraries: set[str] = set()
    refs: list[dict] = []
    missing: list[dict] = []
    remote: list[dict] = []
    module_mode = False
    text_blob_parts: list[str] = []
    for file in files:
        if file.suffix.lower() not in TEXT_SUFFIXES:
            continue
        text = read_text(file)
        text_blob_parts.append(text)
        discovered, is_module = file_refs(file, text)
        module_mode = module_mode or is_module
        for kind, value in discovered:
            if is_ignored_ref(value):
                continue
            record = {"owner": str(file.relative_to(root)), "kind": kind, "value": value}
            if is_package_ref(kind, value):
                record["scope"] = "package"
            elif is_external(value):
                record["scope"] = "remote"
                remote.append(record)
            else:
                resolved = resolve_local(file, value, root)
                record["scope"] = "local"
                try:
                    record["resolved"] = str(resolved.relative_to(root))
                except ValueError:
                    record["resolved"] = str(resolved)
                record["exists"] = resolved.is_file()
                if not record["exists"]:
                    missing.append(record)
            refs.append(record)

    text_blob = "\n".join(text_blob_parts)
    for name, pattern in LIBRARY_PATTERNS.items():
        if pattern.search(text_blob):
            libraries.add(name)

    npm_dependencies = {}
    for key in ("dependencies", "devDependencies", "peerDependencies"):
        values = package_data.get(key, {}) if isinstance(package_data, dict) else {}
        if isinstance(values, dict):
            npm_dependencies.update(values)

    runtime = []
    if "gsap-2" in libraries:
        runtime.append("legacy-gsap-2")
    if "gsap-3" in libraries:
        runtime.append("gsap-3")
    if module_mode:
        runtime.append("esm")
    if package_data:
        runtime.append("npm-build")
    if "webgl" in libraries:
        runtime.append("webgl")
    elif "canvas" in libraries:
        runtime.append("canvas")
    if not runtime:
        runtime.append("vanilla-classic")

    risks = []
    if missing:
        risks.append("missing-local-assets")
    if remote:
        risks.append("remote-runtime-dependencies")
    if {"gsap-2", "gsap-3"}.issubset(libraries):
        risks.append("mixed-gsap-generations")
    if len(entrypoints) > 1:
        risks.append("multiple-variants")
    if any(item in libraries for item in ("webgl", "canvas")):
        risks.append("graphics-lifecycle")

    return {
        "name": root.name,
        "root": str(root),
        "entrypoints": entrypoints,
        "file_count": len(files),
        "total_bytes": sum(path.stat().st_size for path in files),
        "runtime": runtime,
        "libraries": sorted(libraries),
        "npm_dependencies": dict(sorted(npm_dependencies.items())),
        "references": refs,
        "missing_local": missing,
        "remote": remote,
        "licenses": sorted(str(path.relative_to(root)) for path in files if "license" in path.name.lower()),
        "risks": risks,
        "fingerprint": sha256(root / entrypoints[0]) if entrypoints else None,
    }


def build_catalog(paths: list[Path]) -> dict:
    roots: list[Path] = []
    seen: set[Path] = set()
    for path in paths:
        for material in direct_materials(path):
            if material not in seen:
                seen.add(material)
                roots.append(material)
    materials = [catalog_material(root) for root in roots]
    return {
        "schema": "metodo21.material-catalog/v1",
        "material_count": len(materials),
        "materials": materials,
        "summary": {
            "missing_local_count": sum(len(item["missing_local"]) for item in materials),
            "remote_reference_count": sum(len(item["remote"]) for item in materials),
            "risk_count": sum(len(item["risks"]) for item in materials),
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Indicizza componenti e semi senza modificarli")
    parser.add_argument("paths", nargs="+", type=Path, help="Demo singole o cartelle contenitore")
    parser.add_argument("--output", type=Path, help="File JSON da creare")
    parser.add_argument("--strict", action="store_true", help="Esce 2 se trova asset locali mancanti")
    args = parser.parse_args()

    absent = [str(path) for path in args.paths if not path.exists()]
    if absent:
        print("Percorsi inesistenti: " + ", ".join(absent), file=sys.stderr)
        return 2

    catalog = build_catalog(args.paths)
    payload = json.dumps(catalog, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(payload, encoding="utf-8")
        print(f"Catalogati {catalog['material_count']} materiali in {args.output}")
    else:
        sys.stdout.write(payload)

    summary = catalog["summary"]
    print(
        f"materiali={catalog['material_count']} mancanti={summary['missing_local_count']} "
        f"remoti={summary['remote_reference_count']} rischi={summary['risk_count']}",
        file=sys.stderr,
    )
    return 2 if args.strict and summary["missing_local_count"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
