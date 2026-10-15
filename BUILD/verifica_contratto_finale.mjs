import fs from 'node:fs';
import path from 'node:path';

function javascriptFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? javascriptFiles(file) : /\.(?:js|mjs)$/.test(entry.name) ? [file] : [];
  });
}

function walkTree(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'start', 'end'].includes(key)) continue;
    if (Array.isArray(value)) value.forEach((child) => walkTree(child, visit));
    else if (value && typeof value === 'object') walkTree(value, visit);
  }
}

function moduleFacts(file, acorn) {
  const ast = acorn.parse(fs.readFileSync(file, 'utf8'), {
    ecmaVersion: 'latest', sourceType: 'module', locations: true,
  });
  const functions = new Set();
  const exportedFunctions = new Set();
  const imports = new Map();
  const importedTargets = new Set();
  const calledTargets = new Set();
  let status = null;
  let sceneDefinition = null;
  const rememberDeclaration = (declaration) => {
    if (declaration?.type === 'FunctionDeclaration' && declaration.id) functions.add(declaration.id.name);
    if (declaration?.type === 'ClassDeclaration' && declaration.id) functions.add(declaration.id.name);
    if (declaration?.type === 'VariableDeclaration') for (const item of declaration.declarations) {
      if (item.id?.type === 'Identifier' && ['ArrowFunctionExpression', 'FunctionExpression', 'ClassExpression'].includes(item.init?.type)) {
        functions.add(item.id.name);
      }
    }
  };
  for (const node of ast.body) {
    rememberDeclaration(node);
    if (node.type === 'ImportDeclaration') {
      const target = path.resolve(path.dirname(file), node.source.value);
      importedTargets.add(target);
      for (const item of node.specifiers) imports.set(item.local.name, { target });
    }
    if (node.type !== 'ExportNamedDeclaration') continue;
    rememberDeclaration(node.declaration);
    if (['FunctionDeclaration', 'ClassDeclaration'].includes(node.declaration?.type) && node.declaration.id) {
      exportedFunctions.add(node.declaration.id.name);
    }
    if (node.declaration?.type === 'VariableDeclaration') for (const item of node.declaration.declarations) {
      if (item.id?.type !== 'Identifier') continue;
      if (['ArrowFunctionExpression', 'FunctionExpression', 'ClassExpression'].includes(item.init?.type)) exportedFunctions.add(item.id.name);
      if (item.id.name === 'implementationStatus' && item.init?.type === 'Literal') status = item.init.value;
      if (item.id.name === 'sceneDefinition') sceneDefinition = item.init;
    }
    for (const item of node.specifiers || []) if (functions.has(item.local.name)) exportedFunctions.add(item.exported.name);
  }
  walkTree(ast, (node) => {
    if (!['CallExpression', 'NewExpression'].includes(node.type)) return;
    if (node.callee?.type === 'Identifier' && imports.has(node.callee.name)) {
      calledTargets.add(imports.get(node.callee.name).target);
    }
    if (node.callee?.type === 'MemberExpression' && node.callee.object?.type === 'Identifier' && imports.has(node.callee.object.name)) {
      calledTargets.add(imports.get(node.callee.object.name).target);
    }
  });
  return { functions, exportedFunctions, importedTargets, calledTargets, status, sceneDefinition };
}

function objectExpression(value) {
  if (value?.type === 'ObjectExpression') return value;
  if (value?.type === 'CallExpression' && value.arguments[0]?.type === 'ObjectExpression') return value.arguments[0];
  return null;
}

function setupImplemented(facts) {
  const object = objectExpression(facts.sceneDefinition);
  if (!object) return false;
  const property = object.properties.find((item) => !item.computed && ((item.key?.name || item.key?.value) === 'setup'));
  if (!property) return false;
  return ['ArrowFunctionExpression', 'FunctionExpression'].includes(property.value?.type)
    || (property.value?.type === 'Identifier' && facts.functions.has(property.value.name));
}

