# Veterinaria San Marcos - Sitio Web

Este es el proyecto web que estamos armando para la Veterinaria San Marcos, una clínica de Rancagua que atiende perros, gatos, conejos y aves. La idea es que los dueños de mascotas puedan agendar citas en línea, revisar el historial de sus mascotas y que la clínica deje atrás el papeleo manual.

## ¿Qué hay en este archivo?

Por ahora solo está listo el **HTML** (`index.html`), que es la base de la página principal. Está armado con etiquetas semánticas de HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`) para que sea fácil de leer y de conectar con estilos y funcionalidad.

La página incluye:

- Encabezado con logo y menú de navegación
- Sección de inicio (hero)
- Quiénes somos
- Nuestro equipo
- Catálogo de servicios con precios (consultas, vacunas, cirugías, desparasitación, exámenes y otros)
- Formulario para solicitar una cita
- Ubicación con espacio para el mapa
- Pie de página con horarios, contacto y redes sociales

## ¿Qué falta por hacer?

- **CSS**: darle estilo visual a todo (colores, tipografías, espaciados) y agregar las imágenes reales (logo, fotos del equipo, foto del hero). Las imágenes ya están referenciadas en el HTML apuntando a una carpeta `assets/img/`, solo hay que poner los archivos ahí.
- **JavaScript**: hacer que el menú hamburguesa funcione en móvil, validar el formulario de citas antes de enviarlo, conectar el mapa (Leaflet o Google Maps) y hacer las peticiones a la API para guardar las citas.

## Cómo está pensado para trabajar en equipo

El HTML usa nombres de clases claros y consistentes (por ejemplo `header__logo`, `btn--primary`, `service-table`, `nav__list`) para que sea fácil saber qué estilos aplicar sin tener que adivinar. Y los elementos importantes para JavaScript ya tienen su `id` (como `navToggle`, `appointmentForm` o `map`), así que no hay que modificar la estructura del HTML para empezar a programar sobre ella.

## Estructura de carpetas sugerida

```
proyecto/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── img/
        ├── logo.png
        ├── hero-mascota.jpg
        └── ...
```

Cualquier duda sobre la estructura del HTML, revisen los comentarios que dejé dentro del archivo, ahí indico dónde va cada cosa.
