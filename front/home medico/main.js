connect2Server();



let nombreTitulo = document.getElementById("nombre");



function asignarNombre(usuario){
    nombreTitulo.textContent = localStorage["usuario"];
}
asignarNombre();
