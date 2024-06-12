function esMayuscula(letra) {
    return letra >= "A" && letra <= "Z";
}

function esMinuscula(letra) {
    return letra >= "a" && letra <= "z";
}


function esSimboloNumerico(numero) {
    return numero >= "0" && numero <= "9";
}

function contarMayusculas(texto) {
    let contador = 0;
    for (let index = 0; index < texto.length; index++) {
        let letra = texto[index];
        if (esMayuscula(letra)) {
            contador++;
        }
    }
    return contador;
}

function contarMinusculas(texto) {
    let contador = 0;
    for (let index = 0; index < texto.length; index++) {
        let letra = texto[index];
        if (esMinuscula(letra)) {
            contador++;
        }
    }
    return contador;
}

function contarNumeros(texto) {
    let contador = 0;
    for (let index = 0; index < texto.length; index++) {
        let numero = texto[index];
        if (esSimboloNumerico(numero)) {
            contador++;
        }
    }
    return contador;
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

function vistalogin() {
    document.querySelector("#clientUserName").value = "";
    document.querySelector("#clientPsswd").value = "";
    mostrarClase(".login");
    ocultarClase(".cliente");
    // ocultarClase(".admin");
}
let persona = {};
function vistaCliente() {
    ocultarClase(".login");
    // ocultarClase(".admin");
    mostrarClase(".cliente");
    productosDisponibles()
    misCompras()
}

function vistaAdmin() {
    ocultarClase(".login");
    // mostrarClase(".admin");
    ocultarClase(".cliente");
}

function productosDisponibles() {
    document.querySelector('#prodsDisponibles').innerHTML = unS.productosDisponibles();
    let btnComprar = document.querySelectorAll('.comprarProductos');
    btnComprar.forEach(prod => {
        prod.addEventListener('click', function () {
            let productoId = this.getAttribute('data-id');
            let cantidadInput = this.closest('tr').querySelector('.cantStock').value;

            comprarProductos(productoId, cantidadInput);
        });
    });
}