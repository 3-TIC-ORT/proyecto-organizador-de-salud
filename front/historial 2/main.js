function redirigir() {
    window.location.href = "https://forms.gle/99QYz9jF14Ys6Shx6";
  }

  let nombreTitulo = document.getElementById("nombre");



function asignarNombre(usuario){
    nombreTitulo.textContent = localStorage["usuario"];
}
asignarNombre();