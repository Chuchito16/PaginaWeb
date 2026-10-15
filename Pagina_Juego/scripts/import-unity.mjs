import { cp, mkdir, readFile, readdir, writeFile, lstat } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGunzip, createBrotliDecompress } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = process.argv[2];
if (!input) {
  console.error('Uso: npm run unity:import -- "C:\\ruta\\a\\UnityWebBuild"');
  process.exit(1);
}

try {
  const source = path.resolve(input);
  const destination = path.join(root, 'public', 'unity');
  const isWithin = (parent, child) => {
    const relative = path.relative(parent, child);
    return !relative || (!relative.startsWith('..') && !path.isAbsolute(relative));
  };
  if (isWithin(source, destination) || isWithin(destination, source)) throw new Error('La exportación debe estar fuera de public/unity y no puede contener el proyecto web.');
  let html = await readFile(path.join(source, 'index.html'), 'utf8');
  if (!html.includes('createUnityInstance')) throw new Error('El index.html no parece una exportación Web de Unity.');
  const files = await readdir(path.join(source, 'Build'));
  for (const extension of ['.loader.js', '.data', '.wasm', '.framework.js']) {
    if (!files.some(name => [extension, extension + '.unityweb', extension + '.gz', extension + '.br'].some(suffix => name.endsWith(suffix)))) throw new Error(`Falta un archivo ${extension} en Build.`);
  }
  const compressed = files.filter(name => /\.(gz|br)$/.test(name));
  for (const name of compressed) {
    if ((await lstat(path.join(source, 'Build', name))).isSymbolicLink()) throw new Error('No se permiten enlaces simbólicos en la exportación.');
  }
  const configPath = path.join(root, 'public', 'game-config.json');
  const config = { enabled: false, url: 'unity/index.html', title: 'Nuestra casa compartida' };
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');
  await mkdir(destination, { recursive: true });
  await cp(source, destination, {
    recursive: true,
    force: true,
    filter: async file => {
      if ((await lstat(file)).isSymbolicLink()) throw new Error('No se permiten enlaces simbólicos en la exportación.');
      // La fuente se conserva intacta. Solo descomprimimos los recursos copiados.
      return !(path.dirname(file) === path.join(source, 'Build') && /\.(gz|br)$/.test(file));
    },
  });
  // Servir archivos sin compresión evita depender de Content-Encoding en Vite o un hosting estático.
  for (const name of compressed) {
    const outputName = name.replace(/\.(gz|br)$/, '');
    await pipeline(createReadStream(path.join(source, 'Build', name)), name.endsWith('.gz') ? createGunzip() : createBrotliDecompress(), createWriteStream(path.join(destination, 'Build', outputName)));
    html = html.replaceAll(name, outputName);
  }
  html = html.replace(/<html lang="[^"]*">/, '<html lang="es">');
  // La plantilla de Unity trae 960x600 fijos; el contenedor debe ajustarse al iframe.
  html = html.replace('</head>', `<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      html, body { width: 100%; height: 100%; overflow: hidden; background: #231f20; }
      #unity-container, #unity-container.unity-desktop, #unity-container.unity-mobile { position: fixed; inset: 0; width: 100%; height: 100%; transform: none; }
      #unity-fullscreen-container { width: 100% !important; height: 100% !important; }
      #unity-canvas { width: 100%; height: 100%; display: block; outline: none; }
      #unity-footer { display: none; }
      #unity-warning { max-width: 90%; max-height: 80%; overflow: auto; z-index: 5; font: 14px/1.5 Arial, sans-serif; }
    </style>
  </head>`);
  await writeFile(path.join(destination, 'index.html'), html);
  await writeFile(configPath, JSON.stringify({ ...config, enabled: true }, null, 2) + '\n');
  console.log(`Juego importado en public/unity. Recursos descomprimidos: ${compressed.length}. Fuente original intacta.`);
  console.log('Ejecuta npm run build para actualizar la versión de producción.');
} catch (error) {
  console.error(`No se importó el juego: ${error.message}`);
  process.exitCode = 1;
}
