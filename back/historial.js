import { google } from "googleapis";
import fs from "fs";

const API_KEY = "AIzaSyBTuPO_s9-P7A8-zjdMwgx2Yf5uZQWcMWE";
const SPREADSHEET_ID = "1CxkMpOw8NzbMo2Rwv8KdNHOPC6j-oFDrR-UK5NRQxFg";

const sheets = google.sheets({ version: "v4", auth: API_KEY });

// convierte índice de columna (0 -> A, 25 -> Z, 26 -> AA)
function colIndexToLetter(idx) {
  let s = "";
  while (idx >= 0) {
    s = String.fromCharCode((idx % 26) + 65) + s;
    idx = Math.floor(idx / 26) - 1;
  }
  return s;
}

export async function leerYConvertir() {
  try {
    // 1) Obtener metadata del spreadsheet (para saber nombre de la primera hoja y tamaño)
    const meta = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
      fields: "sheets(properties(sheetId,title,gridProperties(rowCount,columnCount)))"
    });

    if (!meta?.data?.sheets || meta.data.sheets.length === 0) {
      throw new Error("No se encontraron pestañas en el spreadsheet.");
    }

    // Usamos la primera hoja (podés adaptar para usar una por título)
    const primera = meta.data.sheets[0].properties;
    const title = primera.title;
    const rowCount = primera.gridProperties?.rowCount || 1000;
    const colCount = primera.gridProperties?.columnCount || 26;

    const lastColLetter = colIndexToLetter(colCount - 1);
    const range = `${title}!A1:${lastColLetter}${rowCount}`;

    console.log("📌 Metadata detectada:", { title, rowCount, colCount, range });

    // 2) Leer valores con rango explícito grande
    const resp = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
      majorDimension: "ROWS"
    });

    // imprime info para debugging
    console.log("Respuesta recibida. keys:", Object.keys(resp.data));
    // resp.data.range, resp.data.majorDimension, resp.data.values

    const values = resp.data.values || [];

    if (values.length === 0) {
      console.warn("La API devolvió 0 filas. Revisa permisos y que la hoja sea pública.");
      fs.writeFileSync("historial.json", "[]");
      return;
    }

    const headers = values[0];
    const filas = values.slice(1);

    // normalizar cada fila para que tenga la misma longitud que headers
    const objetos = filas.map((fila, idx) => {
      const obj = {};
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = (fila[i] !== undefined) ? fila[i] : "";
      }
      return obj;
    });

    // Guardar
    fs.writeFileSync("historial.json", JSON.stringify(objetos, null, 2));
    console.log("✅ Archivo 'historial.json' guardado con", objetos.length, "objetos.");
  } catch (err) {
    console.error("❌ ERROR completo:", err);
    // si err.response existe, imprimir cuerpo para diagnóstico
    if (err.response) {
      console.error("ERR RESPONSE DATA:", err.response.data);
    }
  }
}

leerYConvertir ();

  export async function cargardDatos(data) {

    leerYConvertir();
    let datos = JSON. parse(fs.readFileSync("historial.json", "utf-8"));
    let encontrado = false;
    let datosUuario = []

    for (let i = 0; i < datos.length; i++){

      if (datos[i].Mail == data.Mail){
        encontrado = true;
        datosUuario = datos[i];
      }

    }

    return {"msg": encontrado, "datos": datosUuario };

  }



