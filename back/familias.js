import fs from "fs";

/**
 * Carga la familia de un usuario (por mail)
 */
export function cargarFamilia(data) {
  try {
    if (!fs.existsSync("familias.json")) return [];
    const familias = JSON.parse(fs.readFileSync("familias.json", "utf-8"));

    // Buscar la familia asociada al mail del usuario
    const familiaUsuario = familias.find(f => f.creadaPor === data.mail);
    return familiaUsuario ? familiaUsuario.miembros : [];
  } catch (err) {
    console.error("Error al cargar familia:", err);
    return [];
  }
}

/**
 * Agrega un nuevo paciente a la familia
 */
export function nuevaFamilia(data) {
  try {
    let familias = [];
    if (fs.existsSync("familias.json")) {
      familias = JSON.parse(fs.readFileSync("familias.json", "utf-8"));
    }

    if (!data.mail || !data.nuevoPaciente) {
      return { msg: false, error: "Faltan datos obligatorios." };
    }

    // Buscar la familia del usuario
    let familiaUsuario = familias.find(f => f.creadaPor === data.mail);

    if (!familiaUsuario) {
      // Crear una nueva familia si no existe
      familiaUsuario = {
        creadaPor: data.mail,
        miembros: [],
      };
      familias.push(familiaUsuario);
    }

    // Agregar nuevo paciente
    familiaUsuario.miembros.push(data.nuevoPaciente);

    // Guardar en el JSON
    fs.writeFileSync("familias.json", JSON.stringify(familias, null, 2));

    return { msg: true, familia: familiaUsuario.miembros };
  } catch (err) {
    console.error("Error al crear familia:", err);
    return { msg: false, error: "Error interno del servidor." };
  }
}

/**
 * Elimina un paciente de la familia
 */
export function eliminarFamilia(data) {
  try {
    if (!fs.existsSync("familias.json")) return { msg: false };

    const familias = JSON.parse(fs.readFileSync("familias.json", "utf-8"));
    const familiaUsuario = familias.find(f => f.creadaPor === data.mail);

    if (!familiaUsuario) return { msg: false, error: "No se encontró la familia." };

    familiaUsuario.miembros = familiaUsuario.miembros.filter(
      p => p.mail !== data.mailPaciente
    );

    fs.writeFileSync("familias.json", JSON.stringify(familias, null, 2));

    return { msg: true };
  } catch (err) {
    console.error("Error al eliminar familia:", err);
    return { msg: false, error: "Error interno del servidor." };
  }
}

export function checkUsuarioPorMail(data) {
  try {
    if (!data.mail) {
      return { msg: false, error: "No se envió el mail." };
    }

    const mailBuscado = data.mail;

    if (fs.existsSync("usuarios.json")) {
      const usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));

      // usuarios.json es un ARRAY de usuarios? (Lo usual)
      const existeEnUsuarios = usuarios.find(u => u.mail === mailBuscado);

      if (existeEnUsuarios) {
        return { msg: true };
      }
    }

    if (fs.existsSync("familias.json")) {
      const familias = JSON.parse(fs.readFileSync("familias.json", "utf-8"));

      const existeEnFamilias = familias.find(f => f.creadaPor === mailBuscado);

      if (existeEnFamilias) {
        return { msg: true };
      }
    }

    return { msg: false };

  } catch (err) {
    console.error("Error en checkUsuarioPorMail:", err);
    return { msg: false, error: "Error interno del servidor." };
  }
}

export function historialFamiliar(data) {
    let usuarios = [];

    try {
        usuarios = JSON.parse(fs.readFileSync("pacientes.json", "utf8"));
    } catch (e) {
        usuarios = [];
    }

    const { mailUsuario, mailPaciente } = data;

    // Buscar usuario
    let usuario = usuarios.find(u => u.mail === mailUsuario);
    if (!usuario) {
        return { msg: "false" }; // no existe el usuario
    }

    // Buscar paciente dentro del usuario
    let paciente = usuario.pacientes.find(p => p.mail === mailPaciente);

    if (paciente) {
        return { msg: "true" };
    } else {
        return { msg: "false" };
    }
}

