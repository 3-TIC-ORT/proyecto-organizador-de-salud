

connect2Server();

function enviar(){

let nombre = localStorage["nombre"]
let nacimiento = document.getElementById("nacimiento").value;
let perfil = document.getElementById("perfil").value;
let matricula = document.getElementById("matricula").value;
let datos2 = {"nombre":nombre, "nacimiento": nacimiento, "perfil": perfil, "matricula": matricula};

postEvent("actualizar", datos2, (respuesta) =>{
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