import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";


function registrarse(datos){
    let usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
    usuarios.push(datos);
    console.log("\n " + JSON.stringify(usuarios, null, 2))

 //   let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
    console.log("Nombre agregado con éxito!");
    return {msg:  true}
}



function actualizarse (datos2) {
    let usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));

    for (var i = 0; i < usuarios.length; i++) {
        if (datos2.nombre == usuarios[i].nombre){
            usuarios[i].nacimiento = datos2.nacimiento
            usuarios[i].perfil = datos2.perfil
            usuarios[i].matricula = datos2.matricula
        }
    }
    let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson);
    console.log("Nombre agregado con éxito!");
    return {msg:true}

}
function iniciosesion (data){

    let correcto = false;
    let usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
    let resultado = {"msg": false, "case": "5"};

    for (var i = 0; i < usuarios.length; i++) {

        if (data.nombre == usuarios[i].nombre) {
            console.log(nombre)
        }
        else if (data.contraseña == usuarios[i].contraseña) {
            console.log(contraseña)
        }
        else if (data.mail == usuarios[i].mail) {
            console.log(mail)
        }


        if (data.nombre == usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            resultado = {"msg": true, "case": "1"};
            break;
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            resultado = {"msg":correcto, "case": "2"};
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            resultado = {"msg":correcto, "case": "3"};
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            resultado = {"msg":correcto, "case": "4"};
        }
        else if (data.nombre != usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            resultado = {"msg":correcto, "case": "5", data};
        }
        else if (data.nombre == usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail == usuarios[i].mail) {
            correcto = false;
            return {"msg":correcto, "case": "6"};
        }
        else if (data.nombre == usuarios[i].nombre && data.contraseña != usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            resultado = {"msg":correcto, "case": "7"};
        }
        else if (data.nombre == usuarios[i].nombre && data.contraseña == usuarios[i].contraseña && data.mail != usuarios[i].mail) {
            resultado = {"msg":correcto, "case": "8"};
        }
    }
    console.log("Resultado:", resultado);
    return resultado;    
}

subscribePOSTEvent("iniciarsesion", iniciosesion)
subscribePOSTEvent("registrar", registrarse)
subscribePOSTEvent("actualizar", actualizarse)

startServer()
//nombre y apellido, mail, contraseña, fecha de nacimiento, médico/paciente, matricula/obra social }
//iniciosesión nombre y apellido, mail, contraseña