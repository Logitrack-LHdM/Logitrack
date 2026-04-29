// 1. Verificación de Seguridad (Auth Guard)
const usuarioJSON = sessionStorage.getItem("usuarioLogueado");
const token = sessionStorage.getItem("token");

// Si no hay usuario o no hay token, lo expulsamos al index
if (!usuarioJSON || !token) {
    window.location.href = "./index.html";
}

const usuario = JSON.parse(usuarioJSON);

// 2. Cargar datos en la Interfaz
// Usamos usuario.username porque así lo devuelve tu LoginResponseDTO
document.getElementById("nombreUsuario").textContent = usuario.username;

const elRol = document.getElementById("rolUsuario");
if (elRol) {
    // Limpiamos el rol por si Spring Boot envía "ROLE_SUPERVISOR" y lo ponemos bonito
    const rolMostrar = usuario.rol.replace('ROLE_', '').toLowerCase();
    elRol.textContent = rolMostrar;
}

// 3. Lógica de Cierre de Sesión
document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    // Es vital eliminar el token JWT además de los datos del usuario
    sessionStorage.removeItem("usuarioLogueado");
    sessionStorage.removeItem("token");
    window.location.href = "./index.html";
});

// 4. Normalización de roles para validaciones
// Spring Boot envía "SUPERVISOR", lo pasamos a minúsculas para comparar fácilmente
const rolNormalizado = usuario.rol.toLowerCase().replace('role_', '');
const esSupervisor = (rolNormalizado === "supervisor");

// 5. Aplicar lógica de permisos en el DOM
// Habilitar selects de estado y prioridad segun rol
document.querySelectorAll(".edicion").forEach(e => {
    if (!esSupervisor) {
        e.disabled = true;
    }
});

// Ocultar botones de edicion
const divBotones = document.getElementById("botonesEdicion");
if (divBotones) {
    if (esSupervisor) {
        divBotones.classList.remove("d-none");
    } else {
        divBotones.classList.add("d-none");
    }
}

// Localizar la card de historial
const cardHistorial = document.getElementById("cardHistorial");
if (cardHistorial) {
    if (esSupervisor) {
        cardHistorial.classList.remove("d-none");
    } else {
        cardHistorial.classList.add("d-none");
    }
}