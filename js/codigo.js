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

function cancelarProductos(compId) {
    unS.cancelarCompraById(parseInt(compId))
    vistaCliente()
}

function aprobarCompras(compId) {
    unS.aprobarCompraById(parseInt(compId))
    vistaAdmin()
}

