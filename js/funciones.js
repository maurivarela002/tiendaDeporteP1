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

function validarFormato(numero) {
    let numeros = numero.split("-");
    if (numero.length === 19 &&
        numeros.length === 4 &&
        esNumero(numeros[0]) &&
        esNumero(numeros[1]) &&
        esNumero(numeros[2]) &&
        esNumero(numeros[3])) {
        return true;
    }
    return false;
}

function esNumero(texto) {
    if (texto.length === 4 && !isNaN(texto)) {
        return true;
    }
    return false;
}

function algoritmoLuhn(pNumero) {
    let suma = 0;
    let contador = 0;
    let i = pNumero.length - 1;
    let num;

    while (i >= 0) {
        num = Number(pNumero.charAt(i));
        if (isNaN(num)) {
            return false;
        }
        if (contador % 2 == 0) {
            num = duplicarPar(num);
        }
        suma += num;
        i--;
        contador++;
    }
    let total = 9 * suma;
    let ultimoDigito = total % 10;

    return ultimoDigito;
}

function duplicarPar(num) {
    num = num * 2;
    if (num > 9) {
        num = 1 + (num % 10);
    }
    return num;
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
    document.querySelector("#crearNombre").value = "";
    document.querySelector("#crearApellido").value = "";
    document.querySelector("#crearUserName").value = "";
    document.querySelector("#crearPasswd").value = "";
    document.querySelector("#crearNroTar").value = "";
    document.querySelector("#crearCVC").value = "";
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
    administrarProductos()
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
    eventosdeMisCompras();
}

function eventosdeMisCompras() {
    let select = document.querySelectorAll('.filter');
    select.forEach(prod => {
        prod.addEventListener('change', function () {
            const valorSeleccionado = this.value;
            cambiarFiltroCompras(valorSeleccionado);
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

function administrarProductos() {
    document.querySelector('#administrarProductos').innerHTML = unS.administrarProductos();

    let editarStock = document.querySelectorAll('.modificarStock');
    let editarEstado = document.querySelectorAll('.modificarEstado');
    let editarOferta = document.querySelectorAll('.modificarOferta');

    editarStock.forEach(input => {
        input.addEventListener('change', function () {
            let productoId = this.getAttribute('data-id');
            let nuevoStock = this.value;
            modificarStock(productoId, nuevoStock);
        });
    });

    editarEstado.forEach(select => {
        select.addEventListener('change', function () {
            let productoId = this.getAttribute('data-id');
            let nuevoEstado = this.value;
            modificarEstado(productoId, nuevoEstado);
        });
    });

    editarOferta.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let productoId = this.getAttribute('data-id');
            let enOferta = this.checked;
            modificarOferta(productoId, enOferta);
        });
    });
}