connect2Server();

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

let nombre = document.getElementById("nombre").value;
let contraseña = document.getElementById("contraseña").value;
let mail = document.getElementById("mail").value;
let datos= [nombre, contraseña, mail];

postEvent("iniciarsesion", datos, (respuesta) =>{
    console.log(respuesta);
    if(respuesta.error){
        alert("Error");
    }
    else {
    alert ("Bienvenido")
        window.location.href = "../home opciones 4.0/index.html";
    }
  })
