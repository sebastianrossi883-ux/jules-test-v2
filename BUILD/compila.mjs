// Compilatore offline del codice scritto da Jules. Non importa né monta le demo.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {publishBuild} from './build_output.mjs';
import {validateFinalContract} from './verifica_contratto_finale.mjs';
import * as acorn from './vendor/acorn/acorn.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// esbuild-wasm eredita stderr: quando è un file, il suo launcher può ricorrere
// attraverso fs.writeSync/SyncWriteStream. Il processo che usa Wasm riceve pipe.
// Il comando pubblico resta uno; non serve esbuild nativo o un'installazione.
if (process.argv[2] !== '--metodo21-worker') {
  const child=spawn(process.execPath,[fileURLToPath(import.meta.url),'--metodo21-worker'],
    {cwd:root,stdio:['ignore','pipe','pipe'],windowsHide:true});
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  const signals=['SIGINT','SIGTERM'];
  const handlers=signals.map(signal=>{const fn=()=>child.kill(signal);process.on(signal,fn);return [signal,fn];});
  const status=await new Promise(resolve=>{
    child.once('error',error=>{console.error('[BUILD]',error);resolve(1);});
    child.once('close',(code)=>resolve(code ?? 1));
  });
  for(const [signal,fn]of handlers)process.removeListener(signal,fn);
  process.exit(status);
}
const require=createRequire(import.meta.url);
const esbuild=require('./strumenti/node_modules/esbuild-wasm');
const sass=require('./strumenti/node_modules/sass');
const glslify=require('./strumenti/node_modules/glslify');
const shaderDeps=require('./strumenti/node_modules/glslify-deps/sync');
const shaderBundle=require('./strumenti/node_modules/glslify-bundle');
const shaderResolve=require('./strumenti/node_modules/glsl-resolve').sync;
const config=JSON.parse(fs.readFileSync(path.join(root,'BUILD/config.json'),'utf8'));

validateFinalContract(root,config,acorn);
// Transpile prima del build: esbuild-wasm non supporta chiamate transform
// rientranti durante onLoad. I derivati restano soltanto in memoria.
const apiSources=new Map();
async function prepareApiSources(directory){
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    if(['.git','node_modules','MOTORE','METHOD','BUILD','MOTION_COMPONENTE','DERIVATI','FONTI_SITO_ORIGINALI'].includes(entry.name))continue;
    const file=path.join(directory,entry.name);
    if(entry.isDirectory()){await prepareApiSources(file);continue;}
    if(!/\.(?:ts|tsx|jsx)$/.test(file))continue;
    try{apiSources.set(file,(await esbuild.transform(fs.readFileSync(file,'utf8'),{loader:path.extname(file).slice(1),target:'es2022'})).code);}
    catch(error){apiSources.set(file,{error});}
  }
}
await prepareApiSources(root);
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
  build.onLoad({filter:/\.(?:js|mjs|cjs|ts|jsx|tsx)$/},async args=>{
    // Solo codice del sito: gli originali e le librerie restano fonti immutate.
    if(args.path.includes(path.sep+'node_modules'+path.sep)||ownerOf(args.path))return;
    const contents=fs.readFileSync(args.path,'utf8');
    const extension=path.extname(args.path).slice(1);
    const loader=['ts','tsx','jsx'].includes(extension)?extension:'js';
    const prepared=apiSources.get(args.path);
    if(prepared?.error)throw prepared.error;
    const ast=acorn.parse(typeof prepared==='string'?prepared:contents,{ecmaVersion:'latest',sourceType:'module',locations:true,allowReturnOutsideFunction:true});
    const errors=[];

    function walk(node){
      if(!node||typeof node!=='object')return;
      if(node.type==='CallExpression'&&node.callee?.type==='MemberExpression'){
        const c=node.callee,property=c.computed?c.property.value:c.property.name;
        const first=node.arguments[0];
        const literal=first?.type==='Literal'&&typeof first.value==='string'||first?.type==='TemplateLiteral'&&!first.expressions.length;
        if(property==='claim'&&/scope$/i.test(c.object?.name||'')&&literal){
          errors.push({text:'[API] claim accetta nodi DOM; usare scope.one(selector, props) o scope.all(selector, props). File: '+path.relative(root,args.path)});
        }
        if(['one','all'].includes(property)&&/scope$/i.test(c.object?.name||'')){
          const props=node.arguments[1];
          if(!props||props.type==='Identifier'&&props.name==='undefined'||props.type==='Literal'&&props.value===null){
            const read=property==='one'?'findOne':'findAll';
            errors.push({text:`[API] ${property} richiede le proprieta animate; per sola selezione usare scope.${read}(selector). File: ${path.relative(root,args.path)}:${node.loc.start.line}`});
          }
        }
      }
      for(const [key,value]of Object.entries(node)){
        if(['loc','start','end'].includes(key))continue;
        if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object')walk(value);
      }
    }
    walk(ast);
    if(errors.length)return {errors};
    return {contents,loader,resolveDir:path.dirname(args.path)};
  });
  build.onResolve({filter:/^(gsap(?:\/.*)?|lenis|@studio-freight\/lenis|imagesloaded|splitting|charming|animejs)$/},args=>({path:args.path,namespace:'canonical'}));
  build.onLoad({filter:/.*/,namespace:'canonical'},args=>({contents:bridge(args.path),loader:'js'}));
  build.onResolve({filter:/^@material\//},async args=>{
    const m=args.path.match(/^@material\/([^/]+)\/(.+)$/);const lib=config.materials[m?.[1]];
    if(!lib)throw Error('Proprietario materiale sconosciuto: '+args.path);
    const owner=path.join(root,lib.libraryRoot);
    return build.resolve(m[2],{resolveDir:owner,kind:args.kind});
  });
  build.onResolve({filter:/^@/},async args=>{
    const owners=Object.values(config.materials).filter(m=>args.importer && args.importer.startsWith(path.join(root,m.sourceRoot)+path.sep));
    const aliases={...config.aliases,...(owners[0]?.aliases||{})};
    const key=Object.keys(aliases).sort((a,b)=>b.length-a.length).find(k=>args.path===k||args.path.startsWith(k+'/'));
    if(key){
      const target=path.resolve(root,aliases[key],args.path.slice(key.length+1));
      // Un path restituito direttamente e' gia' risolto per esbuild: non completa
      // estensioni o directory. Delega il target assoluto al resolver ordinario;
      // non ripassa da questo filtro @ e conserva i plugin del tipo di file.
      return build.resolve(target,{resolveDir:root,kind:args.kind});
    }
  });
  build.onLoad({filter:/\.(?:frag|vert|glsl|wgsl)$/},args=>{
    const source=fs.readFileSync(args.path,'utf8');
    const resolved=args.path.endsWith('.wgsl')?quotedIncludes(source,path.dirname(args.path),[args.path]):compileShader(source,args.path);
    return {contents:JSON.stringify(resolved),loader:'json',resolveDir:path.dirname(args.path)};
  });
  build.onLoad({filter:/\.(?:scss|sass)$/},args=>({contents:sass.compile(args.path,{style:'expanded'}).css,loader:'css',resolveDir:path.dirname(args.path)}));
}};
await esbuild.build({absWorkingDir:root,entryPoints:[config.entry],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:config.output,metafile:true,write:false,
  loader:{'.png':'file','.jpg':'file','.jpeg':'file','.webp':'file','.svg':'file','.woff':'file','.woff2':'file','.mp4':'file'},
  plugins:[plugin],sourcemap:true,logLevel:'info'}).then(result=>{
    publishBuild(root,config,result);
  }).finally(()=>esbuild.stop());
