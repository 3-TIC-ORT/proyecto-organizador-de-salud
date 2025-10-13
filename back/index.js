import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";
let data = fs.readFileSync("usuarios.json", "utf-8");


function registrar(nombre, contraseña){
    let nombre = JSON.parse(data);
    let contraseña = JSON.parse(data);
    let usuario = (nombre, contraseña)
    usuario.push(usuario);
    let nuevoJson = JSON.stringify(usuario, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson);
    console.log("Nombre agregado con éxito!");
}

function login (nombre, contraseña){

    let correcto = false;
    let usuarios = JSON.parse(data)

    for (var i = 0; i < usuarios.length; i++) {
        if (nombre && contraseña == usuarios[i]) {
            correcto = true;
        }
    }
}