class Persona {
    constructor(id, nombre, apellido, userName, password, tarjetaCredito, cvc, compras = []) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.tarjetaCredito = tarjetaCredito;
        this.cvc = cvc;
        this.userName = userName;
        this.saldo = 3000;
        this.admin = false;
        this.misCompras = compras
    }

    // validarUserName() {
    //     return this.userName.toLowerCase()
    // }

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

}
