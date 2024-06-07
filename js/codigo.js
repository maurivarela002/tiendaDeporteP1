let unS = new Sistema();
vistalogin()

document.querySelector("#loginBtn").addEventListener("click", Login);
// document
//     .querySelector("#comprarProducto")
//     .addEventListener("click", comprarProducto);
// document
//     .querySelector("#cancelarCompra")
//     .addEventListener("click", cancelarCompra);
// document
//     .querySelector("#aprobarCompra")
//     .addEventListener("click", aprobarCompra);
// document
//     .querySelector("#crearProducto")
//     .addEventListener("click", crearProducto);
// document
//     .querySelector("#eliminarProducto")
//     .addEventListener("click", eliminarProducto);


function Login() {
    let userName = document.querySelector("#clientUserName").value.toLocaleLowerCase();
    let psswd = document.querySelector("#clientPsswd").value;
    unS.hacerLogin(userName, psswd)
}

//cambia rol de la persona
// function cambiarEstado() {
//     let nombre = this.getAttribute("data-nombre");
//     let unaP = unS.devolverPersona(nombre);
//     unaP.alternarAdmin();
//     procesarTabla();
// }

function vistalogin() {
    document.querySelector("#clientUserName").value = "";
    document.querySelector("#clientPsswd").value = "";

    mostrarId('#login')
    ocultarClase(".cliente");
    ocultarClase(".admin");
}

function vistaCliente() {
    ocultarId('#login')
    mostrarClase(".cliente");
    ocultarClase(".admin");
    document.querySelector('#prodsDisponibles').innerHTML = unS.productosDisponibles()
}

function vistaAdmin() {
    ocultarId('#login')
    mostrarClase(".admin");
    ocultarClase(".cliente");
}