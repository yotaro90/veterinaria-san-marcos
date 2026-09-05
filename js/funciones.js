// Manejo del menú de navegación 
const botonMenu = document.querySelector('#navToggle');
const menuNavegacion = document.querySelector('#navMenu');

if (botonMenu && menuNavegacion) {
  botonMenu.addEventListener('click', function() {
    menuNavegacion.classList.toggle('activo');
  });
}

// Mapa Interactivo
const contenedorMapa = document.querySelector('#map');

if (contenedorMapa) {
  const latRancagua = -34.1701;
  const lngRancagua = -70.7444;

  // Iniciar mapa
  const mapa = L.map('map').setView([latRancagua, lngRancagua], 15);

  // Cargar mapa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);

  // Agregar marcador de la clínica
  const marcador = L.marker([latRancagua, lngRancagua]).addTo(mapa);
  marcador.bindPopup('<b>Veterinaria San Marcos</b><br>Rancagua, Chile').openPopup();
}

// Funciones para mostrar y limpiar mensajes de error
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

function limpiarError(campo) {
  campo.classList.remove('campo-error');
  const textoError = campo.parentElement.querySelector('.mensaje-error');
  
  if (textoError) {
    textoError.remove();
  }
}

// Función reutilizable para validar fecha y hora dentro del horario de atención
function validarFechaYHora(campoFecha, campoHora) {
  if (!campoFecha || !campoHora) return false;

  let esValido = true;
  let fechaEsValida = false;
  let esHoy = false;
  let diaSemana = -1;

  const ahora = new Date();
  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

  // Validar fecha
  if (campoFecha.value === '') {
    mostrarError(campoFecha, 'Debe seleccionar una fecha.');
    esValido = false;
  } else {
    const partesFecha = campoFecha.value.split('-');
    const anio = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]) - 1;
    const dia = parseInt(partesFecha[2]);
    const fechaSeleccionada = new Date(anio, mes, dia);

    diaSemana = fechaSeleccionada.getDay(); // 0: Domingo, 1-5: Lunes a Viernes, 6: Sábado
    esHoy = fechaSeleccionada.getTime() === hoy.getTime();

    if (fechaSeleccionada < hoy) {
      mostrarError(campoFecha, 'La fecha no puede ser anterior a la fecha actual.');
      esValido = false;
    } else if (diaSemana === 0) {
      mostrarError(campoFecha, 'Atención cerrada los domingos. Por favor elige de lunes a sábado.');
      esValido = false;
    } else {
      limpiarError(campoFecha);
      fechaEsValida = true;
    }
  }

  // Validar hora
  if (campoHora.value === '') {
    mostrarError(campoHora, 'Debe seleccionar una hora.');
    esValido = false;
  } else if (fechaEsValida) {
    const partesHora = campoHora.value.split(':');
    const hora = parseInt(partesHora[0]);
    const minuto = parseInt(partesHora[1]);
    const minutosTotales = (hora * 60) + minuto;

    const minutosInicio = 9 * 60; // Horario de atención empieza a las 09:00
    const minutosFin = (diaSemana === 6) ? (14 * 60) : (19 * 60); // Sábado hasta 14:00, L-V hasta 19:00
    const minutosActuales = (ahora.getHours() * 60) + ahora.getMinutes();

    if (minutosTotales < minutosInicio || minutosTotales > minutosFin) {
      const mensajeHorario = (diaSemana === 6) ? 'Los sábados el horario de atención es de 09:00 a 14:00.' : 'De lunes a viernes el horario de atención es de 09:00 a 19:00.';
      mostrarError(campoHora, mensajeHorario);
      esValido = false;
    } else if (esHoy && minutosTotales <= minutosActuales) {
      mostrarError(campoHora, 'Para el día de hoy, debe elegir una hora posterior a la hora actual.');
      esValido = false;
    } else {
      limpiarError(campoHora);
    }
  } else {
    limpiarError(campoHora);
  }

  return esValido;
}

// Patrones para validaciones
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Formato celular chileno: +56 9 1234 5678 o 912345678
const patronTelefono = /^(\+?56)?9\d{8}$/;

// Validación del formulario de agendamiento de citas (Cliente / Recepcionista)
const formulario = document.querySelector('#appointmentForm') || 
                   document.querySelector('#newAppointmentForm') || 
                   document.querySelector('#newClientAppointmentForm');

