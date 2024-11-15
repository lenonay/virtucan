/////////////////// ELEMENTOS
// Botones 
const btn_home = document.querySelector(".btn_home");
const btn_quejas = document.querySelector(".btn_quejas");
const btn_stats = document.querySelector(".btn_stats");
const btn_users = document.querySelector(".btn_users");
// Bloques de contenido
const $cont1 = document.querySelector(".contenido1");
const $cont2 = document.querySelector(".contenido2");
const $cont3 = document.querySelector(".contenido3");
const $cont4 = document.querySelector(".contenido4");
// Elementos
const viewer = document.querySelector(".viewer");
const upper_msg = document.querySelector(".upper_msg");
// Extras
const domain = document.location;
// Formateadores de fecha
const DateFormatter = new Intl.DateTimeFormat("es-ES", { dateStyle: "short" });
const TimeFormatter = new Intl.DateTimeFormat("es-ES", { timeStyle: "short" });
// SVG
const svgs = {
    trash: '<svg class="trash_icon" width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7628 9H7.63719C7.18864 9 6.82501 9.37295 6.82501 9.833V16.5C6.82501 17.8807 7.91632 19 9.26251 19H14.1375C14.784 19 15.404 18.7366 15.8611 18.2678C16.3182 17.7989 16.575 17.163 16.575 16.5V9.833C16.575 9.37295 16.2114 9 15.7628 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.625 7L13.9191 5.553C13.7541 5.21427 13.4167 5.0002 13.0475 5H10.3526C9.98338 5.0002 9.64596 5.21427 9.48092 5.553L8.77502 7H14.625Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.8247 12.333C10.8247 11.9188 10.4889 11.583 10.0747 11.583C9.66047 11.583 9.32469 11.9188 9.32469 12.333H10.8247ZM9.32469 15.666C9.32469 16.0802 9.66047 16.416 10.0747 16.416C10.4889 16.416 10.8247 16.0802 10.8247 15.666H9.32469ZM14.0753 12.333C14.0753 11.9188 13.7396 11.583 13.3253 11.583C12.9111 11.583 12.5753 11.9188 12.5753 12.333H14.0753ZM12.5753 15.666C12.5753 16.0802 12.9111 16.416 13.3253 16.416C13.7396 16.416 14.0753 16.0802 14.0753 15.666H12.5753ZM14.625 6.25C14.2108 6.25 13.875 6.58579 13.875 7C13.875 7.41421 14.2108 7.75 14.625 7.75V6.25ZM16.575 7.75C16.9892 7.75 17.325 7.41421 17.325 7C17.325 6.58579 16.9892 6.25 16.575 6.25V7.75ZM8.77501 7.75C9.18923 7.75 9.52501 7.41421 9.52501 7C9.52501 6.58579 9.18923 6.25 8.77501 6.25V7.75ZM6.82501 6.25C6.4108 6.25 6.07501 6.58579 6.07501 7C6.07501 7.41421 6.4108 7.75 6.82501 7.75V6.25ZM9.32469 12.333V15.666H10.8247V12.333H9.32469ZM12.5753 12.333V15.666H14.0753V12.333H12.5753ZM14.625 7.75H16.575V6.25H14.625V7.75ZM8.77501 6.25H6.82501V7.75H8.77501V6.25Z" fill="currentColor"></path> </g></svg>',
    block: '<svg class="block_icon" width="60px" height="60px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.45 7.05017L7.54999 16.9502" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>',
    xmark: '<svg class="xmark_icon" width="60px" height="60px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="currentColor"></path> </g></svg>',
    pdf: `<svg version="1.1" id="_x36_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="104px" height="104px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon style="fill:#FFFEFE;" points="475.435,117.825 475.435,512 47.791,512 47.791,0.002 357.613,0.002 412.491,54.881 "></polygon> <rect x="36.565" y="34.295" style="fill:#2F9C91;" width="205.097" height="91.768"></rect> <g> <g> <path style="fill:#FFFEFE;" d="M110.132,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.658-1.658-3.694-3.015-6.031-3.92 c-2.412-0.98-5.126-1.432-8.141-1.432H69.651v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432 c2.337-0.905,4.372-2.261,6.031-3.92c1.659-1.658,2.865-3.543,3.769-5.804c0.829-2.186,1.282-4.523,1.282-6.935 C111.413,68.902,110.961,66.565,110.132,64.379z M97.844,77.118c-1.508,1.432-3.618,2.186-6.181,2.186H81.034V63.323h10.629 c2.563,0,4.674,0.754,6.181,2.261c1.432,1.432,2.186,3.392,2.186,5.804C100.031,73.726,99.277,75.686,97.844,77.118z"></path> <path style="fill:#FFFEFE;" d="M164.558,75.761c-0.075-2.035-0.151-3.844-0.377-5.503c-0.226-1.659-0.603-3.166-1.131-4.598 c-0.528-1.357-1.206-2.714-2.111-3.92c-2.035-2.94-4.523-5.126-7.312-6.483c-2.865-1.357-6.257-2.035-10.252-2.035h-20.956 v58.195h20.956c3.995,0,7.387-0.678,10.252-2.035c2.789-1.357,5.277-3.543,7.312-6.483c0.905-1.206,1.583-2.563,2.111-3.92 c0.528-1.432,0.905-2.94,1.131-4.598c0.226-1.658,0.301-3.468,0.377-5.503c0.075-1.96,0.075-4.146,0.075-6.558 C164.633,79.908,164.633,77.721,164.558,75.761z M153.175,88.2c0,1.734-0.151,3.091-0.302,4.297 c-0.151,1.131-0.377,2.186-0.678,2.94c-0.301,0.829-0.754,1.583-1.281,2.261c-1.885,2.412-4.749,3.543-8.518,3.543h-8.669V63.323 h8.669c3.769,0,6.634,1.206,8.518,3.618c0.528,0.678,0.98,1.357,1.281,2.186s0.528,1.809,0.678,3.015 c0.151,1.131,0.302,2.563,0.302,4.221c0.075,1.659,0.075,3.694,0.075,5.955C153.251,84.581,153.251,86.541,153.175,88.2z"></path> <path style="fill:#FFFEFE;" d="M213.18,63.323V53.222h-38.37v58.195h11.383V87.823h22.992V77.646h-22.992V63.323H213.18z"></path> </g> <g> <path style="fill:#FFFEFE;" d="M110.132,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.658-1.658-3.694-3.015-6.031-3.92 c-2.412-0.98-5.126-1.432-8.141-1.432H69.651v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432 c2.337-0.905,4.372-2.261,6.031-3.92c1.659-1.658,2.865-3.543,3.769-5.804c0.829-2.186,1.282-4.523,1.282-6.935 C111.413,68.902,110.961,66.565,110.132,64.379z M97.844,77.118c-1.508,1.432-3.618,2.186-6.181,2.186H81.034V63.323h10.629 c2.563,0,4.674,0.754,6.181,2.261c1.432,1.432,2.186,3.392,2.186,5.804C100.031,73.726,99.277,75.686,97.844,77.118z"></path> </g> </g> <polygon style="opacity:0.08;fill:#040000;" points="475.435,117.825 475.435,512 47.791,512 47.791,419.581 247.705,219.667 259.54,207.832 266.098,201.273 277.029,190.343 289.995,177.377 412.491,54.881 "></polygon> <polygon style="fill:#BBBBBA;" points="475.435,117.836 357.599,117.836 357.599,0 "></polygon> <g> <path style="fill:#2F9C91;" d="M414.376,370.658c-2.488-4.372-5.88-8.518-10.101-12.287c-3.467-3.166-7.538-6.106-12.137-8.82 c-18.544-10.93-45.003-16.207-80.961-16.207h-3.618c-1.96-1.809-3.995-3.618-6.106-5.503 c-13.644-12.287-24.499-25.63-32.942-40.48c16.584-36.561,24.499-69.126,23.519-96.867c-0.151-4.674-0.829-9.046-2.035-13.117 c-1.809-6.558-4.824-12.363-9.046-17.112c-0.075-0.075-0.075-0.075-0.151-0.151c-6.709-7.538-16.056-11.835-25.555-11.835 c-9.574,0-18.393,4.146-24.801,11.76c-6.332,7.538-9.724,17.866-9.875,30.002c-0.226,18.544,1.281,36.108,4.448,52.315 c0.301,1.282,0.528,2.563,0.829,3.844c3.166,14.7,7.84,28.645,13.87,41.611c-7.086,14.398-14.247,26.836-19.223,35.279 c-3.769,6.408-7.915,13.117-12.212,19.826c-19.373,3.468-35.807,7.689-50.129,12.966c-19.373,7.011-34.902,16.056-46.059,26.836 c-7.237,6.935-12.137,14.323-14.549,22.012c-2.563,7.915-2.412,15.83,0.452,22.916c2.638,6.558,7.387,12.061,13.72,15.83 c1.508,0.905,3.091,1.658,4.749,2.337c4.825,1.96,10.101,3.015,15.604,3.015c12.74,0,25.856-5.503,36.937-15.378 c20.655-18.469,41.988-48.169,54.577-66.94c10.327-1.583,21.559-2.94,34.224-4.297c14.926-1.508,28.118-2.412,40.104-2.865 c3.694,3.317,7.237,6.483,10.629,9.498c18.846,16.81,33.168,28.947,46.134,37.465c0,0.075,0.075,0.075,0.151,0.075 c5.126,3.392,10.026,6.181,14.926,8.443c5.503,2.563,11.081,3.92,16.81,3.92c7.237,0,14.021-2.186,19.675-6.181 c5.729-4.146,9.875-10.101,11.76-16.81C420.18,387.694,418.899,378.724,414.376,370.658z M247.705,219.667 c-1.055-9.348-1.508-19.072-1.357-29.324c0.151-9.724,3.694-16.283,8.895-16.283c3.92,0,8.066,3.543,9.95,10.327 c0.528,2.035,0.905,4.372,0.98,7.01c0.151,3.166,0.075,6.483-0.075,9.875c-0.452,9.574-2.111,19.75-4.975,30.681 c-1.734,7.011-3.995,14.323-6.784,21.936C251.173,243.186,248.911,231.803,247.705,219.667z M121.967,418.073 c-1.282-3.166,0.151-9.272,7.991-16.81c11.986-11.458,30.756-20.504,56.914-27.364c-4.975,6.784-9.875,12.966-14.624,18.619 c-7.237,8.744-14.172,16.132-20.429,21.71c-5.352,4.824-11.232,7.84-16.81,8.594c-0.98,0.151-1.96,0.226-2.94,0.226 C127.168,423.049,123.173,421.089,121.967,418.073z M242.428,337.942l0.528-0.829l-0.829,0.151 c0.151-0.377,0.377-0.754,0.603-1.055c3.166-5.352,7.161-12.212,11.458-20.127l0.377,0.829l0.98-2.035 c3.166,4.523,6.634,8.971,10.252,13.267c1.734,2.035,3.543,3.995,5.352,5.955l-1.206,0.075l1.055,0.98 c-3.091,0.226-6.332,0.528-9.574,0.829c-2.035,0.226-4.146,0.377-6.257,0.603C250.796,337.037,246.499,337.49,242.428,337.942z M369.297,384.98c-8.971-5.729-18.996-13.795-31.359-24.575c17.564,1.809,31.359,5.654,41.159,11.383 c4.297,2.488,7.538,5.051,9.724,7.538c3.618,3.844,4.9,7.312,4.221,9.649c-0.603,2.337-3.241,3.92-6.483,3.92 c-1.885,0-3.844-0.452-5.88-1.432c-3.468-1.658-7.086-3.694-10.93-6.181C369.598,385.282,369.448,385.131,369.297,384.98z"></path> </g> </g> </g></svg>`
}
////////////////// EVENTOS
btn_home.addEventListener("click", HandleHomeBtn);
btn_quejas.addEventListener("click", HandleQuejasBtn);

