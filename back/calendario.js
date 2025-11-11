import fs from "fs";

export function calendario(data){
    let calendario = JSON.parse(fs.readFileSync("calendario.json", "utf-8"));

    for (let i = 0; i < calendario.length; i++){
        if (calendario[i].mail != data.mail) {
           data.mail[data.fecha].push(data.texto);
           return { "msg": true, "case": "1" };  
        }
        else if (calendario[i].mail == data.mail){
        calendario[i].mail[data.fecha].push(data.texto);
        return { "msg": true, "case": "2"};
        }
    }
    fs.writeFileSync("calendario.json", JSON.stringify(calendario, null, 2));    
}

export function cargarEventos(events){
     let calendario = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
        for (var i = 0; i < calendario.length; i++) {
            if (events.mail == calendario[i].mail) {
          
            }
        }
}



