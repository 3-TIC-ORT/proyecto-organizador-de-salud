import fs from "fs";
let data = fs.readFileSync("usuarios.json", "utf-8");
let nombres = JSON.parse(data);
nombres.push("Santi");
let nuevoJson = JSON.stringify(nombres, null, 2);
fs.writeFileSync("usuarios.json", nuevoJson);
console.log("Nombre agregado con éxito!");