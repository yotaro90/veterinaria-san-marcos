# Veterinaria San Marcos - Sitio Web

Este es el proyecto web que estamos armando para la Veterinaria San Marcos, una clínica de Rancagua que atiende perros, gatos, conejos y aves. La idea es que los dueños de mascotas puedan agendar citas en línea, que los veterinarios consulten el historial clínico desde cualquier dispositivo, y que la recepcionista maneje la agenda sin tener que revisar archivadores.

## ¿Qué hay en este proyecto?

Por ahora está listo el **HTML** de todas las pantallas principales. Están armadas con etiquetas semánticas de HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`) para que sea fácil de leer y de conectar con estilos y funcionalidad.

- **`html.veterinaria-san-marcos.html`**: la página principal y pública del sitio. Acá cualquier visitante puede conocer la clínica, ver el catálogo de servicios con precios, revisar quiénes forman el equipo (con foto real del equipo) y llegar a la ubicación de la clínica. El botón "Agenda tu cita" (en el hero, el menú y el footer) lleva directo al panel del cliente, donde se gestionan las citas.

- **`html.portal.html`**: la puerta de entrada al sistema interno. Muestra tres botones para elegir con qué rol vas a ingresar: Cliente (que lleva al sitio principal), Veterinario o Recepcionista.

- **`html.cliente-dashboard.html`**: lo que ve un dueño de mascota una vez que entra al sistema. Puede revisar sus próximas citas, su historial de citas pasadas, y el estado de vacunación de su mascota (con aviso de cuáles vacunas están por vencer).

- **`html.veterinario-dashboard.html`**: la vista del veterinario. Tiene la agenda del día y una tabla de pacientes con un buscador para encontrar rápido a cualquier mascota o dueño.

- **`html.ficha-paciente.html`**: la ficha clínica de un paciente en particular. Muestra sus datos, el historial de atenciones anteriores, y un formulario para que el veterinario registre el diagnóstico, los medicamentos recetados y agende un control de seguimiento si corresponde.

- **`html.recepcionista-dashboard.html`**: la vista de la recepcionista. Tiene la agenda del día, un formulario para crear nuevas citas, y una sección para generar reportes de atenciones filtrando por fecha.

- **`logo.png`**: el logo de la clínica, con fondo transparente para que se vea bien sobre cualquier color.

- **`img/`**: carpeta con las imágenes del sitio, incluyendo la foto del hero (equipo examinando a un corgi) y la foto grupal del equipo.

## ¿Qué falta por hacer?

- **CSS**: darle estilo visual a todas las páginas (colores, tipografías, espaciados) y asegurarse de que se vean bien tanto en el sitio público como en las vistas internas.
- **JavaScript**: hacer funcionar el menú hamburguesa en móvil, que el buscador de pacientes filtre la tabla en tiempo real, validar los formularios (nueva cita, diagnóstico, nueva atención) antes de enviarlos, conectar el envío de datos a una base de datos o API, y generar los reportes de la recepcionista según las fechas que se elijan.

## Cómo está pensado para trabajar en equipo

Todo el HTML usa nombres de clases claros y consistentes (por ejemplo `header__logo`, `btn--primary`, `data-table`, `nav__list`) para que sea fácil saber qué estilos aplicar sin tener que adivinar. Los elementos importantes para JavaScript ya tienen su `id` (como `navToggle`, `patientSearch`, `clinicalForm` o `reportForm`), así que no hay que modificar la estructura del HTML para empezar a programar sobre ella.

Las tablas de pacientes también tienen atributos `data-pet` y `data-owner` en cada fila, pensados para que el buscador del veterinario pueda filtrar sin necesidad de tocar el HTML.

## Flujo de navegación

```
html.portal.html
├── Cliente          → html.veterinaria-san-marcos.html
│                        └── "Agenda tu cita" → html.cliente-dashboard.html
├── Veterinario      → html.veterinario-dashboard.html
│                        └── "Ver ficha" → html.ficha-paciente.html
└── Recepcionista    → html.recepcionista-dashboard.html
```

## Estructura de carpetas sugerida

```
proyecto/
├── html.veterinaria-san-marcos.html
├── html.portal.html
├── html.cliente-dashboard.html
├── html.veterinario-dashboard.html
├── html.ficha-paciente.html
├── html.recepcionista-dashboard.html
├── logo.png
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── img/
    ├── hero-mascota.webp
    ├── equipo-foto-grupal.jpg
    └── ... (más fotos e iconos)
```

Cualquier duda sobre la estructura de algún archivo, revisen los comentarios que dejé dentro del HTML, ahí indico dónde va cada cosa y qué parte le corresponde a CSS o a JS.
