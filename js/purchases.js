
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

/* Añadir Nuevo Item a Inventario */
validateNewItem();
function validateNewItem() {
    const id = document.querySelector("#idNewProducto");
    const name = document.querySelector("#newProducto");
    const price = document.querySelector("#newPrecio");
    const stock = document.querySelector("#newStock");
    id.oninput = function () {
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4);
        };
    };
    let validate = false;
    if (id.value && name.value && price.value && stock.value) {
        validate = true;
        return { validate: validate, id: id.value, name: name.value, price: price.value, stock: stock.value }
    }
    else {
        return { validate: validate }
    };
};

function NewItem(id, nombre, precio, stock) {
    this.id = Number(id);
    this.nombre = nombre;
    this.precio = Number(precio);
    this.stock = Number(stock);
}
function addToStock() {
    const { validate, id, name, price, stock } = validateNewItem();

    if (validate) {
        let idNotRepeated = true;
        dbStock = JSON.parse(localStorage.getItem("DBstock"));
        dbStock.forEach(i => {
            if (i.id === Number(id)) {
                alert(`El Item con Id: ${id} Ya Existe, No Se Permite Duplicar Id En Nuevos Items`);
                idNotRepeated = false;
            }
        });
        if (idNotRepeated) {
            const newItem = new NewItem(id, name, price, stock);
            dbStock.push({...newItem})
            localStorage.setItem("DBstock", JSON.stringify(dbStock));
            alert("se agrego el nuevo Item")
        }
    }
    else{
        alert("todos los campos deben ser rellenados")
    }
}

const btnAddToStock = document.querySelector("#addToStock");
btnAddToStock.addEventListener("click", addToStock);
/*Fin Añadir Nuevo Item a Inventario */