///////////////// FUNCIONES
function RemoveAllSelected() {
    // Obtenemos todos los botones seleccionados
    const all_selected = document.querySelectorAll(".selected");

    // Iteramos y se lo quitamos
    all_selected.forEach(btn => {
        btn.classList.remove("selected");
    });
}

function SetViewerClass(new_class) {
    // Eliminamos todas las clases
    viewer.className = "viewer";

    // Asignamos la nueva clase
    viewer.classList.add(new_class);
}

function PrepareViewer(nombre, boton) {
    // Reseteamos los botones
    RemoveAllSelected();
    // Resteamos el viewer y le añadimos la clase actual
    SetViewerClass(nombre);
    // Enseñamos el boton
    boton.classList.add("selected");

    // Vaciamos el contenido
    $cont1.innerHTML = "";
    $cont2.innerHTML = "";
    $cont3.innerHTML = "";
    $cont4.innerHTML = "";
}

async function GetQuejasByDate(fecha) {

    const query = new URLSearchParams({
        fecha: fecha
    }).toString();

    const response = await fetch(`${domain}/quejas?${query}`, {
        method: "GET"
    });

    const result = (response.ok) ? await response.json() : null;

    if (!result) { return null }

    if (result.status === "error") {
        return null
    } else {
        return result
    }
}

