let totalCompra = 0;
/* Lista de Productos Aplicando AJAX*/
let bdproductos;
if (!localStorage.getItem("DBstock")) {
    $.ajax({
        url: 'js/bdProductos.json',
        dataType: 'json',
        success: function (data) {
            bdproductos = data;
            localStorage.setItem("DBstock", JSON.stringify(data));
        }
    });
}

actualizarInputIdProductos();
function productoPorId(nid) {
    let producto;
    bdproductos = JSON.parse(localStorage.getItem("DBstock"));
    bdproductos.forEach(i => {
        if (i["id"] == nid) {
            producto = i
        }
    });
    if (!producto) {
        const mensaje = { "precio": 0, "nombre": "Id No Corresponde" };
        return mensaje
    }
    else {
        return producto
    }
}

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
    let idPrecio = "#precio" + idp.slice(10);
    let idCantidad = "#cantidad" + idp.slice(10);

    document.querySelector(idNombreProducto).value = productoPorId(valueInputId).nombre;
    document.querySelector(idPrecio).value = productoPorId(valueInputId).precio;
    document.querySelector(idCantidad).value = productoPorId(valueInputId).precio != 0 ? 1 : 0;
}

/* Fin Lista de Productos Aplicando AJAX*/


function Cliente(nombre, id, tel, ciudad) {
    this.nombre = nombre;
    this.id = id;
    this.tel = tel;
    this.ciudad = ciudad;
}

function Compra(id, producto, precio, cantidad) {
    this.id =Number(id);
    this.producto = producto;
    this.precio = precio;
    this.cantidad = Number(cantidad);

    this.total = function () {
        return this.precio * this.cantidad
    }
}
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
    let clonPrecio = clon.querySelectorAll("input")[2];
    clonPrecio.value = "";
    clonPrecio.id = "precio" + iclon;
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

/* Facturar */
let stockOk;
function facturar() {
    let compras = [];
    let items = document.querySelectorAll('.item');
    items.forEach(element => {
        let compra = new Compra(
            element.querySelectorAll("input")[0].value,
            element.querySelectorAll("input")[1].value,
            element.querySelectorAll("input")[2].value,
            element.querySelectorAll("input")[3].value
        );
        compras.push(compra);
    });
    const cliente = new Cliente(
        document.querySelector('#nombre').value,
        document.querySelector('#id').value,
        document.querySelector('#tel').value,
        document.querySelector('#ciudad').value
    );
    stockOk=true;
    checkStock(compras);
    if (stockOk) {
        let itemsCompra = "";
        totalCompra = 0;    
        compras.forEach(element => {
            itemsCompra += `${element.producto}  /  $${element.precio}  /  ${element.cantidad}  /  $${element.total()}<br>`
            totalCompra += element.total()
        });
    
        const part1 = document.createElement('p');
        part1.textContent = `Cliente: ${cliente.nombre}`;
    
        const part2 = document.createElement('p');
        part2.textContent = `Id: ${cliente.id}`;
    
        const part3 = document.createElement('p');
        part3.textContent = `Télefono: ${cliente.tel}`;
    
        const part4 = document.createElement('p');
        part4.textContent = `Ciudad: ${cliente.ciudad}`;
    
        const part5 = document.createElement('p');
        part5.innerHTML = `---------------------------------------<br>
        Producto / Precio / Cantidad / Total`;
    
        const part6 = document.createElement('div');
        part6.innerHTML = `${itemsCompra}<br>`;
    
        const part7 = document.createElement('p');
        part7.textContent = `Total a Pagar: $${totalCompra}`;
    
        const part8 = document.createElement('p');
        part8.innerHTML = `---------------------------------------<br>
        ¡¡¡Gracias Por Su Compra!!!<br>
        ---------------------------------------`;
        const part9 = document.createElement("div");
        part9.innerHTML = `<button type="button" id="verCredito" class="btn btn-primary" data-toggle="modal" data-target="#modalCredito">
        Ver Crédito</button>`
    
        const divPrueba = document.querySelector('#primerDiv');
    
        divPrueba.innerHTML = '';
        divPrueba.appendChild(part1);
        divPrueba.appendChild(part2);
        divPrueba.appendChild(part3);
        divPrueba.appendChild(part4);
        divPrueba.appendChild(part5);
        divPrueba.appendChild(part6);
        divPrueba.appendChild(part7);
        divPrueba.appendChild(part8);
        divPrueba.appendChild(part9);
        updateStock(compras);
    };    
};


function tecla(e) {
    if (e.key == "Enter" || e.keyCode == 13) {
        e.preventDefault();
        agregarItem();
    }
    else if (e.key === 'F' && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        facturar();
    }
}


