import fs from "fs";

export function nuevoPaciente(data) {
    let usuarios = [];

    try {
        usuarios = JSON.parse(fs.readFileSync("pacientes.json", "utf8"));
    } catch (e) {
        usuarios = [];
    }

    // Buscar si ya existe el usuario
    let usuario = usuarios.find(u => u.mail === data.mail);

    if (!usuario) {
        // Si no existe, lo creo con el primer paciente
        usuario = {
            mail: data.mail,
            pacientes: []
        };
        usuarios.push(usuario);
    }

    // Agrego el paciente
    usuario.pacientes.push(data.nuevoPaciente);

    // Guardar archivo
    fs.writeFileSync("pacientes.json", JSON.stringify(usuarios, null, 2));

    return { ok: true };
}

export function cargarPacientes(data) {
    let usuarios = [];

    try {
        usuarios = JSON.parse(fs.readFileSync("pacientes.json", "utf8"));
    } catch (e) {
        usuarios = [];
    }

    // Buscar al usuario
    let usuario = usuarios.find(u => u.mail === data.mail);

    if (!usuario) {
        return []; // NO tiene pacientes aún
    }

    return usuario.pacientes;
}


