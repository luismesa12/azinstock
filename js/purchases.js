
/* Agregar Item */

let iclon = 0;
function agregarItem() {
    ++iclon;
    let item = document.querySelector('.item');
    let clon = item.cloneNode(true);

    let clonIdproducto = clon.querySelectorAll("input")[0];
    clonIdproducto.value = "";
    clonIdproducto.id = "idproducto" + iclon;

    let clonProducto = clon.querySelectorAll("input")[1];
    clonProducto.value = "";
    clonProducto.id = "producto" + iclon;
    let clonstock = clon.querySelectorAll("input")[2];
    clonstock.value = "";
    clonstock.id = "stock" + iclon;
    let clonCantidad = clon.querySelectorAll("input")[3];
    clonCantidad.value = "";
    clonCantidad.id = "cantidad" + iclon;
    item.parentNode.appendChild(clon);
    /* Cursor queda en el último item */
    let arrayItem = document.querySelectorAll('.item');
    let ultimoItem = arrayItem.length - 1;
    arrayItem[ultimoItem].querySelector("input").focus({ preventScroll: false });
    /*  */
    actualizarBotonesEliminar();
    actualizarInputIdProductos();
}

function tecla(e) {
    if (e.key == "Enter" || e.keyCode == 13) {
        e.preventDefault();
        agregarItem();
    }
    else if (e.key === 'A' && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        addStock();
    }
}

function borrarItem(event) {
    event.preventDefault();
    event.target.parentElement.parentElement.remove();
}

function actualizarBotonesEliminar() {
    let botonesEliminar = document.querySelectorAll(".eliminarItem");
    botonesEliminar.forEach(element => {
        element.addEventListener("click", borrarItem);
    });
}
let botonAgregarItem = document.querySelector("#agregarItem");
botonAgregarItem.addEventListener("click", agregarItem);

let items = document.querySelector("#items");
items.addEventListener("keydown", tecla);

/* Rellenar Campos Segun Id Producto */
let dbStock;
function actualizarInputIdProductos() {
    let inputIdProducto = document.querySelectorAll(".idproducto");
    inputIdProducto.forEach(element => {
        element.addEventListener("keyup", llenarInputItemPorId);
    });
}


function llenarInputItemPorId(event) {
    event.preventDefault();
    const idp = event.target.id;
    let valueInputId = document.querySelector(`#${idp}`).value;
    let idNombreProducto = "#producto" + idp.slice(10);
    let idstock = "#stock" + idp.slice(10);
    let idCantidad = "#cantidad" + idp.slice(10);

    document.querySelector(idNombreProducto).value = productoPorId(valueInputId).nombre;
    document.querySelector(idstock).value = productoPorId(valueInputId).stock;
}
function productoPorId(nid) {
    let producto;
    dbStock = JSON.parse(localStorage.getItem("DBstock"));
    dbStock.forEach(i => {
        if (i["id"] == nid) {
            producto = i
        }
    });
    if (!producto) {
        const mensaje = { "stock": 0, "nombre": "Id No Corresponde" };
        return mensaje
    }
    else {
        return producto
    }
}

actualizarInputIdProductos();

/* Añadir al Inventario */

function Purchase(id, product, lot) {
    this.id = Number(id);
    this.product = product;
    this.lot = Number(lot);
}

function addStock() {
    const purchases = [];
    const items = document.querySelectorAll('.item');
    items.forEach(element => {
        let purchase = new Purchase(
            element.querySelectorAll("input")[0].value,
            element.querySelectorAll("input")[1].value,
            element.querySelectorAll("input")[3].value
        );
        purchases.push(purchase);
    });
    dbStock = JSON.parse(localStorage.getItem("DBstock"));
    dbStock.map(updateStock);
    localStorage.setItem("DBstock", JSON.stringify(dbStock));

    function updateStock(item) {
        purchases.map((purchase) => {
            if (item.id === purchase.id) {
                item.stock += purchase.lot;
            };
        });
    };
};

const btnAddStock = document.querySelector("#addStock");
btnAddStock.addEventListener("click", addStock);


/*Eliminar Item */
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

