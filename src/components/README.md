# Componentes

Cada carpeta responde a una pregunta: **¿dónde se usa?**

| Carpeta | Qué va aquí | Ejemplos |
| --- | --- | --- |
| `layout/` | Lo que envuelve todas las páginas. | Header, Footer, menú móvil |
| `ui/` | Piezas base sin contenido propio, reutilizables en cualquier sitio. | Button, Words, RevealHeading, PageHeader, CtaBand |
| `shared/` | Secciones completas que aparecen en más de una página. | ServicesIndex (home y /servicios), WorkGrid |
| `home/` | Secciones que solo existen en el home. | Hero, Stakes, ProcessPath |
| `pages/<ruta>/` | Secciones de una página interior concreta, una carpeta por ruta. | `pages/servicios/Packages`, `pages/proyectos/ProjectGallery` |
| `landings/<nombre>/` | Secciones de cada landing de campaña, una carpeta por landing. | (vacía por ahora) |

Reglas:

- Si una sección de `home/` o `pages/` empieza a usarse en otra página, se mueve a `shared/`.
- Una landing puede importar de `ui/` y `shared/`, nunca de `home/` ni de otra landing: así se puede borrar una landing sin romper nada.
- La animación (GSAP) vive dentro de cada sección; las piezas de `ui/` como `Words` y `RevealHeading` son el vocabulario común (texto que sube desde una máscara, palabras que se encienden).
