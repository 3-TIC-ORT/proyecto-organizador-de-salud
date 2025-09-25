import fs from "fs";
let data = fs.readFileSync("usuarios.json", "utf-8");


function registrar(nombre){
    let nombres = JSON.parse(data);
    nombres.push(nombre);
    let nuevoJson = JSON.stringify(nombres, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson);
    console.log("Nombre agregado con éxito!");
}

function login (nombre){

    let correcto = false;
    let usuarios = JSON.parse(data)

    for (var i = 0; i < usuarios.length; i++) {
        if (nombre == usuarios[i]) {
            correcto = true;
        }
    }
}