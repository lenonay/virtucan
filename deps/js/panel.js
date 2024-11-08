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

    const $quejas = document.querySelectorAll(".queja");

    $quejas.forEach(queja => {
        queja.addEventListener("click", ShowFullQueja);
    })

}

function HandleQuejasBtn(event) {
    // Preparamos la base
    PrepareViewer("quejas", btn_quejas);
}

async function ShowFullQueja(event){
    // Recuperamos el id
    const { id } = event.target;

    const query_params = new URLSearchParams({
        id: id
    }).toString();

    const response = await fetch(`${domain}/quejas?${query_params}`,{
        method: "GET"
    });

    const result = (response.ok) ? await response.json() : null

    console.log(result[0]);
}

//////////////// CUERPO
HandleHomeBtn();