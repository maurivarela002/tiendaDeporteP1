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
    ocultarClase(".logOut");
    mostrarClase(".login");
    ocultarClase(".cliente");
    ocultarClase(".admin");
}

let persona = {};
function vistaCliente() {
    ocultarClase(".login");
    ocultarClase(".admin");
    mostrarClase(".cliente");
    mostrarClase(".logOut");
    productosDisponibles()
    productosEnOferta()
    misCompras()
}

function vistaAdmin() {
    ocultarClase(".login");
    ocultarClase(".cliente");
    mostrarClase(".admin");
    mostrarClase(".logOut");
    comprasPendientes()
    comprasAprobadas()
    comprasCanceladas()
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

function productosEnOferta() {
    document.querySelector('#prodsEnOferta').innerHTML = unS.productosEnOferta();
    let btnComprarOferta = document.querySelectorAll('.comprarProductosOferta');
    btnComprarOferta.forEach(prod => {
        prod.addEventListener('click', function () {
            let productoId = this.getAttribute('data-id');
            let cantidadInput = this.closest('tr').querySelector('.cantStock').value;
            comprarProductos(productoId, cantidadInput);
        });
    });
}

function misCompras() {
    document.querySelector('#misCompras').innerHTML = unS.misCompras();
    let select = document.querySelectorAll('.filter');
    select.forEach(prod => {
        prod.addEventListener('change', function () {
            const valorSeleccionado = this.value;
            console.log('Valor seleccionado:', valorSeleccionado);
        });
    });

    let btnCancelar = document.querySelectorAll('.cancelarCompra');
    btnCancelar.forEach(prod => {
        prod.addEventListener('click', function () {
            let compraId = this.getAttribute('data-id');
            cancelarProductos(compraId);
        });
    });
}

//admin

function comprasPendientes() {
    document.querySelector('#comprasPendientes').innerHTML = unS.comprasPendientes();
    let btnAprobar = document.querySelectorAll('.aprobarCompra');
    btnAprobar.forEach(prod => {
        prod.addEventListener('click', function () {
            let productoId = this.getAttribute('data-id');
            aprobarCompras(productoId);
        });
    });
}

function comprasAprobadas() {
    document.querySelector('#comprasAprobadas').innerHTML = unS.comprasAprobadas();
}

function comprasCanceladas() {
    document.querySelector('#comprasCanceladas').innerHTML = unS.comprasCanceladas();
}