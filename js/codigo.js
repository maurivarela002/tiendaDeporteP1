let unS = new Sistema();
vistalogin();

document.querySelector('#loginBtn').addEventListener('click', function () {
    event.preventDefault()
    Login()
});

let personaInicio = {};

function Login() {
    let userName = document.querySelector("#clientUserName").value.toLowerCase();
    let psswd = document.querySelector("#clientPsswd").value;
    if (unS.hacerLogin(userName, psswd)) {
        vistaCliente();
        personaInicio = unS.devolverPersona(document.querySelector("#clientUserName").value.toLowerCase())
    } else {
        vistalogin()
    }
}

function comprarProductos(idProd, cant) {
    unS.AgregarCompra(personaInicio.id, parseInt(idProd), 'pendiente', parseInt(cant));
    misCompras()
}

function misCompras() {
    document.querySelector('#misCompras').innerHTML = unS.misCompras();
    let btnCancelar = document.querySelectorAll('.cancelarCompra');
    btnCancelar.forEach(prod => {
        console.log('prod ', prod);
        prod.addEventListener('click', function () {
            let compraId = this.getAttribute('data-id');
            console.log('compraId ', compraId);
        });
    });
}

