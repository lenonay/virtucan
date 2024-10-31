// ELEMENTOS
const $motivo = document.querySelector("#inp_motivo");
const $queja = document.querySelector("#inp_queja");
const $asignatura = document.querySelector("#inp_asignatura");
const $body = document.querySelector("#inp_cuerpo");
const $email = document.querySelector("#inp_email");
const $titulo = document.querySelector("#inp_titulo");
const $files = document.querySelector("#inp_file");

const input = document.querySelector("#inp_btn");
const upload_btn = document.querySelector(".add_file");
const formulario = document.querySelector(".formulario");
const area = document.querySelector(".drop-area");

const dominio = document.location;

const user = localStorage.getItem("user") ?? GenerateUser();

// EVENTOS
// Enviar información al servidor
formulario.addEventListener("submit", SendDataToServer);
input.addEventListener("click", SendDataToServer);

// Ocultar y mostrar opciones
$motivo.addEventListener("change", HideExtraOptions);
$queja.addEventListener("change", HideAsignments);

// Subir archivos
upload_btn.addEventListener("click", () => { $files.click(); });
$files.addEventListener("change", ProccessFiles)

// FUNCIONES
function HideExtraOptions(event) {
    // Ocultamos las opciones que no sean necesarias
    if ($motivo.value === "otro") {
        $queja.style.display = "none";
        $asignatura.style.display = "none";
    } else {
        //  mostramos la asigntaura 
        if ($queja.value === "asignatura") {
            $asignatura.style.display = "block";
        }
        // mostramos la queja
        $queja.style.display = "block";
    }
}

function HideAsignments(event) {
    if ($queja.value === "asignatura") {
        $asignatura.style.display = "block";
    } else {
        $asignatura.style.display = "none";
    }
}

function GenerateUser() {
    let resultado = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const chars_length = chars.length;

    for (let i = 0; i <= 8; i++) {
        resultado += chars.charAt(Math.floor(Math.random() * chars_length));
    }

    resultado = "user-" + resultado;

    localStorage.setItem("user", resultado);

    return resultado;
}

function ProccessFiles(event) {
    const files = $files.files;

    if (!files) {
        return;
    }

    for (const file of files) {
        UploadFile(file);
    }
}

async function UploadFile(file) {
    const { name, size } = file;

    const reader = new FileReader();

    reader.addEventListener("load", async () => {
        const id = Math.random().toString(16).replace(/0\./, "id-");

        const card = `
            <div class="preview" id="${id}">
                <img src ="${reader.result}">
                <span name>${name}</span>
                <div class="upload_status">
                    <div class="loader"></div>
                <div>
            </div>
        `;

        area.insertAdjacentHTML("beforeend", card);
        const upl_file = document.querySelector(`#${id}`);
        const loader = upl_file.querySelector(".loader");

        // Validamos el peso
        if (size > 2000000) {
            loader.classList.remove("loader");
            loader.classList.add("xmark");

            console.log("Peso máximo 2000000");

            return
        }

        const form = new FormData();

        form.append("file", file);

        const response = await fetch(`${dominio}upload`, {
            method: "POST",
            body: form
        });

        const result = (response.ok) ? await response.json() : undefined;

        // Si el servidor muere por el camino
        if (!result) {
            loader.classList.remove("loader");
            loader.classList.add("xmark");

            return
        }

        if (result.error) {
            loader.classList.remove("loader");
            loader.classList.add("xmark");

            console.log(result.error);

            return
        }

        // Añadimos el nombre del fichero como atributo

        upl_file.setAttribute("filename", result.filename);

        loader.classList.remove("loader");
        loader.classList.add("check");
    })

    if (file) {
        reader.readAsDataURL(file)
    }


}

async function SendDataToServer(event) {
    input.removeEventListener("click", SendDataToServer);
    formulario.removeEventListener("click", SendDataToServer);

    // Construimos el JSON del cuerpo
    let data = {
        user: user,
        email: $email.value,
        motivo: $motivo.value,
        queja: $queja.value,
        asignatura: $asignatura.value,
        titulo: $titulo.value,
        cuerpo: $body.value
    }

    // Añadimos o quitamos cosas en función de las opción elegidas
    switch (true) {
        case $motivo.value === "otro":
            delete data.queja;
            delete data.asignatura;
            break;
        case $queja.value === "general":
            delete data.asignatura;
            break;
    }

    const files = GetAttachedFiles();
    if (files) {
        data.files = files;
    }

    // Hacemos la petición al endpoint
    const response = await fetch(`${dominio}queja/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user": user
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return { status: "error", error: "Cannot connect to the server" };
        }
    });

    // Mostramos la respuesta
    // Temporal
    console.log(response);

    // Volvemos a activar el evento
    formulario.addEventListener("submit", SendDataToServer);
    input.addEventListener("click", SendDataToServer);
}

function GetAttachedFiles() {
    // Obtenemos los ficheros adjuntos
    const attached = area.querySelectorAll(".preview");

    // Si no hay retornar null
    if (!attached) {
        return null
    }

    let files_names = [];

    for (const file of attached) {
        if (file.querySelector(".check")) {
            files_names.push(file.getAttribute("filename"));
        }
    }

    return files_names;
}