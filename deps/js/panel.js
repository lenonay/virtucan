/////////////////// ELEMENTOS
// Botones 
const btn_home = document.querySelector(".btn_home");
const btn_quejas = document.querySelector(".btn_quejas");
const btn_storage = document.querySelector(".btn_storage");
const btn_stats = document.querySelector(".btn_stats");
const btn_users = document.querySelector(".btn_users");
const btn_pfp = document.querySelector(".pfp");
const btn_logoff = document.querySelector(".btn_logoff");
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
const base_domain = domain.toString().slice(0, -6);
const allowed_exts = ["jpg", "png", "jpeg"];
const max_size = 2000000; // 2MB
// Formateadores de fecha
const DateFormatter = new Intl.DateTimeFormat("es-ES", { dateStyle: "short" });
const TimeFormatter = new Intl.DateTimeFormat("es-ES", { timeStyle: "short" });
// SVG
const svgs = {
    trash: (size = 60) => { return `<svg class="trash_icon" width="${size}px" height="${size}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7628 9H7.63719C7.18864 9 6.82501 9.37295 6.82501 9.833V16.5C6.82501 17.8807 7.91632 19 9.26251 19H14.1375C14.784 19 15.404 18.7366 15.8611 18.2678C16.3182 17.7989 16.575 17.163 16.575 16.5V9.833C16.575 9.37295 16.2114 9 15.7628 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.625 7L13.9191 5.553C13.7541 5.21427 13.4167 5.0002 13.0475 5H10.3526C9.98338 5.0002 9.64596 5.21427 9.48092 5.553L8.77502 7H14.625Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.8247 12.333C10.8247 11.9188 10.4889 11.583 10.0747 11.583C9.66047 11.583 9.32469 11.9188 9.32469 12.333H10.8247ZM9.32469 15.666C9.32469 16.0802 9.66047 16.416 10.0747 16.416C10.4889 16.416 10.8247 16.0802 10.8247 15.666H9.32469ZM14.0753 12.333C14.0753 11.9188 13.7396 11.583 13.3253 11.583C12.9111 11.583 12.5753 11.9188 12.5753 12.333H14.0753ZM12.5753 15.666C12.5753 16.0802 12.9111 16.416 13.3253 16.416C13.7396 16.416 14.0753 16.0802 14.0753 15.666H12.5753ZM14.625 6.25C14.2108 6.25 13.875 6.58579 13.875 7C13.875 7.41421 14.2108 7.75 14.625 7.75V6.25ZM16.575 7.75C16.9892 7.75 17.325 7.41421 17.325 7C17.325 6.58579 16.9892 6.25 16.575 6.25V7.75ZM8.77501 7.75C9.18923 7.75 9.52501 7.41421 9.52501 7C9.52501 6.58579 9.18923 6.25 8.77501 6.25V7.75ZM6.82501 6.25C6.4108 6.25 6.07501 6.58579 6.07501 7C6.07501 7.41421 6.4108 7.75 6.82501 7.75V6.25ZM9.32469 12.333V15.666H10.8247V12.333H9.32469ZM12.5753 12.333V15.666H14.0753V12.333H12.5753ZM14.625 7.75H16.575V6.25H14.625V7.75ZM8.77501 6.25H6.82501V7.75H8.77501V6.25Z" fill="currentColor"></path> </g></svg>` },
    block: (size = 60) => { return `<svg class="block_icon" width="${size}px" height="${size}px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.45 7.05017L7.54999 16.9502" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>` },
    xmark: (size = 60) => { return `<svg class="xmark_icon" width="${size}px" height="${size}px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="currentColor"></path> </g></svg>` },
    code: (size = 60) => { return `<svg class="code_icon" width="${size}px" height="${size}px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2354 7.14709C14.3167 6.74092 14.0533 6.3458 13.6471 6.26456C13.2409 6.18333 12.8458 6.44674 12.7646 6.85291L14.2354 7.14709ZM10.7646 16.8529C10.6833 17.2591 10.9467 17.6542 11.3529 17.7354C11.7591 17.8167 12.1542 17.5533 12.2354 17.1471L10.7646 16.8529ZM7.97342 15.4921C8.26837 15.7829 8.74323 15.7795 9.03406 15.4846C9.32488 15.1896 9.32153 14.7148 9.02658 14.4239L7.97342 15.4921ZM5.5 12L4.97342 11.4659C4.83048 11.6069 4.75 11.7993 4.75 12C4.75 12.2007 4.83048 12.3931 4.97342 12.5341L5.5 12ZM9.02658 9.57606C9.32153 9.28523 9.32488 8.81037 9.03406 8.51542C8.74323 8.22047 8.26837 8.21712 7.97342 8.50794L9.02658 9.57606ZM15.9773 14.3782C15.6802 14.6669 15.6735 15.1417 15.9622 15.4387C16.2509 15.7358 16.7257 15.7425 17.0227 15.4538L15.9773 14.3782ZM19.5 12L20.0227 12.5378C20.1667 12.3979 20.2486 12.2061 20.25 12.0053C20.2514 11.8046 20.1723 11.6116 20.0303 11.4697L19.5 12ZM17.0303 8.46967C16.7374 8.17678 16.2626 8.17678 15.9697 8.46967C15.6768 8.76256 15.6768 9.23744 15.9697 9.53033L17.0303 8.46967ZM12.7646 6.85291L10.7646 16.8529L12.2354 17.1471L14.2354 7.14709L12.7646 6.85291ZM9.02658 14.4239L6.02658 11.4659L4.97342 12.5341L7.97342 15.4921L9.02658 14.4239ZM6.02658 12.5341L9.02658 9.57606L7.97342 8.50794L4.97342 11.4659L6.02658 12.5341ZM17.0227 15.4538L20.0227 12.5378L18.9773 11.4622L15.9773 14.3782L17.0227 15.4538ZM20.0303 11.4697L17.0303 8.46967L15.9697 9.53033L18.9697 12.5303L20.0303 11.4697Z" fill="currentColor"></path> </g></svg>` }
}
////////////////// EVENTOS
btn_home.addEventListener("click", HandleHomeBtn);
btn_quejas.addEventListener("click", HandleQuejasBtn);
btn_storage.addEventListener("click", HandleStorageBtn);
btn_stats.addEventListener("click", HandleStatsBtn);
btn_users.addEventListener("click", HandleUsersBtn);

