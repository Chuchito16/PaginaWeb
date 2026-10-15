import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = process.argv[2];
if (!input) {
  console.error('Uso: npm run unity:import -- "C:\\ruta\\a\\la\\exportacion-Web"');
  process.exit(1);
}
try {
  const source = path.resolve(input);
  const destination = path.join(root, 'public', 'unity');
  const isWithin = (parent, child) => { const relative = path.relative(parent, child); return !relative || (!relative.startsWith('..') && !path.isAbsolute(relative)); };
  if (isWithin(source, destination) || isWithin(destination, source)) throw new Error('La exportación debe estar fuera de public/unity y no puede contener el proyecto web.');
  const html = await readFile(path.join(source, 'index.html'), 'utf8');
  if (!html.includes('createUnityInstance')) throw new Error('El index.html no parece una exportación Web de Unity. Usa la plantilla predeterminada de Unity.');
  const files = await readdir(path.join(source, 'Build'));
  for (const extension of ['.loader.js', '.data', '.wasm', '.framework.js']) {
    if (!files.some(name => name.endsWith(extension) || name.endsWith(extension + '.unityweb') || name.endsWith(extension + '.gz') || name.endsWith(extension + '.br'))) throw new Error(`Falta un archivo ${extension} en Build.`);
  }
  if (files.some(name => /\.(br|gz)$/.test(name))) throw new Error('La compilación usa compresión nativa (.br/.gz). Activa Decompression Fallback o desactiva Compression Format en Unity y vuelve a exportar para este servidor estático.');
  // Deshabilitar mientras se copian los archivos evita anunciar una importación incompleta.
  const configPath = path.join(root, 'public', 'game-config.json');
  const config = { enabled: false, url: 'unity/index.html', title: 'Nuestra casa compartida' };
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');
  await mkdir(destination, { recursive: true });
  await cp(source, destination, { recursive: true, force: true, filter: async (file) => {
    const { lstat } = await import('node:fs/promises');
    if ((await lstat(file)).isSymbolicLink()) throw new Error('No se permiten enlaces simbólicos en la exportación.');
    return true;
  }});
  await writeFile(configPath, JSON.stringify({ ...config, enabled: true }, null, 2) + '\n');
  console.log('Juego importado en public/unity. Recarga la página o pulsa Comprobar disponibilidad.');
  console.log('Para publicar, ejecuta npm run build de nuevo.');
} catch (error) {
  console.error(`No se importó el juego: ${error.message}`);
  process.exitCode = 1;
}
