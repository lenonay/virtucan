// ELEMENTOS
const $motivo = document.querySelector("#inp_motivo");
const $queja = document.querySelector("#inp_queja");
const $asignatura = document.querySelector("#inp_asignatura");

const formulario = document.querySelector(".formulario");

// EVENTOS
formulario.addEventListener("submit", e =>{
    e.preventDefault();
});

$motivo.addEventListener("change", HideExtraOptions);
$queja.addEventListener("change", HideAsignments);

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