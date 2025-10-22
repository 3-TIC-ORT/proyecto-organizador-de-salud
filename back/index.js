import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";


let usuariosjson = fs.readFileSync("usuarios.json", "utf-8");


function registrarse(datos){
    let usuarios = JSON.parse(usuariosjson);
    console.log(usuarios)
    usuarios.push(datos);
    let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson);
    console.log("Nombre agregado con éxito!");
}

function iniciosesion (data){
    console.log("HOLA");


    let correcto = false;
    let usuarios = JSON.parse(usuariosjson)

    for (var i = 0; i < usuarios.length; i++) {
        if (data.nombre == usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            correcto = true;
        }
    }

    return {"msg":correcto};
}




subscribePOSTEvent("iniciarsesion", iniciosesion)
subscribePOSTEvent("registrar", registrarse)
subscribePOSTEvent("actualizar", actualizarse)

startServer()
//nombre y apellido, mail, contraseña, fecha de nacimiento, médico/paciente, matricula/obra social }
//iniciosesión nombre y apellido, mail, contraseña