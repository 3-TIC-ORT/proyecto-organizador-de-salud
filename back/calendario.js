import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic"; 
import fs from "fs";

function calendario(events){
    let calendario = {};

    try {
        calendario = JSON.parse(fs.readFileSync("calendario.json", "utf-8"));
    } catch (e) {
        // Si el archivo está vacío o mal formado, arrancamos con un objeto vacío
        calendario = {};
    }

    for (let fecha in events) {
        if (!calendario[fecha]) {
            calendario[fecha] = [];
        }
        calendario[fecha].push(...events[fecha]);
    }
    if (typeof events !== "object" || Array.isArray(events)) {
        throw new Error("Formato inválido para calendario");
    }
    

    fs.writeFileSync("calendario.json", JSON.stringify(calendario, null, 2));
    return { msg: true };
}


subscribePOSTEvent("calendario", calendario) 
startServer()