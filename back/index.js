import fs from "fs";


let data = fs.readFileSync("usuarios.json", "utf-8");


function registrarse(nombre, contraseña, mail, fecha, perfil, credencial){
    let usuarios = JSON.parse(data);
    usuarios.push({"nombre": nombre, "contra": contraseña,"mail": mail, "nacimiento": fecha, "perfil": perfil, "credencial": credencial});
    let nuevoJson = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", nuevoJson);
    console.log("Nombre agregado con éxito!");
}

function iniciosesión (nombre, contraseña, mail, fecha, perfil, credencial){

    let correcto = false;
    let usuarios = JSON.parse(data)

    for (var i = 0; i < usuarios.length; i++) {
        if (nombre == usuarios[i].nombre && contraseña == usuarios[i].contra && mail == usuarios[i].mail) {
            correcto = true;
        }
    }
}

registrarse("Luu", "123","luu", "02/04/97", "medico", "1235465");
//nombre y apellido, mail, contraseña, fecha de nacimiento, médico/paciente, credencial/obra social }
//iniciosesión nombre y apellido, mail, contraseña