export function ValidateQueja(body){
    const { email, titulo, cuerpo } = body;


    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(email !== "" && re.test(email) === false){
        return {
            status: "error",
            tag: "#inp_email",
            error: "Email inválido, dejalo vacío si quieres ser anónimo"
        }
    }

    if(!titulo){
        return {
            status: "error",
            tag: "#inp_titulo",
            error: "El titulo es obligatorio"
        }
    }

    if(!cuerpo){
        return { 
            status: "error", 
            tag: "#inp_cuerpo", 
            error: "El cuerpo no puede estar vacío" 
        }
    }

    return { status: "OK" }
}