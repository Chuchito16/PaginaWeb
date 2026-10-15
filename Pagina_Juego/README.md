# Nuestra casa compartida

Página en español creada con React y Vite para presentar la novela gráfica de Cali e integrar una exportación web de Unity. El juego no viene incluido: permanece en desarrollo.

## Iniciar

Requiere Node.js 22.12+ o una versión posterior compatible con Vite 7.

```powershell
npm install
npm run dev
```

Abre la dirección que imprime Vite. Para producción: `npm run build`; el resultado queda en `dist`. Para comprobar esa versión: `npm run preview`.

## Incorporar el juego Unity

1. En Unity instala el módulo Web Build Support si hace falta, selecciona la plataforma Web y añade las escenas necesarias.
2. En Player Settings > Publishing Settings, usa **Compression Format: Disabled** para la primera integración. Como alternativa, activa **Decompression Fallback**: Unity generará archivos `.unityweb`, adecuados para este servidor estático sin configurar cabeceras de compresión. La ruta exacta del menú puede variar con la versión del editor.
3. Exporta con la plantilla web predeterminada a una carpeta independiente. Debe contener `index.html`, `Build/`, `TemplateData/` y, si se genera, `StreamingAssets/`.
4. Desde esta carpeta ejecuta:

```powershell
npm run unity:import -- "C:\ruta\a\la\exportacion-Web"
```

5. En la página pulsa **Comprobar disponibilidad**. El botón **Comenzar el juego** aparecerá cuando la exportación esté disponible. Se carga únicamente al pulsarlo.
6. Para publicar una actualización, repite la importación y `npm run build`.

El importador conserva los nombres generados por Unity y copia toda la exportación a `public/unity/`; no requiere editar las rutas `.wasm` a mano. Las siguientes importaciones reemplazan archivos coincidentes, pero no eliminan archivos antiguos. Conviene usar nombres de compilación consistentes. No incluyas datos privados en la carpeta exportada: todo su contenido será público al desplegar el sitio.

La integración usa un iframe con pantalla completa y apertura en otra pestaña. El evento de carga del iframe solo confirma la apertura del HTML; el progreso, los errores del motor, el audio, los controles y el tamaño del canvas corresponden a la plantilla de Unity. Adapta el canvas del juego a su contenedor si su plantilla usa un tamaño fijo. Prueba el juego real en los equipos de destino; la adaptación de la web no garantiza que cualquier compilación Unity funcione en móviles. Esta página no envía selecciones de capítulos a Unity ni guarda partidas: la navegación y el progreso pertenecen al juego.

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
