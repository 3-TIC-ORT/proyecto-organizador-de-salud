import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";


let data = fs.readFileSync("usuarios.json", "utf-8");


function registrarse(nombre, contraseña, mail, nacimiento, perfil, matricula){
    let usuarios = JSON.parse(data);
    usuarios.push({"nombre": nombre, "contraseña": contraseña,"mail": mail, "nacimiento": nacimiento, "perfil": perfil, "matricula": matricula});
    let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson);
    console.log("Nombre agregado con éxito!");
}

function iniciosesión (nombre, contraseña, mail){

    let correcto = false;
    let usuarios = JSON.parse(data)

    for (var i = 0; i < usuarios.length; i++) {
        if (nombre == usuarios[i].nombre && contraseña == usuarios[i].contra && mail == usuarios[i].mail) {
            correcto = true;
        }
    }
}

subscribePOSTEvent("iniciaarsesion", iniciosesión)
startServer()
//nombre y apellido, mail, contraseña, fecha de nacimiento, médico/paciente, matricula/obra social }
//iniciosesión nombre y apellido, mail, contraseña