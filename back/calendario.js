import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";


let usuariosjson = fs.readFileSync("calendario.json", "utf-8");