btn_pfp.addEventListener("click", HandlePfpBtn);
btn_logoff.addEventListener("click", Logoff);

///////////////// FUNCIONES
async function Logoff(event) {
    const peticion = await fetch(`${base_domain}/login`, {
        method: "DELETE"
    });

    const resultado = (peticion.ok) ? await peticion.json() : null;

    if (!resultado) {
        ShowMsg({ type: "error", msg: "No se ha podido cerrar sesión" });
        return
    }

    window.location = `${base_domain}/login`;
}

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
        quejas.reverse();

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
    $cont2.innerHTML = "<h1>Estadísticas</h1>";
    $cont3.innerHTML = "<h1>Almacenamiento consumido</h1>"

    // Buscamos todas las quejas
    const $quejas = document.querySelectorAll(".queja");

    // Les añadimos un evento para mostrarlas
    $quejas.forEach(queja => {
        queja.addEventListener("click", GetFullQueja);
    })

}

async function HandleQuejasBtn(event) {
    // Preparamos la base
    PrepareViewer("quejas", btn_quejas);

    // Obtenemos todas las quejas
    const peticion = await fetch(`${domain}/quejas`);
    const quejas = (peticion.ok) ? await peticion.json() : null;

    // Creamos el elemento html
    const contenedor = document.createElement("div");
    contenedor.classList.add("quejas_container");

    // Creamos el titulo
    const titulo = document.createElement("h1");
    titulo.textContent = "Todas las quejas";

    if (!quejas) {
        contenedor.innerHTML = "<h3>No hay quejas registradas</h3>";
    } else {
        quejas.reverse();

        quejas.forEach(queja => {
            // Sacamos los parámetros de las quejas
            const { id, time, date, titulo, motivo } = queja;
            // Creamos la queja
            const html = `
                <div class="queja" id="${id}">
                    <span time date>${date}</span>
                    <span time>${time}</span>
                    <span motivo>${motivo}</span>
                    <span titulo>${titulo}</span>
                </div>
            `;

            contenedor.innerHTML += html;
        });
    }

    // Añadimos el contenedor y el titulo
    $cont1.appendChild(titulo);
    $cont1.appendChild(contenedor);

    // Recuperamos todas las quejas que hemos añadido
    const quejas_el = document.querySelectorAll(".queja");

    // Si hay quejas les añadimos el evento de para mostrarlas
    if (quejas_el) {
        quejas_el.forEach(queja => {
            queja.addEventListener("click", GetFullQueja);
        })
    }

}

