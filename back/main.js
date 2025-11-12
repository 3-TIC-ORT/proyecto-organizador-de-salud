import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic"; 
import { leerYConvertir } from "./historial.js";
import { calendario } from "./calendario.js";
import { iniciosesion } from "./usuarios.js";
import { registrarse } from "./usuarios.js";
import { actualizarse } from "./usuarios.js";
import { cargarEventos } from './calendario.js';
import { nuevaFamilia } from './familias.js';
import { cargarFamilia} from "./familias.js";
import { eliminarFamilia } from "./familias.js";

subscribePOSTEvent("calendario", calendario) 
subscribePOSTEvent("iniciarsesion", iniciosesion)
subscribePOSTEvent("registrar", registrarse)
subscribePOSTEvent("actualizar", actualizarse)
subscribePOSTEvent("cargarEventos", cargarEventos)
subscribePOSTEvent("nuevaFamilia", nuevaFamilia)
subscribePOSTEvent("cargarFamilia", cargarFamilia)
subscribePOSTEvent("eliminarFamilia", eliminarFamilia)

startServer()