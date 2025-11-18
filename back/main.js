import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic"; 
import { calendario } from "./calendario.js";
import { cargarEventos } from './calendario.js';
import { eliminarEvento } from './calendario.js';
import { nuevaFamilia } from './familias.js';
import { cargarFamilia} from "./familias.js";
import { eliminarFamilia } from "./familias.js";
import { checkUsuarioPorMail } from "./familias.js";
import { historialFamiliar } from "./familias.js"
import { cargardDatos } from "./historial.js";
import { leerYConvertir } from "./historial.js";;
import { cargarPacientes } from "./pacientes.js";
import { nuevoPaciente } from "./pacientes.js";
import { eliminarPaciente } from "./pacientes.js";
import { cargarPacientesLista } from "./pacientes.js";
import { iniciosesion } from "./usuarios.js";
import { registrarse } from "./usuarios.js";
import { actualizarse } from "./usuarios.js";

subscribePOSTEvent("calendario", calendario) 
subscribePOSTEvent("cargarEventos", cargarEventos)
subscribePOSTEvent("eliminarEvento", eliminarEvento)
subscribePOSTEvent("nuevaFamilia", nuevaFamilia)
subscribePOSTEvent("cargarFamilia", cargarFamilia)
subscribePOSTEvent("eliminarFamilia", eliminarFamilia)
subscribePOSTEvent("checkUsuarioPorMail", checkUsuarioPorMail)
subscribePOSTEvent("historialFamiliar", historialFamiliar)
subscribePOSTEvent("datosHistorial", cargardDatos)
subscribePOSTEvent("cargarPacientes", cargarPacientes)
subscribePOSTEvent("nuevoPaciente", nuevoPaciente)
subscribePOSTEvent("eliminarPaciente", eliminarPaciente)
subscribePOSTEvent("cargarPacientesLista", cargarPacientesLista);
subscribePOSTEvent("iniciarsesion", iniciosesion)
subscribePOSTEvent("registrar", registrarse)
subscribePOSTEvent("actualizar", actualizarse)

startServer()