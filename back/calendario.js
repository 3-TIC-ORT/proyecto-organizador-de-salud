import fs from "fs";
import path from "path";

export function calendario(data) {
  const filePath = path.resolve(process.cwd(), "calendario.json");

  // Asegurar que el archivo exista
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "{}", "utf-8");

  let calendario = {};
  try {
    calendario = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error("Error leyendo calendario.json:", err);
    calendario = {};
  }

  // Si no existe el usuario, crear su registro
  if (!calendario[data.mail]) {
    calendario[data.mail] = {};
  }

  // Si no existe la fecha, crear array vacío
  if (!calendario[data.mail][data.fecha]) {
    calendario[data.mail][data.fecha] = [];
  }

  // Agregar el texto
  calendario[data.mail][data.fecha].push(data.texto);

  // Guardar cambios
  fs.writeFileSync(filePath, JSON.stringify(calendario, null, 2));

  return { msg: true };
}

export function cargarEventos(data) {
  const filePath = path.resolve(process.cwd(), "calendario.json");

  // Si no existe el archivo, devolver vacío
  if (!fs.existsSync(filePath)) {
    return {};
  }

  let calendario;
  try {
    calendario = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error("Error al leer calendario.json:", err);
    return {};
  }

  // Si el archivo no tiene la estructura esperada, devolvemos vacío
  if (typeof calendario !== "object" || calendario === null) {
    console.error("Formato inválido de calendario.json");
    return {};
  }

  // Buscar eventos del usuario
  const mail = data?.mail;
  if (!mail) {
    console.error("No se recibió el mail del usuario:", data);
    return {};
  }

  // Si el usuario no existe, devolver vacío
  const eventosUsuario = calendario[mail] || {};

  return eventosUsuario;
}

export function eliminarEvento(data) {
  const filePath = "calendario.json";

  // Asegurar que el archivo exista
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "{}", "utf-8");

  let calendario = {};
  try {
    calendario = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error("Error leyendo calendario.json:", err);
    return { msg: false, error: "Error leyendo archivo" };
  }

  const { mail, fecha, texto } = data;

  if (!mail || !fecha || typeof texto === "undefined") {
    return { msg: false, error: "Faltan parámetros (mail, fecha o texto)" };
  }

  // Validar usuario y fecha
  if (!calendario[mail]) {
    return { msg: false, error: "Usuario no encontrado" };
  }
  if (!calendario[mail][fecha]) {
    return { msg: false, error: "No hay eventos para esa fecha" };
  }

  // Eliminar solo los textos que coincidan exactamente
  calendario[mail][fecha] = calendario[mail][fecha].filter(t => t !== texto);

  // Si la fecha quedó vacía, eliminarla
  if (calendario[mail][fecha].length === 0) {
    delete calendario[mail][fecha];
  }

  // Guardar cambios
  try {
    fs.writeFileSync(filePath, JSON.stringify(calendario, null, 2), "utf-8");
  } catch (err) {
    console.error("Error guardando calendario.json:", err);
    return { msg: false, error: "Error guardando archivo" };
  }

  return { msg: true, calendario: calendario[mail] || {} };
}

