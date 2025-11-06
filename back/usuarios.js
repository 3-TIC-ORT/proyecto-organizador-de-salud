import fs from "fs";


export function registrarse(datos) {
    let usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
    for (var i = 0; i < usuarios.length; i++) {
        if (datos.mail == usuarios[i].mail) {
            return {repe: true}
        }
    }
    let ultimoId = 0;
    for (let index = 0; index < usuarios.length; index++) {
        let usuario = usuarios[index];
        let idUsuario = usuario.id;
        if(idUsuario > ultimoId){
            ultimoId = idUsuario;
        }
    }
    let id = ultimoId + 1;
    datos.id = id;
    usuarios.push(datos);
    //console.log("\n " + JSON.stringify(usuarios, null, 2))

    //   let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
    console.log("Nombre agregado con éxito!");
    return { msg: true }
}



export function actualizarse(datos2) {
    let usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));

    for (var i = 0; i < usuarios.length; i++) {
        if (datos2.nombre == usuarios[i].nombre) {
            usuarios[i].nacimiento = datos2.nacimiento
            usuarios[i].perfil = datos2.perfil
            usuarios[i].matricula = datos2.matricula
        }
    }
    let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson);
    console.log("Nombre agregado con éxito!");
    return { msg: true }

}
export function iniciosesion(data) {

    let correcto = false;
    let usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
    let resultado = { "msg": false, "case": "0" };

    //console.log("daata: " + JSON.stringify(data));

    for (var i = 0; i < usuarios.length; i++) {
        //console.log("Input:" + data[0].nombre + data[0].contraseña + data[0].mail);
        //console.log("User:" + usuarios[i].nombre + usuarios[i].contraseña + usuarios[i].mail);
        //console.log("Comparacion");
        //console.log(data[0].nombre == usuarios[i].nombre);
        //console.log(data[0].contraseña == usuarios[i].contraseña);
        //console.log(data[0].mail == usuarios[i].mail);
        //console.log("=====================================");

        if (data[0].nombre == usuarios[i].nombre && data[0].contraseña == usuarios[i].contraseña && data[0].mail == usuarios[i].mail) {
            resultado = { "msg": true, "case": "1", "perfil": usuarios[i].perfil, "id": data.id};
            break;
        }
        else if (data[0].nombre != usuarios[i].nombre && data[0].contraseña == usuarios[i].contraseña && data[0].mail == usuarios[i].mail) {
            resultado = { "msg": false, "case": "2" };
        }
        else if (data[0].nombre != usuarios[i].nombre && data[0].contraseña != usuarios[i].contraseña && data[0].mail == usuarios[i].mail) {
            resultado = { "msg": false, "case": "3" };
        }
        else if (data[0].nombre != usuarios[i].nombre && data[0].contraseña == usuarios[i].contraseña && data[0].mail != usuarios[i].mail) {
            resultado = { "msg": false, "case": "4" };
        }
        else if (data[0].nombre != usuarios[i].nombre && data[0].contraseña != usuarios[i].contraseña && data[0].mail != usuarios[i].mail) {
            resultado = { "msg": false, "case": "5" };
        }
        else if (data[0].nombre == usuarios[i].nombre && data[0].contraseña != usuarios[i].contraseña && data[0].mail == usuarios[i].mail) {
            correcto = false;
            return { "msg": false, "case": "6" };
        }
        else if (data[0].nombre == usuarios[i].nombre && data[0].contraseña != usuarios[i].contraseña && data[0].mail != usuarios[i].mail) {
            resultado = { "msg": false, "case": "7" };
        }
        else if (data[0].nombre == usuarios[i].nombre && data[0].contraseña == usuarios[i].contraseña && data[0].mail != usuarios[i].mail) {
            resultado = { "msg": false, "case": "8" };
        }
    }
    console.log("Resultado:", resultado);
    return resultado;
}

//nombre y apellido, mail, contraseña, fecha de nacimiento, médico/paciente, matricula/obra social }
//iniciosesión nombre y apellido, mail, contraseña