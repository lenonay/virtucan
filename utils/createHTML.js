export function GenerateHTML(data) {
    const mail = data.email ?? "Anonymous";

    const motivo = data.motivo;

    let html = `
        <tr style="width: fit-content; text-align: center;">
            <td style="text-transform: capitalize; flex: 1;">${data.motivo}</td>
            <td style="text-transform: capitalize; flex: 1;">${data.queja}</td>
            <td style="text-transform: uppercase; flex: 1;">${data.asignatura}</td>
        </tr>
    `;

    // Crear 1 tr para "OTRO"

    switch(true){
        case (motivo === "otro"):
            html = `
                <tr style="width: fit-content; text-align: center;">
                    <td colspan="3" style="text-transform: capitalize; flex: 1;">${data.motivo}</td>
                 </tr>
            `;
        break;
        case ((motivo === "queja" || motivo === "sugerencia" ) && data.queja === "general"):
            html = `
                <tr style="width: fit-content; text-align: center;">
                    <td style="text-transform: capitalize; flex: 1;">${data.motivo}</td>
                    <td style="text-transform: capitalize; flex: 1;">${data.queja}</td>
                </tr>
            `;    
        break;
    }

    return `
        <table style="background: #f2f2f2 !important; width: 100%; text-align: center; font-size: 20px; padding: 0; margin-inline: auto;">
            <thead style=" width: 100%; padding: 5px; background: #eeddee !important;">
                <tr>
                    <th style="padding: 10px;" colspan="3">${mail}</th>
                </tr>
            </thead>
            <tbody style="width: 100%;">
                ${html}
                <tr style="background-color: #80a4d6 !important;">
                    <td colspan="3" style="font-weight: 700;">${data.titulo}</td>
                </tr>
                <tr style="background: #212121 !important; color: #f2f2f2 !important;">
                    <td colspan="3" style="padding: 15px;">${data.cuerpo}</td>
                </tr>
            </tbody>
        </table>
    `;
}