async function HandleStorageBtn(event) {
    PrepareViewer("storage", btn_storage);

    // Pedimos todos los nombres de los ficheros
    const peticion = await fetch(`${base_domain}/files/attachemnts`, {
        method: "GET"
    });

    // Validamos si llega bien la respuesta
    const resultado = (peticion.ok) ? await peticion.json() : null;

    // Si llega la respuesta la mandamos a procesar
    if (resultado) {
        DisplayFiles(resultado);
    }
}

function HandleStatsBtn(event) {
    PrepareViewer("stats", btn_stats);

    $cont1.innerHTML = "<h1>Estoy trabajando en ello</h1>";

    $cont1.insertAdjacentHTML("beforeend",svgs.code(200));
}

function HandleUsersBtn(event){
    PrepareViewer("users", btn_users);
}

async function HandlePfpBtn(event) {
    PrepareViewer("pfp", btn_pfp);

    // Creamos la img de perfil y la guardamos en contenido 1
    const pfp_img = `
        <img class="pfp_img" src="${base_domain}/files/pfp">
        <input type="file" name="pfp_new" id="inp_pfp" hidden>
    `;

    // Recuperamos los datos del usuario
    const datos_personales = await GetUserData();

    // Creamos el contenido html de los datos personales
    const $datos = (datos_personales)
        ? CreatePersonalDataHTML(datos_personales)
        : "<h1>Datos Personales</h1><h3>No se han podido cargar los datos</h3>"
    ;

    const $botones = `
        <div class="account_btns">
            <button class="change_pass_btn" type="button">
                <span>Cambiar contraseña</span>
            </button>
            <button class="restart_pfp_btn" type="button">
                <span>Reiniciar foto de perfil</span>
            </button>
            <button class="delete_account_btn" type="button">
                <span>Borrar cuenta</span>
            </button>
        </div>
    `;

    $cont1.innerHTML = pfp_img;
    $cont2.innerHTML = $datos;
    $cont3.innerHTML = $botones;
    $cont4.innerHTML = "<h1>Acciones recientes</h1>";

    // Elementos
    const $pfp_img = document.querySelector(".pfp_img");
    const $inp_pfp = document.querySelector("#inp_pfp");
    // Botones
    const edit_btn = document.querySelector(".edit_btn");
    const confirm_btn = document.querySelector(".confirm_btn");
    const cancel_btn = document.querySelector(".cancel_btn");
    const change_pass_btn = document.querySelector(".change_pass_btn");
    const restart_pfp_btn = document.querySelector(".restart_pfp_btn");
    const delete_account_btn = document.querySelector(".delete_account_btn");

    // Eventos
    $pfp_img.addEventListener("click", () => { $inp_pfp.click() });
    $inp_pfp.addEventListener("change", UploadPFP);
    // Eventos de botones
    restart_pfp_btn.addEventListener("click", RestartPFP);

    if (edit_btn) {
        edit_btn.addEventListener("click", EditPersonalData);
        cancel_btn.addEventListener("click", CancelEditPersonalData);

        confirm_btn.addEventListener("click", UpdatePersonalData);
    }

}

async function RestartPFP(event){
    // Creamos la alerta
    CreateAlert($cont3);

    // Recueramos el boton de continuar
    const continuar_btn = document.querySelector(".continuar_btn");

    continuar_btn.addEventListener("click", async () =>{
        // Cerramos la alerta
        CloseDisplay();

        // Mandamos la petición de borrar
        const peticion = await fetch(`${base_domain}/files/pfp`,{
            method: "DELETE"
        });

        // Obtenemos el resultado de la oepracion
        const resultado = (peticion.ok) ? await peticion.json() : null;

        // Si hubo un error lo mostramos y salimos
        if(resultado.status !== "OK"){
            ShowMsg({type: "error", msg: resultado.error});
            return;
        }

        // Recargamos la foto de perfil
        ReloadPFP();

        // Mostramos mensaje de éxito
        ShowMsg({type: "success", msg: "Se ha reiniciado la foto de perfil"});
    })
}

