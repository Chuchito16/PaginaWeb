# Nuestra casa compartida

Página en español creada con React y Vite para presentar la novela gráfica de Cali e integrar una exportación web de Unity. Incluye la compilación web de Unity importada desde UnityWebBuild.

## Iniciar

Requiere Node.js 22.12+ o una versión posterior compatible con Vite 7.

```powershell
npm install
npm run dev
```

Vite abre automáticamente el navegador predeterminado del sistema. Usa Microsoft Edge o Google Chrome para jugar con sonido. Para producción: `npm run build`; el resultado queda en `dist`. Para comprobar esa versión: `npm run preview`.

### Audio y vista integrada de VS Code

El build Web de Unity contiene clips AAC. El visor integrado de VS Code no admite ese códec y puede mostrar `EncodingError: Unable to decode audio data`. No es un error de Vite ni se resuelve concediendo permiso de reproducción automática. La página comprueba la compatibilidad antes de cargar Unity y ofrece copiar la dirección cuando el visor no admite el audio.

Si Vite ya estaba abierto, reinícialo con `npm run dev`, o copia su dirección local a Edge/Chrome fuera de VS Code. Haz clic dentro del juego para habilitar la reproducción y revisa que sus ajustes de volumen no estén en silencio. El cambio no modifica los clips ni silencia errores de Unity.

Referencias: [Audio Web de Unity](https://docs.unity.com/en-us/engine/6000.3/manual/platform-specific/webgl/develop/audio) y [formatos de audio admitidos por VS Code](https://code.visualstudio.com/api/extension-guides/webview#supported-media-formats).

## Incorporar el juego Unity

1. En Unity instala el módulo Web Build Support si hace falta, selecciona la plataforma Web y añade las escenas necesarias.
2. Puedes exportar sin compresión, con Decompression Fallback o con Gzip/Brotli. El importador descomprime los archivos .gz/.br dentro de la copia web y ajusta sus rutas para que funcionen en Vite y en hosting estático. La exportación original no se modifica.
3. Exporta con la plantilla web predeterminada a una carpeta independiente. Debe contener `index.html`, `Build/`, `TemplateData/` y, si se genera, `StreamingAssets/`.
4. Desde esta carpeta ejecuta:

```powershell
npm run unity:import -- "C:\ruta\a\la\exportacion-Web"
```

5. En la página pulsa **Comprobar disponibilidad**. El botón **Comenzar el juego** aparecerá cuando la exportación esté disponible. Se carga únicamente al pulsarlo.
6. Para publicar una actualización, repite la importación y `npm run build`.

El importador conserva los nombres base generados por Unity (quita .gz/.br al descomprimir) y copia toda la exportación a `public/unity/`; no requiere editar las rutas `.wasm` a mano. Las siguientes importaciones reemplazan archivos coincidentes, pero no eliminan archivos antiguos. Conviene usar nombres de compilación consistentes. No incluyas datos privados en la carpeta exportada: todo su contenido será público al desplegar el sitio.

La integración usa un iframe con pantalla completa y apertura en otra pestaña. El evento de carga del iframe solo confirma la apertura del HTML; el progreso, los errores del motor, el audio, los controles y el tamaño del canvas corresponden a la plantilla de Unity. El importador adapta la plantilla predeterminada al tamaño del iframe y oculta su pie de página duplicado. Prueba el juego real en los equipos de destino; la adaptación de la web no garantiza que cualquier compilación Unity funcione en móviles. Esta página no envía selecciones de capítulos a Unity ni guarda partidas: la navegación y el progreso pertenecen al juego.

Documentación: https://docs.unity.com/en-us/engine/6000.5/manual/platform-specific/webgl/building-distribution/deploying

## Estructura

- `src/App.jsx`: secciones, navegación y selección de capítulos.
- `src/content.js`: textos de capítulos y fuentes.
- `src/UnityPlayer.jsx`: disponibilidad e integración del juego.
- `src/Landscape.jsx`: ilustración vectorial original de Cali.
- `src/styles.css`: colores y diseño adaptable.
- `public/game-config.json`: activación y ruta de la compilación.
- `scripts/import-unity.mjs`: importador de la exportación de Unity.

## Publicación estática

Sube el contenido de `dist/` a un hosting estático. `base: './'` permite usar una subcarpeta, por ejemplo en GitHub Pages. No abras `dist/index.html` mediante `file://`; utiliza un servidor HTTP. No se ha creado un repositorio remoto ni publicado el sitio.

## Contenido y recursos

Basado en los documentos proporcionados: ASM_Proyecto_2a_Descripcion_Desastres_Naturales y NovelaVisual_Propuesta_Teorica_Cali_v2. Los cuatro capítulos son propuestas; la web no afirma que el prototipo ya implemente sus funciones. No se reprodujeron cifras, un evento sísmico fechado ni estadísticas de vivienda cuyas referencias estaban incompletas. Se omitieron los créditos individuales porque los integrantes de la portada difieren de los de la tabla de roles.

La identidad de la web toma azul, rojo, blanco y verde de la bandera de Cali, siguiendo la solicitud. Referencia: https://www.cali.gov.co/publicaciones/bandera_pub . Los documentos también piden identidad UAO para la interfaz de la novela: queda por validar con el equipo su aplicación dentro del juego; no se inventó un logo institucional.

La ilustración es original y estilizada, no es cartografía oficial ni un mapa de evacuación. Iconos: Lucide (ISC). Tipografías: Montserrat y Roboto Condensed desde Google Fonts (SIL Open Font License), con alternativas locales si no hay conexión. No hay analítica, formularios, cuentas ni almacenamiento de datos personales. Antes de publicar, el equipo debe completar los créditos y confirmar las licencias del código y de los recursos finales de Unity.

Fuentes enlazadas: Alcaldía de Cali, Servicio Geológico Colombiano, UNGRD y CVC. Los textos son una presentación educativa del proyecto, no alertas operativas.

## Identidad visual actual

Referencia de estilo: https://www.uao.edu.co/estudiante/ . Barra de utilidad vinotinto, navegación marfil, portada panorámica ilustrada, acentos rojos, enlaces con flecha y contenido sobre fondo blanco. El sitio conserva el nombre del proyecto y se identifica como proyecto académico; no reproduce menús, servicios ni el logotipo institucional. La ilustración original de Cali se muestra en la portada. Las interacciones y la integración de Unity se conservan.

## Compilación integrada

Exportación de origen: C:\Users\PC31A1\Desktop\UnityWebBuild. Fecha de integración: 14 de octubre de 2026. Carpeta del sitio: C:\Users\PC31A1\Desktop\PaginaWeb\Pagina_Juego. Para actualizar el juego: npm run unity:import -- "C:\Users\PC31A1\Desktop\UnityWebBuild", seguido de npm run build.
