class Sistema {
    constructor() {
        this.personas = [];
        this.compras = [];
        this.productos = [];
        this.precarga();
        this.estadoInicial();
        this.sesionActiva = null
    }

    estadoInicial() {
        ocultarId('#prodsDisponibles');
        ocultarId('#comprasCliente');
        ocultarId('#comprasPendientes');
        ocultarId('#comprasAprobadas');
        ocultarId('#comprasCanceladas');
        ocultarId('#crearProductos');
        ocultarId('#adminProds');
    }

    //listo
    hacerLogin(userName, password) {
        if (this.validarCredenciales(userName, password)) {
            alert("Login exitoso");
        } else {
            alert("Credenciales inválidas");
        }
    }

    devolverLogin(usr, pwd) {
        let unaPersona = null;
        let indice = 0;
        while (unaPersona === null && indice < this.personas.length) {
            if (this.personas[indice].usr === usr && this.personas[indice].pwd === pwd) unaPersona = this.personas[indice]; else indice++;
        }
        return unaPersona;
    }


    devolverPersona(pNombre) {
        let unaPersona = null;
        let indice = 0;
        while (unaPersona === null && indice < this.personas.length) {
            if (this.personas[indice].nombre === pNombre) unaPersona = this.personas[indice];
            else indice++;
        }
        return unaPersona;
    }

    crearSelectClientes() {
        let slcText = "";
        for (let index = 0; index < this.personas.length; index++) {
            slcText += `<option>
                       ${this.personas[index].nombre}
                       </option>`
        }
        return slcText;
    }

    //listo
    AgregarPersona(nombre, apellido, userName, password, numeroTarjeta, cvc) {
        let unaPersona = new Persona(nombre, apellido, userName, password, numeroTarjeta, cvc);
        if (unaPersona.validarPersona && this.userNameExiste(this.personas, userName)
            && unaPersona.validarPassword && unaPersona.validarTarjeta()
            && unaPersona.validarCvc) {
            this.personas.push(unaPersona);
        }
    }

    //listo
    AgregarProducto(nombre, precio, desc, img, cantDis, estado) {
        let unProducto = new Productos(nombre, precio, desc, img, cantDis, estado);
        if (unProducto.validarProductos && !isNaN(precio) > 0 && !isNaN(cantDis) > 0) {
            this.productos.push(unProducto);
        }
    }

    AgregarCompra(cliente, cantidad) {
        let unaCompra = new Compra(cliente, cantidad);
        // obviamos validar para abreviar
        this.compras.push(unaCompra);
    }

    tabla() {   // el operador del SI y NO es el operador terniario
        let txtTabla = `<table border="1">
                            <tr><th>Nombre</th><th>Status Administrador</th><th>Cambiar Status</th></tr>`;
        for (let i = 0; i < this.personas.length; i++) {
            txtTabla += `<tr>
                            <td>${this.personas[i].nombre}</td>
                            <td>${this.personas[i].admin ? "Si" : "No"}</td> 
                            <td><input type="button" data-nombre="${this.personas[i].nombre}" 
                                 class="boton" value="Cambiar"></td>
                          </tr>`;
        }
        txtTabla += "</table>";
        return txtTabla;
    }


    //VALIDACIONES
    personaExiste(nombre) {
        return this.devolverPersona(nombre) !== null;
    }

    userNameExiste(personas, userName) {
        for (let i = 0; i < personas.length; i++) {
            if (personas[i].userName === userName) {
                return true;
            }
        }
        return false;
    }

    //listo
    validarCredenciales(userName, password) {
        for (let i = 0; i < this.personas.length; i++) {
            let persona = this.personas[i];
            if (persona[2].toLowerCase() === userName.toLowerCase() && persona[3] === password) {
                return true;
            }
        }
        return false;
    }

    precarga() {
        this.AgregarPersona("Juan", "Pérez", "juanperez", "Passw0rd1", "1234567890123456", "123"),
            this.AgregarPersona("María", "González", "mariagonzalez", "Passw0rd2", "2345678901234567", "234"),
            this.AgregarPersona("Carlos", "Rodríguez", "carlosrodriguez", "Passw0rd3", "3456789012345678", "345"),
            this.AgregarPersona("Ana", "Martínez", "anamartinez", "Passw0rd4", "4567890123456789", "456"),
            this.AgregarPersona("Luis", "García", "luisgarcia", "Passw0rd5", "5678901234567890", "567"),
            this.AgregarPersona("Laura", "Hernández", "laurahernandez", "Passw0rd6", "6789012345678901", "678"),
            this.AgregarPersona("Pedro", "López", "pedrolopez", "Passw0rd7", "7890123456789012", "789"),
            this.AgregarPersona("Elena", "Sánchez", "elenasanchez", "Passw0rd8", "8901234567890123", "890"),
            this.AgregarPersona("Jorge", "Ramírez", "jorgeramirez", "Passw0rd9", "9012345678901234", "901"),
            this.AgregarPersona("Lucía", "Torres", "lucíatorres", "Passw0rd10", "0123456789012345", "012"),
            this.AgregarPersona("Fernando", "Flores", "fernandoflores", "Passw0rd11", "1234567890123451", "123"),
            this.AgregarPersona("Sara", "Rojas", "sararojas", "Passw0rd12", "2345678901234562", "234"),
            this.AgregarPersona("Diego", "Morales", "diegomorales", "Passw0rd13", "3456789012345673", "345"),
            this.AgregarPersona("Valeria", "Ortiz", "valeriaortiz", "Passw0rd14", "4567890123456784", "456"),
            this.AgregarPersona("Miguel", "Jiménez", "migueljimenez", "Passw0rd15", "5678901234567895", "567")
    }

}