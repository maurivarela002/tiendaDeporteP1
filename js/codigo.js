let unS = new Sistema();
procesarTabla();
//obtener ids de html

document.querySelector("#body").innerHTML = unS.estadoInicial();


function procesarTabla()
{
    document.querySelector("#divTabla").innerHTML = unS.tabla();
    botones = document.querySelectorAll(".boton");
    for (let index = 0; index < botones.length; index++) {
        botones[index].addEventListener("click",cambiarEstado)
    }
}

//cambia rol de la persona
function cambiarEstado()
{
   let nombre =  this.getAttribute("data-nombre");
   let unaP = unS.devolverPersona(nombre);
   unaP.alternarAdmin();
   procesarTabla();
}

