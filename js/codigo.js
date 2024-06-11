let unS = new Sistema();
vistalogin();

document.querySelector('#loginBtn').addEventListener('click', function () {
    event.preventDefault()
    Login()
});

let btnComprar = document.querySelectorAll('.comprarProductos', function () {
    event.preventDefault()
    for (let index = 0; index < btnComprar.length; index++) {
        btnComprar[index].addEventListener('click', comprarProductos);
    }
});

function Login() {
    let userName = document.querySelector("#clientUserName").value.toLowerCase();
    let psswd = document.querySelector("#clientPsswd").value;
    if (unS.hacerLogin(userName, psswd)) {
        vistaCliente();
    } else {
        vistalogin();
    }
}

function vistalogin() {
    document.querySelector("#clientUserName").value = "";
    document.querySelector("#clientPsswd").value = "";

    mostrarClase(".login");
    ocultarClase(".cliente");
    ocultarClase(".admin");
}

function vistaCliente() {
    ocultarClase(".login");
    document.querySelector('#prodsDisponibles').innerHTML = unS.productosDisponibles();
    ocultarClase(".admin");
    mostrarClase(".cliente");
}

function vistaAdmin() {
    ocultarClase(".login");
    mostrarClase(".admin");
    ocultarClase(".cliente");
}

function mostrarId(id) {
    document.querySelector(id).style.display = 'block';
}

function ocultarId(id) {
    document.querySelector(id).style.display = 'none';
}

function mostrarClase(clase) {
    let elementos = document.querySelectorAll(clase);
    elementos.forEach(elemento => {
        elemento.style.display = 'block';
    });
}

function ocultarClase(clase) {
    let elementos = document.querySelectorAll(clase);
    elementos.forEach(elemento => {
        elemento.style.display = 'none';
    });
}


function comprarProductos() {
    console.log('compre');
}