connect2Server();

const iniciar = document.getElementById("bot-iniciar");
iniciar.addEventListener("click", () => {
    window.location.href = "../iniciar sesion/index.html";
});


function guardardata(){
let nombre = document.getElementById("nombre").value;
let contraseña = document.getElementById("contraseña").value;
let mail = document.getElementById("mail").value;

const emailInput = document.getElementById("mail");
            if (!emailInput.validity.valid) {
                alert("Por favor, ingrese un correo electrónico válido.");
                return; // Evitar que el formulario se envíe si el correo no es válido
            }

            if (!nombre || !contraseña || !mail) {
                alert("Por favor, complete todos los campos.");
                return; // Evitar que el formulario se envíe si algún campo está vacío
            } 



let datos = {"nombre":nombre, "contraseña":contraseña, "mail":mail, "nacimiento": "", "perfil": "", "matricula": ""};
localStorage["nombre"] = nombre;
postEvent("registrar", datos, (res) => {

    if(res.repe == true) {
        alert("porfavor ingrese otro mail porque este ya se encuentra registrado");
        return;
    }
    else{
        localStorage["mail"] = mail,

         window.location.href = "../registrarse 2 3.0/index.html";
    }


});




}

let boton = document.getElementById("bot-siguiente");

boton.addEventListener("click", guardardata);

