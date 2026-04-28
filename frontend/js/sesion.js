const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

// Mostrar nombre y rol
if (!usuario) {
    window.location.href = "./index.html";
} else {
    // Carga el nombre del usuario
    document.getElementById("nombreUsuario").textContent = usuario.nombre;
    
    // Carga el rol del usuario si el elemento existe en la página
    const elRol = document.getElementById("rolUsuario");
    if (elRol) {
        elRol.textContent = usuario.rol;
    }
}

//cierre de sesion
document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogueado");
    window.location.href = "./index.html";
});

//habilitar selects de estado y prioridad segun rol
document.querySelectorAll(".edicion").forEach(e => {
    
    if (usuario.rol != "supervisor") {
        
        e.disabled = true;
    }
});

//Ocultar botones de edicion
const divBotones = document.getElementById("botonesEdicion")
if (divBotones) {
    if (usuario.rol === "supervisor") {
        divBotones.classList.remove("d-none");
    } else {
        divBotones.classList.add("d-none");
    }
}


// Localizar la card de historial
const cardHistorial = document.getElementById("cardHistorial");

if (cardHistorial) {
    // Si el usuario es supervisor, se muestra; de lo contrario, se elimina del diseño
    if (usuario.rol === "supervisor") {
        cardHistorial.classList.remove("d-none");
    } else {
        cardHistorial.classList.add("d-none");
    }
}