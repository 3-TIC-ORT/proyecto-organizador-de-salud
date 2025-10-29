import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";


function calendario(events){
    let calendario = JSON.parse(fs.readFileSync("calendario.json", "utf-8"));
    calendario.push(events);
    fs.writeFileSync("calendario.json", events);
    return { msg: true }
}

subscribePOSTEvent("calendario", calendario)

startServer()
