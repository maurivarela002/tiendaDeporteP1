class Persona {
    constructor(id, nombre, apellido, userName, password, tarjetaCredito, cvc, admin = false) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.tarjetaCredito = tarjetaCredito;
        this.cvc = cvc;
        this.userName = userName;
        this.saldo = 3000;
        this.admin = admin;
    }

    validarPassword() {
        let pwdValidada = false;
        if (this.password.length > 5) {
            if (contarMayusculas(this.password) >= 1 && contarMinusculas(this.password) >= 1 && contarNumeros(this.password) >= 1) {
                pwdValidada = true;
            }
        }
        return pwdValidada;
    }

    validarCvc() {
        if (this.cvc.length === 3 && !isNaN(this.cvc)) {
            return true;
        } else {
            return false;
        }
    }

    validarPersona() {
        if (this.nombre !== "" && this.apellido !== "" && this.userName !== "" &&
            this.password !== "") {
            return true;
        } else {
            return false;
        }
    }

    validarTarjeta() {
        if (!validarFormato(this.tarjetaCredito)) {
            return "El formato de la tarjeta es inválido.";
        }
        let numeroSinGuiones = "";
        let partesTarj = this.tarjetaCredito.split("-");
        for (let i = 0; i < partesTarj.length; i++) {
            numeroSinGuiones += partesTarj[i];
        }

        if (algoritmoLuhn(numeroSinGuiones)) {
            return "La tarjeta de crédito es válida.";
        } else {
            return "La tarjeta de crédito es inválida.";
        }
    }

}
