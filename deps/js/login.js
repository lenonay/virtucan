//////////////// ELEMENTOS
// Formulario
const $user = document.querySelector("#inp_user");
const $passwd = document.querySelector("#inp_passwd");

// Elementos
const formulario = document.querySelector(".formulario");
const send_btn = document.querySelector(".send_btn");

// Dominio
const domain = document.location;

/////////////// EVENTOS
send_btn.addEventListener("click", Login);

////////////// FUNCIONES
function ValidarContenidos() {
    if (!$user.value) {
        return { status: "error", error: "El usuario es requerido" }
    }

    if (!$passwd.value) {
        return { status: "error", error: "La contraseña es requerida" }
    }

    return { status: "OK" }
}
async function Login() {
    // Validamos ambas entradas
    const Validaciones = ValidarContenidos();
    // Si hay alguna error lo mostramos y salimos
    if (Validaciones.status !== "OK") {
        console.log(Validaciones.error);
        return
    }

    const response = await fetch(domain, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: $user.value,
            passwd: $passwd.value
        })
    });

    const result = (response.ok) ? await response.json() : null;

    console.log(result);
}