const API_URL = "https://69c692f1f272266f3eaccdd0.mockapi.io/envios";

// Referencias al DOM
const searchInput = document.getElementById("searchInput");
const stateSelect = document.getElementById("stateSelect");
const resultsTable = document.getElementById("resultsTable");
const tbody = resultsTable.querySelector("tbody");
const emptyTable = document.getElementById("emptyTable");
const noResultsTable = document.getElementById("noResultsTable");
const btnBuscar = document.querySelector("form button[type='submit']");
const btnLimpiar = document.querySelector("form button[type='reset']");

// Función principal de búsqueda
async function buscar() {
    const query = searchInput.value.trim().toLowerCase();
    const estadoFiltro = stateSelect.value;

    // Estado visual de carga
    btnBuscar.disabled = true;
    btnBuscar.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Buscando...`;

    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted"><span class="spinner-border spinner-border-sm me-2"></span> Obteniendo datos...</td></tr>`;
    emptyTable.classList.add("d-none");
    resultsTable.classList.remove("d-none");
    noResultsTable.classList.add("d-none");

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener los envíos");
        const envios = await res.json();

        // Filtrado lógico: Busca coincidencias en el ID, nombre del cliente o nombre del grano
        const filtrados = envios.filter(e => {
            const coincideQuery =
                (e.id && e.id.toLowerCase().includes(query)) ||
                (e.clienteNombre && e.clienteNombre.toLowerCase().includes(query)) ||
                (e.granoNombre && e.granoNombre.toLowerCase().includes(query));

            const coincideEstado = estadoFiltro === "Cualquier Estado" || e.estado === estadoFiltro;

            return coincideQuery && coincideEstado;
        });

        // Manejo de sin resultados
        if (filtrados.length === 0) {
            resultsTable.classList.add("d-none");
            noResultsTable.classList.remove("d-none");
            return;
        }

        // Dibujar filas con la nueva estructura (Cliente, Carga/Grano, etc.)
        tbody.innerHTML = filtrados.map(e => `
            <tr>
                <td class="ps-4 fw-bold text-success">#${e.id}</td>
                <td>
                    <span class="d-block fw-medium text-dark">${e.clienteNombre || "Sin nombre"}</span>
                    ${e.clienteEstrategico ? '<span class="badge bg-warning bg-opacity-25 text-dark border border-warning border-opacity-50" style="font-size: 0.6rem;">ESTRATÉGICO</span>' : ''}
                </td>
                <td>
                    <span class="d-block fw-medium text-dark">${e.granoNombre || "Carga General"}</span>
                    <small class="text-muted">${e.peso || 0} Tn</small>
                </td>
                <td>
                    <span class="badge ${getEstadoClass(e.estado)} rounded-pill px-3">
                        ${e.estado}
                    </span>
                </td>
                <td class="text-end pe-4">
                    <a href="./detalleEnvio.html?id=${e.id}" class="btn btn-sm btn-outline-success shadow-sm rounded-3 fw-medium">
                        <i class="bi bi-eye-fill me-1"></i> Ficha
                    </a>
                </td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Error en la búsqueda:", error);
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4"><i class="bi bi-exclamation-triangle-fill me-2"></i> Error al conectar con el servidor.</td></tr>`;
    } finally {
        // Restaurar botón
        btnBuscar.disabled = false;
        btnBuscar.innerHTML = "Buscar";
    }
}

// Función auxiliar para colorear los badges de estados logísticos
function getEstadoClass(estado) {
    switch (estado) {
        case 'Pendiente': return 'bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle';
        case 'En tránsito': return 'bg-primary bg-opacity-10 text-primary border border-primary-subtle';
        case 'En sucursal': return 'bg-warning bg-opacity-10 text-warning-emphasis border border-warning-subtle';
        case 'Entregado': return 'bg-success bg-opacity-10 text-success border border-success-subtle';
        default: return 'bg-light text-dark border';
    }
}

// Evento: Enviar el formulario (Enter o Click en buscar)
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    buscar();
});

// Evento: Botón limpiar restaura la vista al estado inicial
if (btnLimpiar) {
    btnLimpiar.addEventListener("click", function () {
        emptyTable.classList.remove("d-none");
        resultsTable.classList.add("d-none");
        noResultsTable.classList.add("d-none");
    });
}