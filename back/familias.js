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