async function UploadPFP(event) {
    // Recuperamos los archivos del input
    const files = event.target.files;

    // Si no hay ficheros salimos
    if (!files || !files[0]) return;

    // Sacamos el primer archivo y sus caracteristicas
    const file = files[0];
    const { name, size } = file;

    // Revisamos la extensión
    const file_ext = name.split(".").pop().toLowerCase();

    // Si la extesión no esta permitida mostramos error
    if (!allowed_exts.includes(file_ext)) {
        ShowMsg({ type: "error", msg: "Extensión inválida, solo se permiten imágenes" });
        return;
    }

    // Revisamos el peso
    if (size > max_size) {
        ShowMsg({ type: "error", msg: "Peso excedido, 2MB como máximo" });
        return;
    }

    // Instanciamos el formulario y añadimos el fichero
    const form = new FormData();
    form.append("new_pfp", file);

    // Hacemos la peticion al servidor
    const peticion = await fetch(`${base_domain}/files/pfp`, {
        method: "POST",
        body: form
    });

    const result = (peticion.ok) ? await peticion.json() : null;

    // Si no se hizo la peticion
    if (!result) {
        ShowMsg({ type: "error", msg: "No se pudo conectar con el servidor" });
        return;
    }

    // Si hubo en error por parte del server
    if (result.status !== "OK") {
        ShowMsg({ type: "error", msg: result.error });
        return;
    }

    // Mostramos el mensaje y recargamos las imagenes
    ShowMsg({ type: "success", msg: "Se ha subido la nueva foto de perfil" });
    ReloadPFP();
}

function ReloadPFP() {
    // Recuperamos las imagenes
    const pfp_icon = document.querySelector(".pfp img");
    const pfp_img = document.querySelector(".pfp_img");

    pfp_icon.src = pfp_icon.src + "?reload";

    if (pfp_img) {
        pfp_img.src = pfp_img.src + "?reload";
    }
}

async function GetUserData() {
    // Hacemos la petición
    const peticion = await fetch(`${base_domain}/user`, {
        method: "GET"
    });

    // Validamos la petición y parseamos el json
    const resultado = (peticion.ok) ? await peticion.json() : null;

    // Si no hay resultado retornamos un error
    if (!resultado || resultado.status !== "OK") {
        ShowMsg({ type: "error", msg: "No se han podido obtener los datos" });

        return;
    }

    // Si todo sale bien retornamos los datos del usuario
    return resultado.data;
}

async function CancelEditPersonalData() {
    // Recuperamos los datos del usuario
    const personalData = await GetUserData();

    // Generamos el html
    const html = CreatePersonalDataHTML(personalData);

    // mostramos los datos y quitamos el modo edicion
    $cont2.innerHTML = html;
    $cont2.classList.remove("editting");

    // Recuperamos todos los botones
    const edit_btn = $cont2.querySelector(".edit_btn");
    const confirm_btn = $cont2.querySelector(".confirm_btn");
    const cancel_btn = $cont2.querySelector(".cancel_btn");

    // Le asginamos de vuelta los eventos
    edit_btn.addEventListener("click", EditPersonalData);
    cancel_btn.addEventListener("click", CancelEditPersonalData);
    confirm_btn.addEventListener("click", UpdatePersonalData);

    // Mostramos un mensaje de operacion abortada
    ShowMsg({ type: "success", msg: "Cambios abortados" });
}

