import fs from "fs";

export function calendario(data) {
    let calendario = JSON.parse(fs.readFileSync("calendario.json", "utf-8"));
  
    let usuario = null;
  
    // Buscar si el usuario ya existe
    for (let i = 0; i < calendario.length; i++) {
      if (calendario[i].mail === data.mail) {
        usuario = calendario[i];
        break;
      }
    }
  
    // Si no existe, crear uno nuevo
    if (!usuario) {
      usuario = { mail: data.mail, eventos: [] };
      calendario.push(usuario);
    }
  
    // Agregar el evento al usuario correspondiente
    usuario.eventos.push({ fecha: data.fecha, texto: data.texto });
  
    // Guardar cambios
    fs.writeFileSync("calendario.json", JSON.stringify(calendario, null, 2));
  
    return { msg: true };
  }

export function cargarEventos(events){
     let calendario = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
        for (var i = 0; i < calendario.length; i++) {
            if (events.mail == calendario[i].mail) {
          
            }
        }
}



