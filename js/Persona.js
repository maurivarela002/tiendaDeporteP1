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
        let unMayus = false;
        let unMin = false;
        let unNum = false;

        for (let i = 0; i < this.password.length; i++) {
            let pwd = this.password[i];

            if (this.password.length > 5) {
                //Valida si hay alguna mayuscula y si unMayus es false, debido a que cuando encuentre la primera ya seria true y no volveria a entrar
                if (pwd === pwd.toUpperCase() && !unMayus) {
                    unMayus = true;
                }
                //Valida si hay alguna minuscula y si unMin es false, debido a que cuando encuentre la primera ya seria true y no volveria a entrar
                else if (pwd === pwd.toLowerCase() && !unMin) {
                    unMin = true;
                }
                //Valida si hay algun numero y si unNum es false, debido a que cuando encuentre la primera ya seria true y no volveria a entrar
                else if (!isNaN(pwd) && !unNum) {
                    unNum = true;
                }
            }

            if (unMayus && unMin && unNum) {
                pwdValidada = true;
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