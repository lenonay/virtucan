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

    if(!cuerpo){
        return { 
            status: "error", 
            tag: "#inp_body", 
            error: "El cuerpo no puede estar vacío" 
        }
    }

    if(!titulo){
        return {
            status: "error",
            tag: "#inp_titulo",
            error: "El titulo es obligatorio"
        }
    }

    return { status: "OK" }
}