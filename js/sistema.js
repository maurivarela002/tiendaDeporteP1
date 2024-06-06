class Sistema {
    constructor() {
        this.personas = [];
        this.compras = [];
        this.precarga();
        this.estadoInicial();
        this.sesionActiva = false
    }

    estadoInicial() {
        ocultarId('prodsDisponibles');
        ocultarId('comprasCliente');
        ocultarId('comprasPendientes');
        ocultarId('comprasAprobadas');
        ocultarId('comprasCanceladas');
        ocultarId('crearProductos');
        ocultarId('adminProds');
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


    personaExiste(nombre) {
        return this.devolverPersona(nombre) !== null;
    }

    AgregarPersona(nombre) {
        let unaPersona = new Persona(nombre);
        if (unaPersona.validar() && !this.personaExiste(nombre)) {
            this.personas.push(unaPersona);
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

    precarga() {
        this.AgregarPersona("Carlos García");
        this.AgregarPersona("Marie Dubois");
        this.AgregarPersona("John Smith");
        this.AgregarPersona("Hans Müller");
        this.AgregarPersona("Ana López");
        this.AgregarPersona("Sophie Martin");
        this.AgregarPersona("James Brown");
        this.AgregarPersona("Fritz Schneider");
        this.AgregarPersona("José González");
        this.AgregarPersona("Lucie Lefevre");
        this.AgregarPersona("William Johnson");
        this.AgregarPersona("Klaus Fischer");
        this.AgregarPersona("Elena Fernández");
        this.AgregarPersona("Emma Bernard");
        this.AgregarPersona("Emily Davis");
        this.AgregarPersona("Heinrich Weber");
        this.AgregarPersona("Pedro Sánchez");
        this.AgregarPersona("Hugo Dubois");
        this.AgregarPersona("Charles Wilson");
        this.AgregarPersona("Erika Wagner");
        this.AgregarPersona("Laura Pérez");
        this.AgregarPersona("Claire Girard");
        this.AgregarPersona("Robert Jones");
        this.AgregarPersona("Anja Hoffmann");
        this.AgregarPersona("Miguel Díaz");
        this.AgregarPersona("Juliette Moreau");
        this.AgregarPersona("Daniel Evans");
        this.AgregarPersona("Ralf Becker");
        this.AgregarPersona("Marta Romero");
        this.AgregarPersona("Amélie Laurent");
        this.AgregarPersona("George Williams");
        this.AgregarPersona("Brigitte Meyer");
        this.AgregarPersona("Juan Torres");
        this.AgregarPersona("Camille Lambert");
        this.AgregarPersona("Edward Taylor");
        this.AgregarPersona("Johanna Schulz");
        this.AgregarPersona("Sofía Ramírez");
        this.AgregarPersona("Élise Dupont");
        this.AgregarPersona("Henry Harris");
        this.AgregarPersona("Ulrich König");
        this.AgregarPersona("Raúl Moreno");
        this.AgregarPersona("Colette Rousseau");
        this.AgregarPersona("Thomas Clark");
        this.AgregarPersona("Sabine Krüger");
        this.AgregarPersona("Paula Vázquez");
        this.AgregarPersona("Charlotte Petit");
        this.AgregarPersona("David Lewis");
        this.AgregarPersona("Günter Bauer");
        this.AgregarPersona("Javier Castillo");
        this.AgregarPersona("Aline Martel");
        this.AgregarPersona("Christopher Hall");
        this.AgregarPersona("Helga Zimmermann");
    }

}