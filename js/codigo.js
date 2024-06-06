let unS = new Sistema();
procesarTabla();
document.querySelector("#body").innerHTML = unS.estadoInicial();

function traer()
{
    let nombreCliente = document.querySelector("#slcClientes").value;
    let objetoCliente = unS.devolverPersona(nombreCliente);
    if(objetoCliente !== null)
    {
        document.querySelector("#divCliente").innerHTML = `${objetoCliente.nombre} ${objetoCliente.admin ? "es admin.": "no es admin." } ` 
    }
}


function procesarTabla()
{
    document.querySelector("#divTabla").innerHTML = unS.tabla();
    botones = document.querySelectorAll(".boton");
    for (let index = 0; index < botones.length; index++) {
        botones[index].addEventListener("click",cambiarEstado)
    }
}

function cambiarEstado()
{
   let nombre =  this.getAttribute("data-nombre");
   let unaP = unS.devolverPersona(nombre);
   unaP.alternarAdmin();
   procesarTabla();
}

function ocultarId(nombreDiv)
{
    document.querySelector(nombreDiv).style.display = "none";
}

function mostrarId(nombreDiv)
{
    document.querySelector(nombreDiv).style.display = "block";
}

function ocultarClase(nombreClase)
{
    let elementos = document.querySelectorAll(nombreClase);
    for (let index = 0; index < elementos.length; index++) {
        elementos[index].style.display = "none";
    }
}

function mostrarClase(nombreClase)
{
    let elementos = document.querySelectorAll(nombreClase);
    for (let index = 0; index < elementos.length; index++) {
        elementos[index].style.display = "block";
    }
}