/*Eliminar Item */
let dbStock;
const idDelProducto = document.querySelector("#idDelProducto");
const delProducto = document.querySelector("#delProducto");
const delForm = document.querySelector('#delForm');
idDelProducto.addEventListener("keyup", productById);
delForm.addEventListener("submit", deleteItem)
let index;
function productById(e) {
    idDelProducto.oninput = () => {
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4);
        };
    };
    let idFound = false;
    index = undefined;
    dbStock = JSON.parse(localStorage.getItem("DBstock"));
    dbStock.forEach(i => {
        if (i.id === Number(e.target.value)) {
            console.log(e.target.value, "borrar");
            delProducto.value = i.nombre;
            idFound = true;
            index = dbStock.indexOf(i);
        }
    });
    if (!idFound) {
        delProducto.value = "Id No Existe En Stock";
    };
};
function deleteItem(e) {
    if (index) {
        dbStock = JSON.parse(localStorage.getItem("DBstock"));
        dbStock.splice(index, 1);
        localStorage.setItem("DBstock", JSON.stringify(dbStock));
        index = undefined;
        (async () => {
            await Swal.fire({
                icon: 'success',
                title: `!Se eliminó El Item!`,
                text: '',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });

            document.location.reload();
        })();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Algo Salio Mal',
            text: `Id No Existe En Stock`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }
    e.preventDefault();
}
/*Fin Eliminar Item */
