connect2Server();

const iniciar = document.getElementById("bot-iniciar");
iniciar.addEventListener("click", () => {
    window.location.href = "../iniciar sesion/index.html";
});


function guardardata(){
let nombre = document.getElementById("nombre").value;
let contraseña = document.getElementById("contraseña").value;
let mail = document.getElementById("mail").value;
let datos = {"nombre":nombre, "contraseña":contraseña, "mail":mail, "nacimiento": "", "perfil": "", "matricula": ""};
localStorage["nombre"] = nombre;
postEvent("registrar", datos);
window.location.href = "../registrarse 2 3.0/index.html";

}

let boton = document.getElementById("bot-siguiente");

boton.addEventListener("click", guardardata);

