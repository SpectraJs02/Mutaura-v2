# MUTAURA — beta v2

Sitio estático preparado para GitHub Pages. No necesita servidor ni instalación de dependencias.

## Probar localmente
Abre `index.html` en el navegador. Para trabajar cómodamente, abre la carpeta en Visual Studio Code y usa la extensión Live Server (opcional).

## Publicar en GitHub Pages
1. Descomprime el ZIP.
2. Sube **todo el contenido** de esta carpeta al repositorio, conservando la carpeta `assets`.
3. En GitHub entra a Settings → Pages.
4. En Build and deployment selecciona Deploy from a branch, `main` y `/(root)`.
5. Guarda y espera a que GitHub Pages publique la URL.

## Archivos principales
- `index.html`: estructura de la web y secciones editoriales.
- `styles.css`: diseño responsive.
- `app.js`: filtros, fichas, bolsa y pedido por WhatsApp.
- `products.js`: catálogo y contenido de cada producto.
- `assets/`: logo, fotografías de productos y páginas de referencia del catálogo.

## Notas
- Los precios no se muestran. El cliente consulta precio y disponibilidad por WhatsApp.
- El catálogo contiene 32 productos.
- Las descripciones se basan en el catálogo de MUTAURA. Las propiedades se expresan como información descriptiva del catálogo, no como promesas médicas.
- Si una fotografía individual no carga, la tarjeta usa una imagen alternativa para evitar un espacio roto.


ACTUALIZACIÓN VISUAL: se ocultó temporalmente el acceso a bolsa, los precios y los botones de compra. Los archivos de bolsa y sus scripts se conservaron para una futura integración de pagos.
