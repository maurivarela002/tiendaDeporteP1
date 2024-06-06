function esMayuscula(letra) {
    return letra >= "A" && letra <= "Z";
}

function esMinuscula(letra) {
    return letra >= "a" && letra <= "z";
}


function esSimboloNumerico(numero) {
    return numero >= "0" && numero <= "9";
}

function ocultarId(nombreDiv) {
    document.querySelector(nombreDiv).style.display = "none";
}

function mostrarId(nombreDiv) {
    document.querySelector(nombreDiv).style.display = "block";
}

function ocultarClase(nombreClase) {
    let elementos = document.querySelectorAll(nombreClase);
    for (let index = 0; index < elementos.length; index++) {
        elementos[index].style.display = "none";
    }
}

function mostrarClase(nombreClase) {
    let elementos = document.querySelectorAll(nombreClase);
    for (let index = 0; index < elementos.length; index++) {
        elementos[index].style.display = "block";
    }
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