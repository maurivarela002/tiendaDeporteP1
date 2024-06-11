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