async function UpdatePersonalData() {
    // Recuperamos todos los inputs
    const $user = $cont2.querySelector("input[name=nombre]");
    const $email = $cont2.querySelector("input[name=email]");
    const $priv = $cont2.querySelector("input[name=priv]");
    const $extra = $cont2.querySelector("input[name=extra]");
    const $notify = $cont2.querySelector("input[name=notify]");
    const $all_asignaturas = $cont2.querySelectorAll(".asignaturas input");

    // Si recibir notificaciones esta marcado guardamos true, sino false
    const notify_value = ($notify.checked) ? true : false;

    // Incializamos un array vacío
    let asignaturas_value = [];

    $all_asignaturas.forEach(input => {
        if (input.checked) {
            asignaturas_value.push(input.value);
        }
    });

    // Creamos un objeto
    const updatedData = {
        user: $user.value,
        email: $email.value,
        priv: $priv.value,
        asignaturas: asignaturas_value,
        extras: $extra.value,
        notify: notify_value
    };

    // Hacemos la petición de actualización al servidor
    const peticion = await fetch(`${base_domain}/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    });

    const resultado = (peticion.ok) ? await peticion.json() : null;

    // Si la conexion falla lo mostramos y salimos
    if (!resultado) {
        ShowMsg({ type: "error", msg: "No se pudo conectar con el servidor" });
        return;
    }

    // Si hubo un error lo mostramos y salimos
    if (resultado.status !== "OK") {
        ShowMsg({ type: "error", msg: resultado.error[0] });
        return;
    }

    // Mostramos mensaje de exito
    ShowMsg({ type: "success", msg: "Se han cambiado los datos" });
    // Quitamos el modo edición
    $cont2.classList.remove("editting");
    // Recargamos los datos completos
    HandlePfpBtn();
}

function EditPersonalData(event) {
    // Recuperamos todos los botones
    const edit_btn = event.target;
    const confirm_btn = document.querySelector(".confirm_btn");
    const cancel_btn = document.querySelector(".cancel_btn");

    // Cambiamos el estado de los botones
    edit_btn.classList.add("hidden");
    confirm_btn.classList.remove("hidden");
    cancel_btn.classList.remove("hidden");

    // Recuperamos el titulo y preparamos el modo edición
    $cont2.classList.add("editting");
    $cont2.querySelector("h1").textContent = "Datos Personales - Modo edición";

    // Volvemos todos los inputs usables
    ToggleEditInputs(true);
}

function ToggleEditInputs(editar) {
    // Recuperamos todos los inputs y todos los checkbox
    const all_inputs = $cont2.querySelectorAll("input");

    // Le añadimos o quitamos el atributo disabled a los elementos
    all_inputs.forEach(input => {
        if (editar) {
            input.removeAttribute("disabled");
        } else {
            input.setAttribute("disabled", "");
        }
    })
}

function CreatePersonalDataHTML(_data) {
    // Si notify es true guardamos checked para usarlo como atributto
    let $notify = (_data.notify) ? "checked" : "";

    // Definimos las asignaturas que tenemos
    const asignaturas = ["SGY", "SRD", "ADD", "ADE", "IMW", "EIE"];
    let $asignaturas = "";

    // Iteramos por cada asignatura
    asignaturas.forEach(asig => {
        // Si en los datos del usuario aparece la asignatura, la marcamos con checked
        let check = (_data.asignaturas.includes(asig)) ? "checked" : "";
        // Creamos el html
        $asignaturas += "<div>";
        $asignaturas += `<span>${asig}</span>`;
        $asignaturas += `<input type="checkbox" disabled value="${asig}" ${check}/>`;
        $asignaturas += "</div>";
    });

    // Creamos el html combinando toda la información.
    const html = `
        <h1>Datos Personales</h1>
        <div class="personal_data editting">
            <label for="nombre">
                <span>Nombre de usuario</span>
                <input type="text" name="nombre" disabled value="${_data.user}"/>
            </label>
            <label for="email">
                <span>Email</span>
                <input type="text" name="email" disabled value="${_data.email}"/>
            </label>
            <label for="priv">
                <span>Privilegio</span>
                <input type="text" name="priv" disabled value="${_data.priv}"/>
            </label>
            <label for="asignaturas">
                <span>Asignaturas de interes</span>
                <div class="asignaturas">
                    ${$asignaturas}
                </div>
            </label>
            <label for="extra">
                <span>Datos Extras</span>
                <input type="text" name="extra" disabled value="${_data.extras}" placeholder="..." />
            </label>
            <label for="notify">
                <span>Recibir notificaciones de las asignaturas</span>
                <input type="checkbox" name="notify" value="true" ${$notify} disabled>
            </label>
            <div class="botones">
                <button class="edit_btn" type="button">Editar información</button>
                <button class="confirm_btn hidden"type="button">Confirmar</button>
                <button class="cancel_btn hidden"type="button">Cancelar</button>
            </div>
        </div>
    `;

    // Devolvemos el html generado
    return html;
}

function DisplayFiles(files) {
    // Si la longitud es cero mostrar que no hay nada
    if (files.length === 0) {
        $cont1.innerHTML = "<h3>No hay archivos adjuntos</h3>"
        return;
    }

    // Inicilizamos el 
    let html = "";

    files.forEach(file => {
        // Creamos la ruta de la imagen
        const route = base_domain + "/files/attachemnts/" + file;

        // añadimos la imagen al html
        html += `
            <div class="file_display" id="${file}">
                <img src="${route}">
                <button type="button" class="del_file_btn">
                    ${svgs.trash(50)}
                </button>
            </div>
        `;
    });

    // Metemos las imagenes que hemos generado 
    $cont1.innerHTML = html;

    const imagenes = document.querySelectorAll(".file_display img");
    if (imagenes) {
        imagenes.forEach(imagen => {
            imagen.addEventListener("click", event => {
                // Recuperamos la imagen y su url
                const img = event.currentTarget;
                const src = img.getAttribute("src");

                // La abrimos en una nueva pestaña
                OpenInNewTab(src);
            });
        });
    }

    // Metemos los eventos por cada boton
    const botones = document.querySelectorAll(".del_file_btn");
    if (botones) {
        botones.forEach(boton => {
            boton.addEventListener("click", DeleteFile)
        });
    }
}

async function DeleteFile(event) {
    // Recuperamos la imagen y el contenedor
    const boton = event.currentTarget;
    const div = boton.parentElement;
    const img = div.firstElementChild;

    // Sacamos el src y de la url sacamos solo el nombre del fichero
    const filename = img.getAttribute("src").toString().split("/").pop();

    // Creamos la alerta
    CreateAlert($cont1);

    const continuar_btn = document.querySelector(".continuar_btn");

    // Asignamo el evento de enviar la peticion de borrado al servidor
    continuar_btn.addEventListener("click", async (event) => {
        const peticion = await fetch(`${base_domain}/files/attachemnts/${filename}`, {
            method: "DELETE"
        });

        const resultado = (peticion.ok) ? await peticion.json() : null;

        if (resultado.status !== "OK") {
            ShowMsg({ type: "error", msg: resultado.msg });
        } else {
            ShowMsg({ type: "advice", msg: resultado.msg });
            ReloadSelectedZone();
        }

        CloseDisplay();

    });

}

async function GetFullQueja(event) {
    // Recuperamos el id
    const { id } = event.currentTarget;

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
        <div class="queja_display" id="${_queja.id}">
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
            ${svgs.xmark()}
            <div class="actions">
                ${svgs.trash()}
                ${svgs.block()}
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
    const trash_icon = document.querySelector(".trash_icon");

    // Añadimos el evento para borrar la queja
    trash_icon.addEventListener("click", DeleteQueja);

    // Añadimos los eventos para cerrar el display
    back.addEventListener("click", CloseDisplay);
    xmark_icon.addEventListener("click", CloseDisplay);

    // Añadimos los eventos a cada fichero para abrirlo
    const attachemts = document.querySelectorAll(".attachemnt_card");
    for (const attach of attachemts) {
        attach.addEventListener("click", OpenAttachemnt);
    }

}

async function DeleteQueja(event) {
    // Recuperamos el display de la queja
    const padre = document.querySelector(".queja_display");

    // Recuperamos el id de la queja
    const { id } = padre;

    // Creamos la alerta
    CreateAlert($cont1);

    const continuar_btn = document.querySelector(".continuar_btn");

    // Asignamos el evento para continuar
    continuar_btn.addEventListener("click", async () => {
        const peticion = await fetch(`${domain}/quejas/${id}`, {
            method: "DELETE"
        });
        const resultado = (peticion.ok) ? await peticion.json() : null;

        // Cerramos los display
        CloseDisplay();

        // Si no hay resultado por fallo de conectar al servidor
        if (!resultado) {
            ShowMsg({ type: "error", msg: "No se pudo conectar con el servidor" });
            return
        }

        // Si hubo un fallo en el servidor, no existe la queja, etc
        if (resultado.status !== "OK") {
            ShowMsg({ type: "error", msg: resultado.msg });
            return
        }

        // Si todo fue bien mostrar mensaje de exito;
        ShowMsg({ type: "succes", msg: resultado.msg });

        // Recargamos la seccion para que se vean los cambios
        ReloadSelectedZone();
    });
}

async function LoadAttachedFiles(files) {
    // Incializamos el contenido html
    let html = "";

    if (files.length === 0) {
        return '<span>No hay ficheros</span>'
    }

    // Iteramos por cada archivo
    for (const file of files) {
        html += `
            <div class="attachemnt_card" file_id="${file}">
                <img src="${base_domain}/files/attachemnts/${file}"></img>
            </div>
        `;
    }

    return html;

}

function OpenAttachemnt(event) {
    const img = event.target;

    // Sacamos el atribute de src
    const src = img.getAttribute("src");

    // Si lo conseguimos abrimos la foto en otra pestaña
    if (src) {
        // Abrimos la URL en una nueva pestaña
        OpenInNewTab(src);
    }
}

function OpenInNewTab(url) {
    // Usamos window.open solo si la URL es válida
    if (url) {
        window.open(url, "_blank").focus();
    }
}

function ReloadSelectedZone() {
    const selected_btn = document.querySelector(".selected").classList[0];

    // Switch para llamar a las funciones
    switch (true) {
        case selected_btn == "btn_home":
            HandleHomeBtn();
            break;
        case selected_btn == "btn_quejas":
            HandleQuejasBtn();
            break;
        case selected_btn == "btn_storage":
            HandleStorageBtn();
            break;
    }
}

function CloseDisplay(event) {
    const back = document.querySelector(".cancel_back");
    const display = document.querySelector(".display");
    const alerta = document.querySelector(".alerta");

    if (back) {
        back.remove();
    }

    if (alerta) {
        alerta.remove();
    }

    if (display) {
        display.remove();
    }

}

function CreateAlert(elemento) {
    // Creamos el elemento back
    const back = document.createElement("div");
    back.className = "cancel_back";

    // Creamos el elemento alerta
    const alerta = document.createElement("div");
    alerta.className = "alerta";

    // Creamos el html de la alerta
    alerta.innerHTML = `
        <h3><span>[!]</span> ¡Atención!</h3>
        <p>Esta acción no se puede deshacer, ¿está seguro de continuar?</p>
        <div class="alerta_btns">
            <button class="continuar_btn">Continuar</button>
            <button class="cancelar_btn">Cancelar</button>
        </div>
    `;

    // Borramos la alerta si ya estaba 
    if (document.querySelector(".alerta")) {
        document.querySelector(".alerta").remove();
    }

    // Borramos el fondo para cancelar si ya estaba
    if (document.querySelector(".cancel_back")) {
        document.querySelector(".cancel_back").remove();
    }

    // Añadimos los elementos al bloque de contenido actual
    elemento.append(back);
    elemento.append(alerta);

    // Recuperamos los botones de confirmacion
    const cancelar_btn = document.querySelector(".cancelar_btn");

    // Asignamos los eventos para cancelar
    cancelar_btn.addEventListener("click", CloseDisplay);
    back.addEventListener("click", CloseDisplay);
}

function ShowMsg(msg) {
    // Recuperamos el display
    const msg_display = document.querySelector(".upper_msg");

    // Guardamos el texto anterior
    const latest_text = msg_display.innerHTML;

    // Creamos el elemento P
    const p = document.createElement("p");

    // Si es un error añadimos la clase eror
    if (msg.type === "error") {
        p.className = "error";
    } else {
        p.className = "succed";
    }

    // Añidimos el texto del msg
    p.textContent = msg.msg;

    // Mostramos el error
    msg_display.innerHTML = "";
    msg_display.append(p)

    // Devolvemos el contenido que estaba antes
    setTimeout(() => {
        msg_display.innerHTML = latest_text;
    }, 5000)
}
//////////////// CUERPO
// HandleHomeBtn();
HandlePfpBtn()