if (formulario) {
  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombreDuenio = document.querySelector('#ownerName') || document.querySelector('#ownerNameR');
    const correoDuenio = document.querySelector('#ownerEmail');
    const telefonoDuenio = document.querySelector('#ownerPhone') || document.querySelector('#ownerPhoneR');
    const nombreMascota = document.querySelector('#petName') || document.querySelector('#petNameR') || document.querySelector('#petNameC');
    const especieMascota = document.querySelector('#petSpecies') || document.querySelector('#petSpeciesR') || document.querySelector('#petSpeciesC');
    const tipoServicio = document.querySelector('#serviceType') || document.querySelector('#serviceTypeR') || document.querySelector('#serviceTypeC');
    const vetAsignado = document.querySelector('#vetAssigned');
    const fechaCita = document.querySelector('#appointmentDate') || document.querySelector('#appointmentDateR') || document.querySelector('#appointmentDateC');
    const horaCita = document.querySelector('#appointmentTime') || document.querySelector('#appointmentTimeR') || document.querySelector('#appointmentTimeC');

    let esValido = true;

    // Validación nombre del dueño (si existe en la vista)
    if (nombreDuenio) {
      if (nombreDuenio.value.trim() === '') {
        mostrarError(nombreDuenio, 'El nombre del dueño es obligatorio.');
        esValido = false;
      } else {
        limpiarError(nombreDuenio);
      }
    }

    // Validación correo electrónico (si existe)
    if (correoDuenio) {
      if (correoDuenio.value.trim() === '') {
        mostrarError(correoDuenio, 'El correo electrónico es obligatorio.');
        esValido = false;
      } else if (!patronCorreo.test(correoDuenio.value.trim())) {
        mostrarError(correoDuenio, 'Ingrese un correo electrónico válido.');
        esValido = false;
      } else {
        limpiarError(correoDuenio);
      }
    }

    // Validación teléfono (si existe)
    if (telefonoDuenio) {
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
    }

    // Validación nombre de mascota
    if (nombreMascota) {
      if (nombreMascota.value.trim() === '') {
        mostrarError(nombreMascota, 'El nombre de la mascota es obligatorio.');
        esValido = false;
      } else {
        limpiarError(nombreMascota);
      }
    }

    // Validación especie
    if (especieMascota) {
      if (especieMascota.value === '') {
        mostrarError(especieMascota, 'Debe seleccionar una especie.');
        esValido = false;
      } else {
        limpiarError(especieMascota);
      }
    }

    // Validación tipo de servicio
    if (tipoServicio) {
      if (tipoServicio.value === '') {
        mostrarError(tipoServicio, 'Debe seleccionar un tipo de servicio.');
        esValido = false;
      } else {
        limpiarError(tipoServicio);
      }
    }

    // Validación veterinario asignado (si existe)
    if (vetAsignado) {
      if (vetAsignado.value === '') {
        mostrarError(vetAsignado, 'Debe seleccionar un veterinario.');
        esValido = false;
      } else {
        limpiarError(vetAsignado);
      }
    }

    // Validación fecha y hora (reutilizando la función)
    if (fechaCita && horaCita) {
      if (!validarFechaYHora(fechaCita, horaCita)) {
        esValido = false;
      }
    }

    // Mensaje de confirmación e inserción en tabla si es válido
    let mensajeConfirmacion = formulario.querySelector('.mensaje-confirmacion');

    if (esValido) {
      if (!mensajeConfirmacion) {
        mensajeConfirmacion = document.createElement('p');
        mensajeConfirmacion.className = 'mensaje-confirmacion';
        formulario.after(mensajeConfirmacion);
      }
      mensajeConfirmacion.textContent = 'Solicitud enviada con éxito. Nos comunicaremos a la brevedad para confirmar.';

      // Agregar dinámicamente a la tabla "Mis próximas citas" si existe la tabla #upcomingTable
      const tablaProximas = document.querySelector('#upcomingTable tbody');
      if (tablaProximas) {
        const partesF = fechaCita.value.split('-');
        const fechaFormateada = `${partesF[2]}-${partesF[1]}-${partesF[0]}`;
        const textoServicio = tipoServicio.options[tipoServicio.selectedIndex].text;

        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
          <td data-label="Fecha">${fechaFormateada}</td>
          <td data-label="Hora">${horaCita.value}</td>
          <td data-label="Mascota">${nombreMascota.value}</td>
          <td data-label="Servicio">${textoServicio}</td>
          <td data-label="Veterinario">Por asignar</td>
          <td data-label="Estado"><span class="badge badge--pending">Por confirmar</span></td>
          <td data-label="Acciones">
            <button type="button" class="btn btn--small btn--outline">Reagendar</button>
            <button type="button" class="btn btn--small btn--danger">Cancelar</button>
          </td>
        `;
        tablaProximas.appendChild(nuevaFila);
      }

      formulario.reset();
    } else {
      if (mensajeConfirmacion) {
        mensajeConfirmacion.remove();
      }
    }
  });
}

// Validación nueva de atención (Veterinario)
const formClinico = document.querySelector('#clinicalForm');

if (formClinico) {
  formClinico.addEventListener('submit', function(e) {
    e.preventDefault();

    const motivo = document.querySelector('#reason');
    const diagnostico = document.querySelector('#diagnosis');
    const agendarControl = document.querySelector('#scheduleControl');
    const fechaControl = document.querySelector('#controlDate');
    const horaControl = document.querySelector('#controlTime');

    let esValido = true;

    // Validación motivo
    if (motivo) {
      if (motivo.value.trim() === '') {
        mostrarError(motivo, 'El motivo de la consulta es obligatorio.');
        esValido = false;
      } else {
        limpiarError(motivo);
      }
    }

    // Validación diagnóstico
    if (diagnostico) {
      if (diagnostico.value.trim() === '') {
        mostrarError(diagnostico, 'El diagnóstico es obligatorio.');
        esValido = false;
      } else {
        limpiarError(diagnostico);
      }
    }

    // Validación datos de control de seguimiento
    if (agendarControl && agendarControl.checked) {
      if (fechaControl && horaControl) {
        if (!validarFechaYHora(fechaControl, horaControl)) {
          esValido = false;
        }
      }
    } else {
      if (fechaControl) limpiarError(fechaControl);
      if (horaControl) limpiarError(horaControl);
    }

    // Mensaje de confirmación
    let mensajeConfirmacion = formClinico.querySelector('.mensaje-confirmacion');

    if (esValido) {
      if (!mensajeConfirmacion) {
        mensajeConfirmacion = document.createElement('p');
        mensajeConfirmacion.className = 'mensaje-confirmacion';
        formClinico.after(mensajeConfirmacion);
      }
      mensajeConfirmacion.textContent = 'Atención clínica registrada exitosamente.';
      formClinico.reset();
    } else {
      if (mensajeConfirmacion) {
        mensajeConfirmacion.remove();
      }
    }
  });
}

// Validación del formulario de reportes (Recepcionista)
const formReporte = document.querySelector('#reportForm');

if (formReporte) {
  formReporte.addEventListener('submit', function(e) {
    e.preventDefault();

    const fechaDesde = document.querySelector('#dateFrom');
    const fechaHasta = document.querySelector('#dateTo');
    const contenedorResultados = document.querySelector('#reportResults');

    let esValido = true;
    let desdeEsValida = false;
    let fechaDesdeObj = null;

    const ahora = new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

    // Validación fecha desde
    if (fechaDesde) {
      if (fechaDesde.value === '') {
        mostrarError(fechaDesde, 'Debe ingresar la fecha de inicio.');
        esValido = false;
      } else {
        const partesDesde = fechaDesde.value.split('-');
        fechaDesdeObj = new Date(parseInt(partesDesde[0]), parseInt(partesDesde[1]) - 1, parseInt(partesDesde[2]));

        if (fechaDesdeObj > hoy) {
          mostrarError(fechaDesde, 'La fecha de inicio no puede ser una fecha futura.');
          esValido = false;
        } else {
          limpiarError(fechaDesde);
          desdeEsValida = true;
        }
      }
    }

    // Validación fecha hasta
    if (fechaHasta) {
      if (fechaHasta.value === '') {
        mostrarError(fechaHasta, 'Debe ingresar la fecha de término.');
        esValido = false;
      } else {
        const partesHasta = fechaHasta.value.split('-');
        const fechaHastaObj = new Date(parseInt(partesHasta[0]), parseInt(partesHasta[1]) - 1, parseInt(partesHasta[2]));

        if (fechaHastaObj > hoy) {
          mostrarError(fechaHasta, 'La fecha de término no puede ser una fecha futura.');
          esValido = false;
        } else if (desdeEsValida && fechaHastaObj < fechaDesdeObj) {
          mostrarError(fechaHasta, 'La fecha final no puede ser anterior a la fecha inicial.');
          esValido = false;
        } else {
          limpiarError(fechaHasta);
        }
      }
    }

    if (esValido && contenedorResultados) {
      contenedorResultados.textContent = 'Reporte generado correctamente para el período seleccionado.';
    }
  });
}

// Búsqueda de pacientes (Veterinario)
const buscadorPacientes = document.querySelector('#patientSearch');
const tablaPacientes = document.querySelector('#patientsTable');

if (buscadorPacientes && tablaPacientes) {
  buscadorPacientes.addEventListener('input', function() {
    const textoBusqueda = buscadorPacientes.value.toLowerCase().trim();
    const filas = tablaPacientes.querySelectorAll('tbody tr');

    filas.forEach(function(fila) {
      const mascota = (fila.getAttribute('data-pet') || '').toLowerCase();
      const duenio = (fila.getAttribute('data-owner') || '').toLowerCase();

      if (mascota.includes(textoBusqueda) || duenio.includes(textoBusqueda)) {
        fila.style.display = '';
      } else {
        fila.style.display = 'none';
      }
    });
  });
}