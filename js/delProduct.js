/*Eliminar Item */
let dbStock;
const idDelProducto = document.querySelector("#idDelProducto");
const delProducto = document.querySelector("#delProducto");
const btndelStock = document.querySelector('#delStock');
idDelProducto.addEventListener("keyup", productById);
btndelStock.addEventListener("click", deleteItem)
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
function deleteItem() {
        if (index) {
            dbStock = JSON.parse(localStorage.getItem("DBstock"));
            dbStock.splice(index,1);
            localStorage.setItem("DBstock", JSON.stringify(dbStock));
            index = undefined;
            alert("Se eliminó El Item")
        }
        else{
            alert("Id No Existe En Stock")
        }
}
/*Fin Eliminar Item */
