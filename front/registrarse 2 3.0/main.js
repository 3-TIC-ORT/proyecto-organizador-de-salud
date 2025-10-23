

connect2Server();

function enviar(){

let nombre = localStorage["nombre"]
let nacimiento = document.getElementById("nacimiento").value;
let rol = document.getElementById("rol").value;
let matricula = document.getElementById("matricula").value;
let datos = {"nombre":nombre, "nacimiento": nacimiento, "perfil": rol, "matricula": matricula};

postEvent("actualizazr", datos, (respuesta) =>{
    console.log(respuesta);
    if(respuesta.error){
        alert("Error");
    }
    else {
        alert("Su usuario ha sido creado con exito!");
        window.location.href = "../home opciones 4.0/index.html";
    }
  });
}

let boton = document.getElementById("bot-siguiente");
boton.addEventListener("click", enviar);