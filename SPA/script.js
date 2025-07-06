// script.js
const API_BASE = "https://localhost:53971/api";

// Mostrar/Ocultar secciones
function showSection(sectionId) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hide"));
  document.querySelector(sectionId).classList.remove("hide");
}

// Registro de usuario
$("#register-form").on("submit", async function (e) {
  e.preventDefault();

  const data = {
    nombreCompleto: $("#nombre").val(),
    password: $("#password").val(),
    pais: $("#pais").val(),
    dni: $("#dni").val(),
    fechaNacimiento: $("#fechaNacimiento").val(),
    telefono: $("#telefono").val(),
    email: $("#email").val(),
    direccion: $("#direccion").val()
  };

  try {
    await $.ajax({
      url: `${API_BASE}/usuario`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data)
    });
    alert("Usuario registrado correctamente.");
    showSection("#login-section");
  } catch (err) {
    alert("Error al registrar usuario.");
  }
});

// Login
$("#login-form").on("submit", async function (e) {
  e.preventDefault();

  const credentials = {
    email: $("#login-email").val(),
    password: $("#login-password").val()
  };

  try {
    const res = await $.ajax({
      url: `${API_BASE}/auth/login`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(credentials)
    });

    localStorage.setItem("token", res.token);
    localStorage.setItem("usuarioId", res.usuarioId);

    cargarUsuario();
    showSection("#home-section");
  } catch {
    alert("Credenciales incorrectas");
  }
});

// Cargar usuario actual
async function cargarUsuario() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const user = await $.ajax({
      url: `${API_BASE}/auth/actual`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    $("#user-name").text(user.nombre_Completo);
    $("#login-item, #register-item").addClass("d-none");
    $("#user-info, #logout-item").removeClass("d-none");
  } catch {
    localStorage.clear();
  }
}

// Logout
$("#logout-link").on("click", function () {
  localStorage.clear();
  location.reload();
});

// Confirmar reserva
$("#confirm-reservation").on("click", async function () {
  const data = {
    usuarioId: localStorage.getItem("usuarioId"),
    vehiculoId: $("#vehiculoId").val(),
    empleadoId: null,
    fechaInicio: $("#fechaInicio").val(),
    fechaFin: $("#fechaFin").val(),
    estado: "Pendiente",
    aceptoTerminos: $("#aceptoTerminos").is(":checked")
  };

  try {
    const res = await $.ajax({
      url: `${API_BASE}/alquiler`,
      method: "POST",
      contentType: "application/json",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: JSON.stringify(data)
    });

    $("#reservation-success").removeClass("d-none");
    $("#reservation-form, #modal-footer-buttons").addClass("d-none");
  } catch {
    alert("Error al realizar reserva");
  }
});

// Inicializar
$(document).ready(() => {
  cargarUsuario();

  // Mostrar secciones según navbar
  $("#home-link").on("click", () => showSection("#home-section"));
  $("#fleet-link").on("click", () => showSection("#fleet-section"));
  $("#login-link").on("click", () => showSection("#login-section"));
  $("#register-link").on("click", () => showSection("#register-section"));
  $("#make-another-reservation").on("click", () => location.reload());
});
$(document).ready(function () {
cargarVehiculos();
});

function cargarVehiculos() {
fetch("https://localhost:53971/api/vehiculo") // Cambia la URL según tu puerto/API
.then(response => {
if (!response.ok) throw new Error("Error al obtener vehículos");
return response.json();
})
.then(vehiculos => {
const contenedor = $("#vehicle-container");
contenedor.empty();

php-template
Copiar
Editar
  vehiculos.forEach(v => {
    const card = `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${v.marca} ${v.modelo}</h5>
            <p class="card-text">
              <strong>Tipo:</strong> ${v.tipo}<br>
              <strong>Año:</strong> ${v.anio}<br>
              <strong>Color:</strong> ${v.color}<br>
              <strong>Placa:</strong> ${v.placa}<br>
              <strong>Precio por día:</strong> $${v.precioPorDia}
            </p>
            <button class="btn btn-primary mt-auto reservar-btn" data-id="${v.vehiculoId}" data-nombre="${v.marca} ${v.modelo}">
              Reservar
            </button>
          </div>
        </div>
      </div>
    `;
    contenedor.append(card);
  });
})
.catch(error => {
  console.error("Error:", error);
  $("#vehicle-container").html(`<p class="text-danger">No se pudieron cargar los vehículos.</p>`);
});
}
$(document).on("click", ".reservar-btn", function () {
const vehiculoId = $(this).data("id");
const nombreVehiculo = $(this).data("nombre");
// Abrís modal, cargás info, etc.
console.log("Reservar", vehiculoId, nombreVehiculo);
});