export function validateFinalContract(root, config, acorn) {
  const errors = [];
  const resolveDeclared = (relative, label) => {
    if (typeof relative !== 'string' || !relative.trim()) {
      errors.push(`${label}: percorso assente nel contratto`);
      return null;
    }
    const file = path.resolve(root, relative);
    if (file !== root && !file.startsWith(root + path.sep)) {
      errors.push(`${label}: percorso fuori dalla consegna: ${relative}`);
      return null;
    }
    if (!fs.existsSync(file)) {
      errors.push(`${label}: file assente: ${relative}`);
      return null;
    }
    return file;
  };
  const declaredMechanics = config.contract?.mechanics;
  const declaredScenes = config.contract?.scenes;
  const mechanics = Array.isArray(declaredMechanics)
    ? declaredMechanics.map((relative) => resolveDeclared(relative, 'materiale')).filter(Boolean)
    : javascriptFiles(path.join(root, 'assets/js/meccaniche'));
  const sceneRequirements = new Map();
  const scenes = Array.isArray(declaredScenes)
    ? declaredScenes.map((item, index) => {
      const scene = resolveDeclared(item?.module, `scena ${index + 1}`);
      const scenery = resolveDeclared(item?.scenography, `scenografia ${index + 1}`);
      if (scene && scenery) sceneRequirements.set(scene, scenery);
      return scene;
    }).filter(Boolean)
    : javascriptFiles(path.join(root, 'assets/js/scene'));
  const entry = path.join(root, config.entry);
  if (!mechanics.length) errors.push('nessun modulo materiale in assets/js/meccaniche');
  if (!scenes.length) errors.push('nessun modulo scena in assets/js/scene');
  if (new Set(mechanics).size !== mechanics.length) errors.push('modulo materiale duplicato nel contratto');
  if (new Set(scenes).size !== scenes.length) errors.push('modulo scena duplicato nel contratto');
  const mechanicFacts = new Map(mechanics.map((file) => [path.resolve(file), moduleFacts(file, acorn)]));
  const sceneFacts = new Map(scenes.map((file) => [path.resolve(file), moduleFacts(file, acorn)]));
  for (const [file, facts] of mechanicFacts) {
    const relative = path.relative(root, file);
    if (facts.status !== 'implemented') errors.push(`${relative}: implementationStatus non è implemented`);
    if (!facts.exportedFunctions.size) errors.push(`${relative}: nessuna funzione o classe della meccanica esportata`);
  }
  const calledMaterials = new Set();
  for (const [file, facts] of sceneFacts) {
    const relative = path.relative(root, file);
    if (facts.status !== 'implemented') errors.push(`${relative}: scena ancora pending`);
    if (!setupImplemented(facts)) errors.push(`${relative}: sceneDefinition.setup non è una funzione`);
    const expectedScenery = sceneRequirements.get(file);
    const scenery = expectedScenery
      ? [expectedScenery]
      : [...facts.importedTargets].filter((target) => target.includes(`${path.sep}assets${path.sep}js${path.sep}scenografie${path.sep}`));
    if (!scenery.length || !scenery.every((target) => facts.importedTargets.has(target) && facts.calledTargets.has(target))) {
      errors.push(`${relative}: propria scenografia non importata e chiamata`);
    }
    for (const target of facts.calledTargets) if (mechanicFacts.has(target)) calledMaterials.add(target);
  }
  for (const file of mechanicFacts.keys()) if (!calledMaterials.has(file)) {
    errors.push(`${path.relative(root, file)}: importato ma nessuna sua funzione è chiamata da una scena`);
  }
  if (fs.existsSync(entry)) {
    const entryFacts = moduleFacts(entry, acorn);
    for (const file of sceneFacts.keys()) if (!entryFacts.importedTargets.has(file)) {
      errors.push(`${path.relative(root, file)}: non importato da ${config.entry}`);
    }
  } else errors.push(`entrypoint assente: ${config.entry}`);
  if (errors.length) throw Error(`[CONTRATTO FINALE]\n- ${errors.join('\n- ')}`);
  return { mechanics: mechanics.length, scenes: scenes.length };
}
