connect2Server();


let nombreprincipal = document.getElementById("nombreprincipal");


function asignarNombre(usuario){
    nombreprincipal.textContent = localStorage["usuario"];
}

asignarNombre();