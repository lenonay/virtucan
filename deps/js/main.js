// ELEMENTOS
// Campos del formulario
const $motivo = document.querySelector("#inp_motivo");
const $queja = document.querySelector("#inp_queja");
const $asignatura = document.querySelector("#inp_asignatura");
const $body = document.querySelector("#inp_cuerpo");
const $email = document.querySelector("#inp_email");
const $titulo = document.querySelector("#inp_titulo");
const $files = document.querySelector("#inp_file");

// HTML Elements
const input = document.querySelector("#inp_btn");
const upload_btn = document.querySelector(".add_file");
const formulario = document.querySelector(".formulario");
const area = document.querySelector(".drop-area");

// Dominio actual
const dominio = document.location;

// Obtenemos el usario del localstorage o lo generamos
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
    // Si la queja es referente a una asginatura la mostramos
    if ($queja.value === "asignatura") {
        $asignatura.style.display = "block";
        // Sino ocultamos las asginaturas
    } else {
        $asignatura.style.display = "none";
    }
}

function GenerateUser() {
    let resultado = "";
    // String con los posibles caracteres
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const chars_length = chars.length;

    // Obtenemos una serie de 8 caracteres random 
    for (let i = 0; i <= 8; i++) {
        resultado += chars.charAt(Math.floor(Math.random() * chars_length));
    }

    // Añadimos user- más los caracteres random
    resultado = "user-" + resultado;

    // Lo guardamos en el localstorage
    localStorage.setItem("user", resultado);

    // devolvemos el usuario 
    return resultado;
}

function ProccessFiles(event) {
    // Obtenemos todos los ficheros
    const files = $files.files;

    // Si no hay salimos
    if (!files) {
        return;
    }

    // Si hay los interamos para subirlos individualemente.
    for (const file of files) {
        UploadFile(file);
    }
}

async function UploadFile(file) {
    // Sacamos el nombre y el peso del archivo
    const { name, size, type } = file;

    // Instanciamos un Filereader
    const reader = new FileReader();

    // Capturamos el evento de finalizar la lectura
    reader.addEventListener("load", async () => {
        // Creamos un id random
        const id = Math.random().toString(16).replace(/0\./, "id-");

        // Creamos la vista previa del elemento con un loader
        let visual = Gen_SVG(35);

        if(type.includes("image")){
            visual = `<img src ="${reader.result}"></img>`;
        }

        const card = `
            <div class="preview" id="${id}">
                ${visual}
                <span name>${name}</span>
                <div class="upload_status">
                    <div class="loader"></div>
                </div>
            </div>
        `;

        // Insertamos el elemento en el area de subidos
        area.insertAdjacentHTML("beforeend", card);
        // Recuperamos el elemento subido y el loader
        const upl_file = document.querySelector(`#${id}`);
        const loader = upl_file.querySelector(".loader");

        // Validamos el peso
        if (size > 2000000) {
            // Si el peso supera 2MB ponemos error en el loader y salimos
            loader.classList.remove("loader");
            loader.classList.add("xmark");

            ShowErrors({ tag: id, error: "Peso máximo superado: 2MB" });

            return
        }

        // Instanciamos un formulario
        const form = new FormData();

        // Le añadimos el fichero
        form.append("file", file);

        // Hacemos la peticion al servidor
        const response = await fetch(`${dominio}upload`, {
            method: "POST",
            body: form
        });

        // Esperamos la respuesta
        const result = (response.ok) ? await response.json() : undefined;

        // Si el servidor muere por el camino mostramos error
        if (!result) {
            loader.classList.remove("loader");
            loader.classList.add("xmark");

            return
        }

        // Si tenemos un error lo mostramos
        if (result.error) {
            loader.classList.remove("loader");
            loader.classList.add("xmark");

            ShowErrors(result);

            return
        }


        // Añadimos el nombre del fichero que usó el servidor para guardarlo como atributo
        upl_file.setAttribute("filename", result.filename);

        // Cambiamos el loader a un chech verde
        loader.classList.remove("loader");
        loader.classList.add("check");
    });

    // Leemos el fichero si hay
    if (file) {
        reader.readAsDataURL(file)
    }
}

async function SendDataToServer(event) {
    // Quitamos los eventos temporalmente para que no se puedan mandar varios emails a la vez
    input.removeEventListener("click", SendDataToServer);
    formulario.removeEventListener("click", SendDataToServer);

    // Construimos el JSON del cuerpo con los elementos del formulario
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

    // Obtenemos los ficheros adjuntos
    const files = GetAttachedFiles();
    // Si los hay añadimos un array con el nombre de cada uno
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

    // Volvemos a activar el evento
    formulario.addEventListener("submit", SendDataToServer);
    input.addEventListener("click", SendDataToServer);

    if (response.status === "error") {
        ShowErrors(response);

        return
    }

    // Mostramos la respuesta
    // Temporal
    console.log(response);
}

function GetAttachedFiles() {
    // Obtenemos los ficheros adjuntos
    const attached = area.querySelectorAll(".preview");

    // Si no hay retornar null
    if (!attached) {
        return null
    }

    // Inicializamos un array
    let files_names = [];

    // Iteramos por cada archivo
    for (const file of attached) {
        // Si tiene un check añadimos el nombre al array
        if (file.querySelector(".check")) {
            files_names.push(file.getAttribute("filename"));
        }
    }

    // Devolvemos el array de nombres
    return files_names;
}

function ShowErrors(error_object) {
    const { tag, error } = error_object;

    // Borramos el error si ya hay uno
    if (document.querySelector(".error")) {
        document.querySelector(".error").remove();
    }

    const html = `<p class="error"><span>[!]</span> ${error}</p>`;

    formulario.insertAdjacentHTML("afterbegin", html);

    if (tag) {
        // Obtenemos el elemento html
        const element = document.querySelector(tag);
        // si no hay salimos
        if (!element) {
            return
        }

        // Le cambiamos el borde a rojo y le hacemos focus
        element.classList.add("wrong_value");
        element.focus();

        // Evento para que cuando se cambie el valor se quite el borde rojo
        element.addEventListener("input", () => {
            element.classList.remove("wrong_value");
        }, { once: true });
    }
}

function Gen_SVG(size) {
    return `
        <svg width="${size}px" height="${size}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6 1C4.34314 1 3 2.34315 3 4V20C3 21.6569 4.34315 23 6 23H19C20.6569 23 22 21.6569 22 20V10C22 9.73478 21.8946 9.48043 21.7071 9.29289L13.7071 1.29292C13.6114 
                    1.19722 13.4983 1.1229 13.3753 1.07308C13.2572 1.02527 13.1299 1 13 1H6ZM12 3H6C5.44771 3 5 3.44771 5 4V20C5 20.5523 5.44772 21 6 21H19C19.5523 21 20 20.5523 
                    20 20V11H13C12.4477 11 12 10.5523 12 10V3ZM18.5858 9.00003L14 4.41424V9.00003H18.5858Z"
                    fill="#35bcbf"></path>
            </g>
        </svg>
    `;
}