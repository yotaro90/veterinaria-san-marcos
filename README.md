# Veterinaria San Marcos - Sitio Web

Este es el proyecto web que estamos armando para la Veterinaria San Marcos, una clínica de Rancagua que atiende perros, gatos, conejos y aves. La idea es que los dueños de mascotas puedan agendar citas en línea, que los veterinarios consulten el historial clínico desde cualquier dispositivo, y que la recepcionista maneje la agenda sin tener que revisar archivadores.

## ¿Qué hay en este proyecto?

El sitio ya tiene HTML, CSS y JavaScript funcionando en conjunto. El HTML está armado con etiquetas semánticas de HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`).

- **`html.veterinaria-san-marcos.html`**: la página principal y pública del sitio. Acá cualquier visitante puede conocer la clínica, ver el catálogo de servicios con precios, revisar quiénes forman el equipo (con fotos reales), y ubicar la clínica en un mapa interactivo.

- **`html.portal.html`**: la puerta de entrada al sistema interno. Muestra tres botones para elegir con qué rol vas a ingresar: Cliente, Veterinario o Recepcionista.

- **`html.cliente-dashboard.html`**: lo que ve un dueño de mascota una vez que entra al sistema. Puede revisar sus próximas citas, solicitar una nueva cita con un formulario propio, ver su historial de citas pasadas, y el estado de vacunación de su mascota (con aviso de cuáles vacunas están por vencer).

- **`html.veterinario-dashboard.html`**: la vista del veterinario. Tiene la agenda del día y una tabla de pacientes con un buscador para encontrar rápido a cualquier mascota o dueño.

- **`html.ficha-paciente.html`**: la ficha clínica de un paciente en particular. Muestra sus datos, el historial de atenciones anteriores, el historial de vacunación, y un formulario para que el veterinario registre el diagnóstico, los medicamentos recetados y agende un control de seguimiento si corresponde.

- **`html.recepcionista-dashboard.html`**: la vista de la recepcionista. Tiene la agenda del día, un formulario para crear nuevas citas, y una sección para generar reportes de atenciones filtrando por fecha.

- **`img/`**: todas las imágenes del sitio, incluyendo el logo, la foto del hero, la foto grupal del equipo y las fotos individuales de cada rol.

- **`css/styles.css`** y **`js/funciones.js`**: los estilos y la lógica del sitio, ya implementados por el equipo. Incluye diseño responsive y el mapa interactivo de la ubicación.

## Flujo de navegación

```
html.portal.html
├── Cliente          → html.veterinaria-san-marcos.html
│                        └── "Agenda tu cita" → html.cliente-dashboard.html
│                                                  ├── Mis citas
│                                                  ├── Nueva cita (formulario)
│                                                  ├── Historial
│                                                  └── Vacunas
├── Veterinario      → html.veterinario-dashboard.html
│                        └── "Ver ficha" → html.ficha-paciente.html
│                                             ├── Historial de atenciones
│                                             ├── Historial de vacunación
│                                             └── Registrar nueva atención
└── Recepcionista    → html.recepcionista-dashboard.html
                          ├── Agenda del día
                          ├── Nueva cita
                          └── Reportes
```

## ¿Qué falta por hacer?

- Conectar los formularios (nueva cita, diagnóstico, reportes) a una base de datos o API real, ya que por ahora el envío es solo de ejemplo (`action="#"`).
- Que el buscador de pacientes del veterinario filtre en vivo la tabla usando los atributos `data-pet` y `data-owner` que ya trae cada fila.
- Revisar el responsive en dispositivos más pequeños a medida que se agreguen más secciones.

## Cómo está pensado para trabajar en equipo

Todo el HTML usa nombres de clases claros y consistentes (por ejemplo `header__logo`, `btn--primary`, `data-table`, `nav__list`) para que el CSS y el JS se conecten sin adivinar selectores. Los elementos importantes para JavaScript tienen su propio `id` (como `navToggle`, `patientSearch`, `clinicalForm`, `newClientAppointmentForm` o `reportForm`).

Cualquier duda sobre la estructura de algún archivo, revisen los comentarios que quedan dentro del HTML, ahí se indica dónde va cada cosa.
