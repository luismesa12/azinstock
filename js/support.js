/* Formulario Soporte */
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
/* Fin Formulario Soporte */