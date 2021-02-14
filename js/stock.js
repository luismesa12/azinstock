/* DataTable Inventario */
const dbStock = JSON.parse(localStorage.getItem("DBstock"));
dbStock.map(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nombre}</td>
        <td>$${item.precio}</td>
        <td>${item.stock}</td>    
    `;
    const tbody = document.querySelector("#example tbody");
    tbody.appendChild(tr);
});

$(document).ready(function () {
    $('#example').DataTable(
        {
            language: {
                "url": "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
            }
        }
    );
});
/* Fin DataTable Inventario */