let boton = document.getElementById("boton");


boton.addEventListener("click", function(){ 
    let usuario = document.getElementById("nombre").value;
    let contra = document.getElementById("contraseña").value;
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("contraseña", contra);
});


const regis = document.getElementById("bot-registrarse");
regis.addEventListener("click", () => {
    window.location.href = "../registrarse 1 3.0/index.html";
} );