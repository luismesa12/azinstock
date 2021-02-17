/*Eliminar Item */
let dbStock;
const idDelProducto = document.querySelector("#idDelProducto");
const delProducto = document.querySelector("#delProducto");
const delForm = document.querySelector('#delForm');
idDelProducto.addEventListener("keyup", productById);
delForm.addEventListener("submit", deleteItem)
let index;
function productById(e) {
    idDelProducto.oninput = ()=> {
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4);
        };
    };
    let idFound = false;
    index = undefined;
    dbStock = JSON.parse(localStorage.getItem("DBstock"));
    dbStock.forEach(i => {
        if (i.id === Number(e.target.value)) {
            console.log(e.target.value,"borrar");
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
            dbStock.splice(index,1);
            localStorage.setItem("DBstock", JSON.stringify(dbStock));
            index = undefined;
            alert("Se eliminó El Item")
            document.location.reload();
        }
        else{
            alert("Id No Existe En Stock")
        }
        e.preventDefault();
}
/*Fin Eliminar Item */
