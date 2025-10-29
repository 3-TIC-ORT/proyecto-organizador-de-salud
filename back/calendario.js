import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";


function calendario(events){
    let usuariosjson = JSON.parse(fs.readFileSync("calendario.json", "utf-8"));
    
}
