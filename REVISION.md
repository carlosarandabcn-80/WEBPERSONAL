# Portada de Carlos Aranda Sánchez

Versión de revisión del 27 de noviembre de 2026. La rama parte del commit `c0f3f8dd6f8db6e23d1af68f5df2a4f55e6388a1` de WEBPERSONAL. La publicación en carlosaranda.pro requiere la aprobación de Carlos.

## Diseño y contenido

La franja negra reúne la marca personal, los enlaces existentes, el acceso a Formación y LinkedIn. En escritorio, el retrato intervenido ocupa el eje central entre «integración social» y «educación social». La primera identifica la titulación de técnico superior y la segunda el grado en curso. En móvil, la fotografía precede a las dos columnas de texto. La intervención gráfica es una interpretación del retrato facilitado mediante generación de imagen. El parecido y el recorte quedan sujetos al criterio del titular.

La comparación visual con la referencia se hizo sobre capturas de Chrome de 1440 × 900 y 390 × 844. Se revisaron la posición del rostro, su división, el tamaño de la cabecera, los textos laterales y el espacio blanco. El corte vertical del retrato pasa por el punto medio entre los bordes internos de ambas fosas nasales. Los títulos en español ocupan dos líneas. El nombre y los accesos a perfil y CV se sitúan en el pie de la portada.

El texto de la presentación anterior pasa al apartado Perfil. Se conservaron los bloques de texto del contenido principal, sus identificadores y los destinos de los enlaces. Se comprobó por comparación del HTML original con la salida PHP. Se conservaron las doce entradas del CV, las cuatro entradas de formación y los tres MP4. El diseño editorial organiza aportaciones y cronologías mediante líneas y columnas abiertas. Los reproductores incorporan cartel, descripción visual desplegable y enlace directo al archivo.

## Uso y mantenimiento

- Para revisar la versión completa sin servidor, descargar el ZIP de la rama, descomprimirlo y abrir `index.html`. La carpeta `assets` contiene los medios.
- Para ejecutar PHP con un entorno de desarrollo local, situarse en la raíz y ejecutar `php -S 127.0.0.1:8000`. Abrir `http://127.0.0.1:8000/index.php`.
- El punto de entrada es `index.php`. Las cuatro plantillas reúnen cabecera, portada, secciones y pie. Los estilos están en `assets/css/editorial.css` y la navegación en `assets/js/editorial.js`. Las hojas de estilo y el script del diseño anterior se conservan como archivos históricos y quedan fuera de la carga de la página.
- Tras editar las plantillas, regenerar el HTML desde la raíz con `php exportar.php`. Este paso también comprueba que la salida contiene una página completa antes de sustituir la copia estática.
- GitHub Pages sirve la exportación HTML. En un alojamiento con PHP se utiliza la entrada PHP. La configuración de Apache se incluye en `.htaccess` y requiere los permisos correspondientes.
- La revisión se limita a su rama. Si en el futuro se integra y hace falta recuperar el estado anterior, revertir el commit de integración y volver a desplegar la versión aprobada. El commit base citado al principio permite consultar y descargar la versión anterior.

## Resultados de la revisión

| Área | Comprobación y resultado |
| --- | --- |
| PHP | Cinco archivos de entrada y plantilla pasaron `php -l` con PHP nativo 8.4.28. El renderizado del intérprete coincidió byte a byte con la exportación HTML. |
| Cabeceras | Una petición GET al entorno de pruebas PHP 8.4.27 WebAssembly devolvió 200 y el documento completo. Se verificaron Content-Type, Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy y Permissions-Policy. La prueba nativa de acceso por HTTP local quedó bloqueada por la restricción de conexiones del entorno. |
| Seguridad del código | Revisión de las inclusiones PHP, entradas de usuario, enlaces externos y script de navegación. Las cuatro inclusiones usan rutas fijas. El contacto abre LinkedIn. El sitio carece de formularios, cookies de sesión, base de datos y bibliotecas de ejecución de terceros. |
| WCAG 2.2 A y AA | axe-core sobre la página completa en Chrome 158 a 1440 y 320 píxeles. En ambas ejecuciones, 22 reglas superadas, cero infracciones detectadas y una comprobación manual pendiente sobre subtítulos. La herramienta cubre una parte de los criterios WCAG. |
| Teclado | Tab alcanza «Saltar al contenido». Intro lleva el foco al contenido principal. En móvil se verificaron apertura del menú, acceso al primer enlace, cierre con Escape, devolución del foco y salto a Formación. |
| Adaptación | Chrome a 320, 390, 820 y 1440 píxeles. La anchura del documento coincidió con la ventana en las cuatro pruebas. Navegación y perfil también se visualizaron con JavaScript desactivado. Se probó la preferencia de movimiento reducido. |
| Imágenes y rendimiento | Dos tamaños WebP del retrato, de 49 490 y 179 150 bytes. Tamaños declarados y prioridad alta en portada. Fuentes del sistema, carga diferida de imágenes secundarias y vídeos con precarga desactivada. No se midieron métricas de campo. |
| Rutas y medios | Se resolvieron todos los destinos internos y las rutas locales del HTML. Chrome abrió los tres MP4 y leyó sus dimensiones y duración. Se conservó la dirección original de LinkedIn. El acceso externo al perfil y al dominio no pudo verificarse desde este entorno. |

## Pendiente antes de una declaración de conformidad

Una persona usuaria de lector de pantalla debe poder recorrer el menú, los títulos y los tres reproductores. Quedan por contrastar el habla y los sonidos relevantes con cada vídeo completo, valorar subtítulos y audiodescripción, y probar el sitio en Safari/iOS. Las descripciones visuales desplegables figuran junto a cada reproductor. El servidor elegido determinará las cabeceras reales, la compresión, la caché y el rendimiento en red. En el alojamiento PHP conviene desactivar la exposición de la versión mediante la directiva `expose_php`.

### Referencias técnicas

- [WCAG 2.2 del W3C](https://www.w3.org/TR/WCAG22/)
- [Cabeceras HTTP de OWASP](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [Alojamiento estático de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

