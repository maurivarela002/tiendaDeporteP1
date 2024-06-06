class Persona {
    constructor(nombre, apellido, password, tarjetaCredito, cvc, userName, saldo, admin) {
        this.id = this.idIncremental();
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.tarjetaCredito = tarjetaCredito;
        this.cvc = cvc;
        this.userName = userName;
        this.saldo = 3000;
        this.admin = false;
    }

    idIncremental() {
        if (this.id === "") {
            this.id = 1
        } else {
            this.id = this.id++
        }
        return this.id;
    }

    validarUserName() {
        return this.userName.toLowerCase()
    }

    validarPassword() {
        let pwdValidada = false;

        for (let i = 0; i < this.password.length; i++) {
            let pwd = this.password[i];

            if (this.password.length > 5) {
                if (contarMayusculas(pwd) >= 1 && contarMinusculas(pwd) >= 1 && contarNumeros(pwd) >= 1) {
                    pwdValidada = true;
                }
            }
        }
        return pwdValidada;
    }

    validarCvc() {
        if (this.cvc.length > 3 && !isNaN(this.cvc)) {
            return true;
        } else {
            return false;
        }
    }

    validarPersona() {
        if (this.nombre !== "" && this.apellido !== "" && this.userName !== "" &&
            this.password !== "" && this.tarjetaCredito !== "" && this.cvc !== "") { return true; }
        else { return false; }
    }

}