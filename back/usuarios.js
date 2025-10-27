import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";


let usuariosjson = fs.readFileSync("usuarios.json", "utf-8");


function registrarse(datos){
    let usuarios = JSON.parse(usuariosjson);
    usuarios.push(datos);

    console.log("\n " + JSON.stringify(usuarios, null, 2))

 //   let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
    console.log("Nombre agregado con éxito!");
    return {msg:  true}
}



function actualizarse (datos2) {
    let usuariosjson2 = fs.readFileSync("usuarios.json", "utf-8");
    let usuarios2 = JSON.parse(usuariosjson2);

    for (var i = 0; i < usuarios2.length; i++) {
        if (datos2.nombre == usuarios2[i].nombre){
            usuarios2[i].nacimiento = datos2.nacimiento
            usuarios2[i].perfil = datos2.perfil
            usuarios2[i].matricula = datos2.matricula
        }
    }
    let nuevoJson2 = JSON.stringify(usuarios2, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson2);
    console.log("Nombre agregado con éxito!");
    return {msg:true}

}
function iniciosesion (data){
    console.log("HOLA");

    let correcto = false;
    let usuarios = JSON.parse(usuariosjson)

    for (var i = 0; i < usuarios.length; i++) {
        if (data.nombre == usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            correcto = true;
            return {"msg":correcto};
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto};
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto};
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto};
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto};
        }
        else if (data.nombre == usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto};
        }
        else if (data.nombre == usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto};
        }
        else if (data.nombre == usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto};
        }
    }    
}

subscribePOSTEvent("iniciarsesion", iniciosesion)
subscribePOSTEvent("registrar", registrarse)
subscribePOSTEvent("actualizar", actualizarse)

startServer()
//nombre y apellido, mail, contraseña, fecha de nacimiento, médico/paciente, matricula/obra social }
//iniciosesión nombre y apellido, mail, contraseña