async function HandleHomeBtn(event) {
    // Preparamos la base
    PrepareViewer("home", btn_home);
    // Creamos el titulo
    const titulo = document.createElement("h1");
    titulo.textContent = "Quejas de hoy";

    // Creamos el contenedor de quejos
    const contenedor = document.createElement("div");
    contenedor.classList.add("quejas_container");

    // Obtenemos el dia de hoy y pedimos las quejas por fecha de hoy
    const today_date = DateFormatter.format(new Date());
    const quejas = await GetQuejasByDate(today_date);

    // Si no hay quejas guardamos eso en el contendor
    if (!quejas || quejas.length === 0) {
        contenedor.innerHTML = "<h3>Hoy no hay quejas</h3>"
    } else {
        quejas.forEach(queja => {
            const { id, time, titulo, motivo } = queja
            const elemento = `
                <div class="queja" id='${id}'>
                    <span time>${time}</span>
                    <span motivo>${motivo}</span>
                    <span titulo>${titulo}</span>
                </div>
            `;

            // Añadimos la queja al html
            contenedor.innerHTML += elemento;
        });
    }

    // Añadimos los elementos
    $cont1.appendChild(titulo);
    $cont1.appendChild(contenedor);

    // Buscamos todas las quejas
    const $quejas = document.querySelectorAll(".queja");

    // Les añadimos un evento para mostrarlas
    $quejas.forEach(queja => {
        queja.addEventListener("click", GetFullQueja);
    })

}

