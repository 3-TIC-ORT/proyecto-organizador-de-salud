function redirigir() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSf4iBSCSs2o_il4lrW12llMmNNVyks1zaYdi7JpRbjsUvfP1w/viewform";
    target = "_blank";
  rel = "noopener noreferrer";
  }

  let nombreTitulo = document.getElementById("nombre");



  function asignarNombre(usuario){
    (nombreTitulo.textContent = localStorage["nombre"]) || (nombreTitulo.textContent = localStorage["usuario"]);
}
asignarNombre();