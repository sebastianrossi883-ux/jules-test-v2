// Compilatore offline del codice scritto da Jules. Non importa né monta le demo.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const esbuild=require('./strumenti/node_modules/esbuild-wasm');
const sass=require('./strumenti/node_modules/sass');
const glslify=require('./strumenti/node_modules/glslify');
const shaderDeps=require('./strumenti/node_modules/glslify-deps/sync');
const shaderBundle=require('./strumenti/node_modules/glslify-bundle');
const shaderResolve=require('./strumenti/node_modules/glsl-resolve').sync;
const config=JSON.parse(fs.readFileSync(path.join(root,'BUILD/config.json'),'utf8'));
function ownerOf(file){return Object.values(config.materials).find(m=>file.startsWith(path.join(root,m.sourceRoot)+path.sep));}
function quotedIncludes(source,base,chain=[]){
  return source.replace(/#include\s+["']([^"']+)["']/g,(_,ref)=>{
    const file=path.resolve(base,ref);
    if(chain.includes(file))throw Error('Include shader ciclico: '+file);
    return quotedIncludes(fs.readFileSync(file,'utf8'),path.dirname(file),[...chain,file]);
  });
}
function compileShader(source,file){
  const owner=ownerOf(file);
  const deps=shaderDeps({cwd:path.dirname(file),
    readFileSync:filename=>quotedIncludes(fs.readFileSync(filename,'utf8'),path.dirname(filename),[filename]),
    resolve:(ref,opts)=>{
      if(ref.startsWith('.'))return shaderResolve(ref,opts);
      return shaderResolve(ref,{...opts,basedir:owner?path.join(root,owner.libraryRoot):root});
    }});
  return shaderBundle(deps.inline(quotedIncludes(source,path.dirname(file),[file]),path.dirname(file)));
}
const canonical={gsap:['gsap','gsap3'],ScrollTrigger:['ScrollTrigger','scrollTrigger'],Lenis:['Lenis','lenis'],MotionPathPlugin:['MotionPathPlugin','motionPath'],Flip:['Flip','flip'],SplitText:['SplitText','splitText'],Observer:['Observer','observer'],CustomEase:['CustomEase','customEase'],CustomBounce:['CustomBounce','customBounce'],CustomWiggle:['CustomWiggle','customWiggle'],Draggable:['Draggable','draggable'],InertiaPlugin:['InertiaPlugin','inertia'],EasePack:['EasePack','easePack'],DrawSVGPlugin:['DrawSVGPlugin','drawSVG'],MorphSVGPlugin:['MorphSVGPlugin','morphSVG'],ScrollToPlugin:['ScrollToPlugin','scrollTo'],TextPlugin:['TextPlugin','text'],ScrambleTextPlugin:['ScrambleTextPlugin','scrambleText'],Physics2DPlugin:['Physics2DPlugin','physics2D'],PhysicsPropsPlugin:['PhysicsPropsPlugin','physicsProps'],imagesloaded:['imagesLoaded','imagesLoaded'],splitting:['Splitting','splitting'],charming:['charming','charming'],animejs:['anime','anime']};
const bridge=(key)=>{
  if(key==='gsap/all') throw Error('gsap/all: importare esplicitamente i plugin necessari dalla stessa istanza');
  const name=key==='gsap'?'gsap':key==='lenis'||key==='@studio-freight/lenis'?'Lenis':key.replace(/^gsap\/(?:dist\/)?/,'').replace(/\.js$/,'');
  if(name==='ScrollSmoother') throw Error('ScrollSmoother non operativo: ricostruire il driver con la Lenis globale');
  if(!canonical[name])throw Error('Dipendenza del motore non registrata: '+key);
  const [global,id]=canonical[name];
  const wait=['gsap','Lenis'].includes(name)?'':`await globalThis.MotionKit.ready; await globalThis.MotionKit.plugins.ensure([${JSON.stringify(id)}], 'import:${name}');`;
  const named=name==='imagesloaded'?'imagesLoaded':name==='animejs'?'anime':name==='splitting'?'Splitting':name;
  if(name==='EasePack')return `${wait}\nconst {ExpoScaleEase,RoughEase,SlowMo}=globalThis; export {ExpoScaleEase,RoughEase,SlowMo};export default {ExpoScaleEase,RoughEase,SlowMo};`;
  return `${wait}\nconst value=globalThis[${JSON.stringify(global)}]; if(!value) throw Error('Dipendenza globale mancante: ${name}'); export {value as ${named}}; export default value;`;
};
const plugin={name:'metodo21-technical-only',setup(build){
  build.onResolve({filter:/^(gsap(?:\/.*)?|lenis|@studio-freight\/lenis|imagesloaded|splitting|charming|animejs)$/},args=>({path:args.path,namespace:'canonical'}));
  build.onLoad({filter:/.*/,namespace:'canonical'},args=>({contents:bridge(args.path),loader:'js'}));
  build.onResolve({filter:/^@material\//},async args=>{
    const m=args.path.match(/^@material\/([^/]+)\/(.+)$/);const lib=config.materials[m?.[1]];
    if(!lib)throw Error('Proprietario materiale sconosciuto: '+args.path);
    const owner=path.join(root,lib.libraryRoot);
    return build.resolve(m[2],{resolveDir:owner,kind:args.kind});
  });
  build.onResolve({filter:/^@/},args=>{
    const owners=Object.values(config.materials).filter(m=>args.importer && args.importer.startsWith(path.join(root,m.sourceRoot)+path.sep));
    const aliases={...config.aliases,...(owners[0]?.aliases||{})};
    const key=Object.keys(aliases).sort((a,b)=>b.length-a.length).find(k=>args.path===k||args.path.startsWith(k+'/'));
    if(key)return {path:path.resolve(root,aliases[key],args.path.slice(key.length+1))};
  });
  build.onLoad({filter:/\.(?:frag|vert|glsl|wgsl)$/},args=>{
    const source=fs.readFileSync(args.path,'utf8');
    const resolved=args.path.endsWith('.wgsl')?quotedIncludes(source,path.dirname(args.path),[args.path]):compileShader(source,args.path);
    return {contents:JSON.stringify(resolved),loader:'json',resolveDir:path.dirname(args.path)};
  });
  build.onLoad({filter:/\.(?:scss|sass)$/},args=>({contents:sass.compile(args.path,{style:'expanded'}).css,loader:'css',resolveDir:path.dirname(args.path)}));
}};
await esbuild.build({absWorkingDir:root,entryPoints:[config.entry],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:config.output,metafile:true,
  loader:{'.png':'file','.jpg':'file','.jpeg':'file','.webp':'file','.svg':'file','.woff':'file','.woff2':'file','.mp4':'file'},
  plugins:[plugin],sourcemap:true,logLevel:'info'}).then(result=>{
    fs.writeFileSync(path.join(root,'BUILD/ultimo-build.json'),JSON.stringify(result.metafile,null,2)+'\n');
  }).finally(()=>esbuild.stop());
