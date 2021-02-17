/* Añadir Nuevo Item a Inventario */
let dbStock;
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
function addToStock(e) {
    const { validate, id, name, price, stock } = validateNewItem();

    if (validate) {
        let idNotRepeated = true;
        dbStock = JSON.parse(localStorage.getItem("DBstock"));
        dbStock.forEach(i => {
            if (i.id === Number(id)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo Salio Mal',
                    text: `El Item con Id: ${id} Ya Existe, No Se Permite Duplicar Id En Nuevos Items`,
                    timer: 4000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                idNotRepeated = false;
            }
        });
        if (idNotRepeated) {
            const newItem = new NewItem(id, name, price, stock);
            dbStock.push({...newItem})
            localStorage.setItem("DBstock", JSON.stringify(dbStock));
            (async () => {
                await Swal.fire({
                    icon: 'success',
                    title: `se agrego el nuevo Item`,
                    text: '',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                
                document.location.reload();
            })();//se autoinvoca
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Algo Salio Mal',
            text: `Todos Los Campos Deben Ser Rellenados`,
            timer: 2600,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }
    e.preventDefault();
};

const AddToStock = document.querySelector("#newPForm");
AddToStock.addEventListener("submit", addToStock);
/*Fin Añadir Nuevo Item a Inventario */