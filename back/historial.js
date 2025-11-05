import { google } from "googleapis";
import fs from "fs";

// 👉 tu clave API (la que te dio Google Cloud)
const API_KEY = "AIzaSyCw2HkCmJ0JLfPF6u2xps9yN4uMbr86mqc";

// 👉 el ID de tu Google Sheet (la parte entre /d/ y /edit)
const SPREADSHEET_ID = "1CxkMpOw8NzbMo2Rwv8KdNHOPC6j-oFDrR-UK5NRQxFg";

// 👉 el rango que querés leer (por ejemplo toda la hoja o A1:D20)
const RANGE = "Hoja1"; // podés cambiarlo por "Hoja1" para leer todo

// Crear cliente de Google Sheets con la API Key
const sheets = google.sheets({
  version: "v4",
  auth: API_KEY,
});

async function leerYConvertir() {
    try {
      // Leer datos de Google Sheets
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
      });
  
      const valores = res.data.values;
      if (!valores || valores.length < 2) {
        console.log("No hay suficientes datos en la hoja.");
        return;
      }
  
      // La primera fila son los encabezados
      const headers = valores[0];
      const filas = valores.slice(1);
  
      // Crear un array de objetos (uno por fila)
      const objetos = filas.map(fila => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = fila[i] || ""; // si una celda está vacía
        });
        return obj;
      });
  
      console.log("✅ Datos convertidos a JSON por fila:");
      console.table(objetos);
  
      // Guardar el resultado en un archivo
      fs.writeFileSync("datos_por_fila.json", JSON.stringify(objetos, null, 2));
      console.log("💾 Archivo 'datos_por_fila.json' creado correctamente.");
    } catch (err) {
      console.error("❌ Error al leer o convertir la hoja:", err.message);
    }
  }
  
  leerYConvertir();