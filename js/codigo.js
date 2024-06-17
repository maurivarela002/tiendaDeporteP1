let unS = new Sistema();
vistalogin()

document.querySelector('#loginBtn').addEventListener('click', function () {
    event.preventDefault()
    Login()
});

document.querySelector('#logout').addEventListener('click', function () {
    event.preventDefault()
    LogOut()
});

document.querySelector("#crearProductos").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombreP").value;
    const precio = parseFloat(document.querySelector("#precioP").value);
    const descripcion = document.querySelector("#descripcionP").value;
    const urlImagen = document.querySelector("#urlImagenP").value;
    const stock = parseInt(document.querySelector("#stockP").value);

    crearProductos(nombre, precio, stock, false, "activo", descripcion, urlImagen);
});

document.querySelector('#resumen').addEventListener('click', function () {
    event.preventDefault()
    resumenCompras()
});



function Login() {
    let userName = document.querySelector("#clientUserName").value.toLowerCase();
    let psswd = document.querySelector("#clientPsswd").value;
    if (unS.hacerLogin(userName, psswd)) {
        unS.sesionActiva.admin === true ? vistaAdmin() : vistaCliente();
    } else {
        vistalogin()
    }
}

function LogOut() {
    unS.hacerLogOut()
    unS.sesionActiva === null ? vistalogin() : '';
}

function comprarProductos(idProd, cant) {
    unS.AgregarCompra(parseInt(idProd), 'pendiente', parseInt(cant));
    vistaCliente()
}

function crearProductos(nombre, precio, cantDis, oferta, estado, desc, img) {
    unS.AgregarProducto(unS.idIncremental(), nombre, precio, cantDis, oferta, estado, desc, img);
    vistaAdmin();
}

function cancelarProductos(compId) {
    unS.cancelarCompraById(parseInt(compId))
    vistaCliente()
}

function aprobarCompras(compId) {
    unS.aprobarCompraById(parseInt(compId))
    vistaAdmin()
}

function modificarStock(productoId, nuevoStock) {
    unS.modificarStockById(parseInt(productoId), parseInt(nuevoStock))
}

function modificarEstado(productoId, nuevoEstado) {
    unS.modificarEstadoById(parseInt(productoId), parseInt(nuevoEstado))
}

function modificarOferta(productoId, enOferta) {
    unS.modificarOfertaById(parseInt(productoId), enOferta)
}

function cambiarFiltroCompras(filtroNuevo) {
    document.querySelector('#misCompras').innerHTML = unS.misCompras(filtroNuevo);
    eventosdeMisCompras();
}

function resumenCompras(){
    document.querySelector('#resumenCompras').innerHTML = unS.resumenCompras();
}