function HandleQuejasBtn(event) {
    // Preparamos la base
    PrepareViewer("quejas", btn_quejas);
}

async function GetFullQueja(event) {
    // Recuperamos el id
    const { id } = event.target;

    // Creamos el filtro con el id
    const query_params = new URLSearchParams({
        id: id
    }).toString();

    // Hacemos la peticion
    const response = await fetch(`${domain}/quejas?${query_params}`, {
        method: "GET"
    });

    // Validamos el resultado de la peticion
    const result = (response.ok) ? await response.json() : null

    // Si hay queja mostramos el contenido en un div
    if (result) {
        DisplayQueja(result[0]);
    }
}

async function DisplayQueja(_queja) {
    // Añadimos los elementos que siempre estan
    let type = `<span class='ds_type'>${_queja.motivo}</span>`;

    // Si hay queja la añadimos
    type += (_queja.queja) ? `<span class="ds_motivo">${_queja.queja}</span>` : "";

    // Si hay asignatura la añadimos
    type += (_queja.asignatura) ? `<span class>${_queja.asignatura}</span>` : "";

    // Validamos si hay email o no
    let email = (_queja.email) ? _queja.email : "Anónimo";

    // Creamos el elemento display
    const queja_display = `
        <div class="queja_display">
            <span class="ds_timestamp">${_queja.date} ${_queja.time}</span>
            <span class="ds_user">${_queja.user}</span>
            <span class="ds_email">${email}</span>
            <div class="ds_types">${type}</div>
            <span class="ds_title">${_queja.titulo}</span>
            <p class="ds_body">${_queja.cuerpo}</p>
            <div class="ds_attachements">
                <h3>Archivos adjuntos</h3>
                <div class="adjuntos">
                    ${await LoadAttachedFiles(_queja.files)}
                </div>
            </div>
        </div>
        <div class="queja_controles">
            ${svgs.xmark}
            <div class="actions">
                ${svgs.trash}
                ${svgs.block}
            </div>
        </div>
    `;

    // Creamos el display
    const display = document.createElement("div");
    display.className = "display";

    // Creamos la parte trasera
    const back = document.createElement("div");
    back.className = "cancel_back";

    // Si ya hay un display lo borramos
    if (document.querySelector(".display")) {
        document.querySelector(".display").remove();
    }

    // Guardamos en el elemento el display generado
    display.innerHTML = queja_display;

    // Añadimos los elementos al contenedor 1
    $cont1.appendChild(back);
    $cont1.appendChild(display);

    // Recuperamos el icono de cerrar
    const xmark_icon = document.querySelector(".xmark_icon");

    // Añadimos los eventos para cerrar el display
    back.addEventListener("click", CloseDisplay);
    xmark_icon.addEventListener("click", CloseDisplay);

    // Añadimos los eventos a cada fichero para abrirlo
    const attachemts = document.querySelectorAll(".attachemnt_card");
    for (const attach of attachemts) {
        attach.addEventListener("click", OpenAttachemnt);
    }

}

async function LoadAttachedFiles(files) {
    // Incializamos el contenido html
    let html = "";
    const base_domain = domain.toString().slice(0, -6);

    if (files.length === 0) {
        return '<span>No hay ficheros</span>'
    }

    // Iteramos por cada archivo
    for (const file of files) {

        let content = "";

        if(file.includes("pdf")){
            content = `
                ${svgs.pdf}
            `;
        }else {
            content = `<img src="${base_domain}/files/attachemts/${file}"></img>`;
        }

        html += `
            <div class="attachemnt_card" file_id="${file}">
                ${content}
            </div>
        `;
    }

    return html

}

function OpenAttachemnt(event) {
    const img = event.target;

    console.log(img);

    const src = img.getAttribute("src");

    if (!src || src.includes("no-data")) {
        return;
    }

    OpenInNewTab(src);
}

function OpenInNewTab(url){
    window.open(url,"_blank").focus();
}

function CloseDisplay(event) {
    const back = document.querySelector(".cancel_back");
    const display = document.querySelector(".display");

    back.remove();
    display.remove();

}
//////////////// CUERPO
HandleHomeBtn();