let boton = document.getElementById("boton")


boton.addEventListener("click", function(){ 
    let usuario = document.getElementById("nombre").value;
    let contra = document.getElementById("contraseña").value;
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("contraseña", contra);
})