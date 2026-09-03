// Manejo del menú de navegación)

const botonMenu = document.querySelector('#navToggle');
const menuNavegacion = document.querySelector('#navMenu');

if (botonMenu && menuNavegacion) {
  botonMenu.addEventListener('click', function() {
    menuNavegacion.classList.toggle('activo');
  });
}

// Validación del formulario de agendamiento de citas
const formulario = document.querySelector('#appointmentForm');
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Formato celular chileno: +56 9 1234 5678 o 912345678
const patronTelefono = /^(\+?56)?9\d{8}$/;

if (formulario) {
  // Función para mostrar un mensaje de error de un campo
  function mostrarError(campo, mensaje) {
    campo.classList.add('campo-error');
    let textoError = campo.parentElement.querySelector('.mensaje-error');
    
    if (!textoError) {
      textoError = document.createElement('span');
      textoError.className = 'mensaje-error';
      campo.after(textoError);
    }
    
    textoError.textContent = mensaje;
  }

  // Función para limpiar el mensaje de error de un campo
  function limpiarError(campo) {
    campo.classList.remove('campo-error');
    const textoError = campo.parentElement.querySelector('.mensaje-error');
    
    if (textoError) {
      textoError.remove();
    }
  }

  // Evento de envío del formulario
  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombreDuenio = document.querySelector('#ownerName');
    const correoDuenio = document.querySelector('#ownerEmail');
    const telefonoDuenio = document.querySelector('#ownerPhone');
    const nombreMascota = document.querySelector('#petName');
    const especieMascota = document.querySelector('#petSpecies');
    const tipoServicio = document.querySelector('#serviceType');

    let esValido = true;

    // Validar Nombre del Dueño
    if (nombreDuenio.value.trim() === '') {
      mostrarError(nombreDuenio, 'El nombre del dueño es obligatorio.');
      esValido = false;
    } else {
      limpiarError(nombreDuenio);
    }

    // Validar Correo Electrónico
    if (correoDuenio.value.trim() === '') {
      mostrarError(correoDuenio, 'El correo electrónico es obligatorio.');
      esValido = false;
    } else if (!patronCorreo.test(correoDuenio.value.trim())) {
      mostrarError(correoDuenio, 'Ingrese un correo electrónico válido.');
      esValido = false;
    } else {
      limpiarError(correoDuenio);
    }

    // Validar Teléfono
    const telefonoLimpio = telefonoDuenio.value.replace(/[\s-]/g, '');

    if (telefonoDuenio.value.trim() === '') {
      mostrarError(telefonoDuenio, 'El teléfono de contacto es obligatorio.');
      esValido = false;
    } else if (!patronTelefono.test(telefonoLimpio)) {
      mostrarError(telefonoDuenio, 'Ingrese un celular chileno válido (ej: +56 9 1234 5678 o 912345678).');
      esValido = false;
    } else {
      limpiarError(telefonoDuenio);
    }

    // Validar Nombre de Mascota
    if (nombreMascota.value.trim() === '') {
      mostrarError(nombreMascota, 'El nombre de la mascota es obligatorio.');
      esValido = false;
    } else {
      limpiarError(nombreMascota);
    }

    // Validar Especie
    if (especieMascota.value === '') {
      mostrarError(especieMascota, 'Debe seleccionar una especie.');
      esValido = false;
    } else {
      limpiarError(especieMascota);
    }

    // Validar Tipo de Servicio
    if (tipoServicio.value === '') {
      mostrarError(tipoServicio, 'Debe seleccionar un tipo de servicio.');
      esValido = false;
    } else {
      limpiarError(tipoServicio);
    }




    // Falta validar fecha y hora de la cita.





    // Mensaje de confirmación
    let mensajeConfirmacion = formulario.querySelector('.mensaje-confirmacion');

    if (esValido) {
      if (!mensajeConfirmacion) {
        mensajeConfirmacion = document.createElement('p');
        mensajeConfirmacion.className = 'mensaje-confirmacion';
        formulario.after(mensajeConfirmacion);
      }
      mensajeConfirmacion.textContent = 'Solicitud enviada con éxito. Nos comunicaremos a la brevedad para confirmar.';
      formulario.reset();
    } else {
      if (mensajeConfirmacion) {
        mensajeConfirmacion.remove();
      }
    }
  });
}

// Falta inicialización de mapa
//