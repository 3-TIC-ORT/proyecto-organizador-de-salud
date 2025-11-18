function redirigir() {
    window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSf4iBSCSs2o_il4lrW12llMmNNVyks1zaYdi7JpRbjsUvfP1w/viewform",
        "_blank",
        "noopener,noreferrer"
    );
}


  let nombreTitulo = document.getElementById("nombre");



  function asignarNombre(usuario){
    nombreTitulo.textContent = localStorage.getItem("mailPacienteHistorial");

    
}
asignarNombre();

let flecha = document.getElementById("flecha");
flecha.addEventListener('click', () => {
window.location.href = "../grupo familiar final/index.html"


});