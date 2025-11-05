

connect2Server();

function enviar(){

let nombre = localStorage["nombre"]
let nacimiento = document.getElementById("nacimiento").value;
let perfil = document.getElementById("perfil").value;
let matricula = document.getElementById("matricula").value;
let datos2 = {"nombre":nombre, "nacimiento": nacimiento, "perfil": perfil, "matricula": matricula};

postEvent("actualizar", datos2, (respuesta) =>{
    console.log(respuesta);
    if(respuesta.msg == false){
        alert("Error");
    }
    else {
        if(respuesta.msg == true && perfil == "Paciente"){
        window.location.href = "../home opciones 4.0/index.html";
        alert("Su usuario ha sido creado con exito!");

        }
        else if (respuesta.msg == true && perfil == "Medico"){
            window.location.href = "../home medico/index.html";
            alert("Su usuario ha sido creado con exito!");
        }
        }
        
    }
)};


let boton = document.getElementById("bot-siguiente");
boton.addEventListener("click", enviar);

let volver = document.getElementById("lineaVolver");
volver.addEventListener("click", () => {
    window.location.href = "../registrarse 1 3.0/index.html"
})
