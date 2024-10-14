// ELEMENTOS
const $motivo = document.querySelector("#inp_motivo");
const $queja = document.querySelector("#inp_queja");
const $asignatura = document.querySelector("#inp_asignatura");
const $body = document.querySelector("#inp_cuerpo");
const $email = document.querySelector("#inp_email");
const $titulo = document.querySelector("#inp_titulo");

const input = document.querySelector("#inp_btn");
const formulario = document.querySelector(".formulario");

const dominio = document.location;


// EVENTOS
// Enviar información al servidor
formulario.addEventListener("submit", SendDataToServer);
input.addEventListener("click", SendDataToServer);

// Ocultar y mostrar opciones
$motivo.addEventListener("change", HideExtraOptions);
$queja.addEventListener("change", HideAsignments);

// FUNCIONES
function HideExtraOptions(event){
    // Ocultamos las opciones que no sean necesarias
    if ($motivo.value === "otro"){
        $queja.style.display = "none";
        $asignatura.style.display = "none";
    }else{
        //  mostramos la asigntaura 
        if($queja.value === "asignatura"){
            $asignatura.style.display = "block";
        }
        // mostramos la queja
        $queja.style.display = "block";
    }
}

function HideAsignments(event){
    if($queja.value === "asignatura"){
        $asignatura.style.display = "block";
    }else{
        $asignatura.style.display = "none";
    }
}

async function SendDataToServer(event){
    event.preventDefault();

    // Construimos el JSON del cuerpo
    let data = {
        email: $email.value,
        motivo: $motivo.value,
        queja: $queja.value,
        asignatura: $asignatura.value,
        titulo: $titulo.value,
        cuerpo: $body.value
    }

    // Añadimos o quitamos cosas en función de las opción elegidas
    switch(true){
        case $motivo.value === "otro":
            delete data.queja;
            delete data.asignatura;
        break;
        case $queja.value === "general":
            delete data.asignatura;
        break;
    }

    // Hacemos la petición al endpoint
    const response = await fetch(`${dominio}queja/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then( response => {
        if (response.ok){
            return response.json();
        }else {
            return { status: "error", error: "Cannot connect to the server" };
        }
    });

    // Mostramos la respuesta
    // Temporal
    console.log(response);

}