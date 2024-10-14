// ELEMENTOS
const $motivo = document.querySelector("#inp_motivo");
const $queja = document.querySelector("#inp_queja");
const $asignatura = document.querySelector("#inp_asignatura");
const $body = document.querySelector("#inp_cuerpo");
const $email = document.querySelector("#inp_email");

const input = document.querySelector("#inp_btn");
const formulario = document.querySelector(".formulario");

const dominio = document.location;


// EVENTOS
formulario.addEventListener("submit", SendDataToServer);
$motivo.addEventListener("change", HideExtraOptions);
$queja.addEventListener("change", HideAsignments);
input.addEventListener("click", SendDataToServer);

// FUNCIONES
function HideExtraOptions(event){
    if ($motivo.value === "otro"){
        $queja.style.display = "none";
        $asignatura.style.display = "none";
    }else{
        if($queja.value === "asignatura"){
            $asignatura.style.display = "block";
        }
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

    const response = await fetch(`${dominio}queja/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: $email.value,
            motivo: $motivo.value,
            queja: $queja.value,
            asignatura: $asignatura.value,
            cuerpo: $body.value
        })
    }).then( response => {
        if (response.ok){
            return response.json();
        }else {
            return { status: "error", error: "Cannot connect to the server" };
        }
    });

    console.log(response);

}