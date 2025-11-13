connect2Server();


let nombreprincipal = document.getElementById("nombreprincipal");


function asignarNombre(usuario){
    (nombreprincipal.textContent = localStorage["nombre"]) || (nombreprincipal.textContent = localStorage["usuario"]);
}

asignarNombre();

postEvent("datosHistorial", {"Mail": localStorage["mail"]}, cargarinfo)



function cargarinfo(data){
    let vacunaDoble =  data[0][3];
    alert(vacunaDoble);
    let vacunaDada =  data[0][4];
    alert(vacunaDada);
    let vacunaHepatitis =  data[0][5];
    alert(vacunaHepatitis);
    let vacuna3dosis =  data[0][6];
    alert(vacuna3dosis);
    let vacunaCovid =  data[0][7];
    alert(vacunaCovid);
    let vacunaUltimadosis =  data[0][8];
    alert(vacunaUltimadosis);
}