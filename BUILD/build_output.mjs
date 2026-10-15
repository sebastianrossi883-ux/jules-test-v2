// Pubblicazione locale dei derivati tecnici. Non crea scene, CSS o animazioni.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {parse} from './strumenti/node_modules/parse5/dist/index.js';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const nodes = n => [n, ...(n.childNodes || []).flatMap(nodes)];
const attrs = n => Object.fromEntries((n.attrs || []).map(a => [a.name, a.value]));
const localPath = value => /^(?:[a-z]+:|\/\/)/i.test(value || '') ? null
  : (value || '').split(/[?#]/)[0].replace(/^\//, '');
const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export function wireBuildHtml(html, config, cssFiles = [], version = '') {
  const doc = parse(html, {sourceCodeLocationInfo:true});
  const all = nodes(doc), patches = [];
  const matches = all.filter(n => n.tagName === 'script' && n.sourceCodeLocation
    && [config.entry, config.output].includes(localPath(attrs(n).src)));
  const src = config.output + (version ? '?m21=' + version.slice(0,12) : '');
  const inherited = matches.length ? (matches[0].attrs || []).filter(a =>
    !['src','type','async','defer','integrity'].includes(a.name)) : [];
  const tag = `<script type="module" src="${escape(src)}" data-metodo21-global-engine` +
    inherited.filter(a => a.name !== 'data-metodo21-global-engine')
      .map(a => ` ${a.name}="${escape(a.value)}"`).join('') + '></script>';
  if (matches.length) {
    matches.forEach((n,i) => patches.push({start:n.sourceCodeLocation.startOffset,
      end:n.sourceCodeLocation.endOffset,value:i === 0 ? tag : ''}));
  } else {
    const body = all.find(n => n.tagName === 'body');
    const at = body?.sourceCodeLocation?.endTag?.startOffset ?? html.length;
    patches.push({start:at,end:at,value:'\n'+tag+'\n'});
  }
  const generatedCss = config.output.replace(/\.[^.\/]+$/, '.css');
  for (const n of all.filter(n => n.tagName === 'link' && n.sourceCodeLocation)) {
    const a = attrs(n);
    if ('data-m21-build-style' in a || (a.rel === 'stylesheet' && localPath(a.href) === generatedCss)) {
      patches.push({start:n.sourceCodeLocation.startOffset,end:n.sourceCodeLocation.endOffset,value:''});
    }
  }
  if (cssFiles.length) {
    const head = all.find(n => n.tagName === 'head');
    const at = head?.sourceCodeLocation?.endTag?.startOffset ?? 0;
    const links = cssFiles.map(file => `<link rel="stylesheet" href="${escape(file)}" data-m21-build-style>`).join('\n');
    patches.push({start:at,end:at,value:links+'\n'});
  }
  for (const p of patches.sort((a,b) => b.start-a.start)) html = html.slice(0,p.start)+p.value+html.slice(p.end);
  return html;
}

function writeAtomic(file, bytes) {
  fs.mkdirSync(path.dirname(file), {recursive:true});
  const temporary = file + '.m21-tmp-' + process.pid;
  fs.writeFileSync(temporary, bytes, {flag:'wx'});
  try { fs.renameSync(temporary, file); }
  finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
}

export function publishBuild(root, config, result) {
  const outputs = [], css = [];
  for (const file of result.outputFiles) {
    const relative = path.relative(root, file.path).replaceAll(path.sep, '/');
    if (relative.startsWith('../') || path.isAbsolute(relative)) throw Error('Output fuori dalla consegna: '+relative);
    outputs.push({path:relative,sha256:digest(file.contents),bytes:file.contents.length});
    if (relative.endsWith('.css')) css.push(relative);
    writeAtomic(file.path, file.contents);
  }
  const output = outputs.find(file => file.path === config.output);
  if (!output) throw Error('Bundle principale non prodotto: '+config.output);
  const index = path.join(root, 'index.html');
  if (fs.existsSync(index)) {
    writeAtomic(index, wireBuildHtml(fs.readFileSync(index, 'utf8'), config, css, output.sha256));
  }
  const inputs = Object.keys(result.metafile.inputs).map(relative => {
    const file = path.resolve(root, relative);
    return fs.existsSync(file) && fs.statSync(file).isFile()
      ? {path:relative,sha256:digest(fs.readFileSync(file))} : null;
  }).filter(Boolean);
  writeAtomic(path.join(root,'BUILD/ultimo-build.json'), JSON.stringify({...result.metafile,
    metodo21:{entry:config.entry,output:config.output,sourceHashes:inputs,outputs,
      htmlLinked:fs.existsSync(index),builtAt:new Date().toISOString()}}, null, 2)+'\n');
}