let botonAgregarItem = document.querySelector("#agregarItem");
botonAgregarItem.addEventListener("click", agregarItem);

let botonFacturar = document.querySelector("#facturar");
botonFacturar.addEventListener("click", facturar);

let items = document.querySelector("#items");
items.addEventListener("keydown", tecla);

function actualizarBotonesEliminar() {
    let botonesEliminar = document.querySelectorAll(".eliminarItem");
    botonesEliminar.forEach(element => {
        element.addEventListener("click", borrarItem);
    });
}

function borrarItem(event) {
    event.preventDefault();
    event.target.parentElement.parentElement.remove();
}

function calcularMensualidad(event) {
    let vp = totalCompra;
    let cuotas = event.target.value;
    let tasa = 0.0199;
    let mensualidad = (vp * tasa) / (1 - Math.pow(1 + tasa, -cuotas));
    if (!isNaN(event.target.value)) {
        const divCuotas = document.createElement("div");
        divCuotas.innerHTML = `
        <p><strong>Total a Financiar: </strong>$${totalCompra}</p>
        <p><strong>Tasa de Interés Mensual: </strong>${(tasa * 100).toFixed(2)}%</p>
        <p><strong>Cantidad de Cuotas: </strong>${cuotas}</p>
        <p>Mensualidad: <strong>$<i>${mensualidad.toFixed(2)}</i></strong></p>
        `;
        const infoCredito = document.querySelector("#infoCredito");
        infoCredito.innerHTML = "";
        infoCredito.appendChild(divCuotas);
    }
}

let selectCuotas = document.querySelector("#selectCuotas")
selectCuotas.addEventListener("change", calcularMensualidad)

/* Formulario Contacto */
/* Se aplica Jquery */

const formContacto = $("#formContacto div :input");
const btnsubmitContacto = $("#submitContacto");
const btnlimpiarContacto = $("#limpiarContacto");

formContacto.on("blur", validarFormulario);
formContacto.on("keyup", validarSubmit);
btnsubmitContacto.on("click", enviarMensaje);
btnlimpiarContacto.on("click", (e) => e.preventDefault());
btnlimpiarContacto.on("click", resetForm);

function validarFormulario(e) {
    if (e.target.value === "") {
        errorInputForm();
    }
}

function errorInputForm() {
    if ($(".infoInput").length === 0) {
        $(`<div class="infoInput text-center alert alert-warning" role="alert">
        <strong>Todos Los Campos Deben Ser Rellenados</strong></div>`).insertBefore(btnsubmitContacto);
    }
}

function validarSubmit() {
    if (formContacto[0].value !== "" && formContacto[1].value !== "" && formContacto[2].value !== "" && formContacto[3].value !== "") {
        if ($(".infoInput").length != 0) {
            $(".infoInput").remove();
        }
        btnsubmitContacto.removeAttr("disabled");
    }
}

function enviarMensaje(e) {
    e.preventDefault();
    $(`<div class="infoInput text-center alert alert-success" role="alert">
    <strong>¡Mensaje Enviado!</strong></div>`).insertBefore(btnsubmitContacto);
    setTimeout(() => {
        resetForm();
    }, 3000);
}

function resetForm() {
    if ($(".infoInput").length != 0) {
        $(".infoInput").remove();
    }
    $("#formContacto")[0].reset();
    btnsubmitContacto.attr("disabled", "disabled");
}
/* Fin Formulario Contacto */

/* Verificar Inventario */
function checkStock(itemsOut) {
    bdproductos = JSON.parse(localStorage.getItem("DBstock"));
    itemsOut.map(item=>{
        bdproductos.map((product)=>{
            if (product.id===item.id) {
                if(item.cantidad>product.stock){
                    alert(`No Hay suficiente Stock del Producto Id: ${product.id} - ${product.nombre}
Stock Máximo Dispinible = ${product.stock} Unidades`);
                    stockOk=false;
                };
            };
        });
    });
    
};
/* Fin Verificar Inventario */
/* Actualizar Inventario */
function updateStock(itemsOut) {
    bdproductos = JSON.parse(localStorage.getItem("DBstock"));
    bdproductos.map(decreaseStock);
    localStorage.setItem("DBstock", JSON.stringify(bdproductos));
    function decreaseStock(item) {
        itemsOut.map((itemOut)=>{
            if (item.id===itemOut.id) {
                console.log(item.stock," ",itemOut.cantidad);
                item.stock -= itemOut.cantidad
            };
        });        
    };
};  

/* Fin Actualizar Inventario */
