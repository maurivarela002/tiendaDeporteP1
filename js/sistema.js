class Sistema {
    constructor() {
        this.personas = [];
        this.compras = [];
        this.productos = [];
        this.sesionActiva = null
        this.precarga();
    }
    //listo
    hacerLogin(userName, password) {
        if (this.userExiste(userName, password)) {
            console.log("Login exitoso");
            this.sesionActiva = true;
            return true;
        } else {
            console.log("Credenciales inválidas");
            return false;
        }
    }

    //listo
    AgregarPersona(id, nombre, apellido, userName, password, numeroTarjeta, cvc) {
        let unaPersona = new Persona(id, nombre, apellido, userName, password, numeroTarjeta, cvc);
        if (unaPersona.validarPersona() && !this.userNameExiste(userName) &&
            unaPersona.validarPassword() &&
            unaPersona.validarCvc()) {
            this.personas.push(unaPersona);
        }
    }

    //listo
    AgregarProducto(id, nombre, precio, cantDis, oferta, estado, desc, img) {
        let unProducto = new Productos(id, nombre, precio, cantDis, oferta, estado, desc, img);
        if (unProducto.validarProductos() && !isNaN(precio) && precio > 0 && !isNaN(cantDis) && cantDis > 0) {
            this.productos.push(unProducto);
        }
    }

    productosDisponibles() {
        let txtTabla = `<h3>Listado de productos disponibles</h3>`
        txtTabla += `<table style="margin-top: 15px;">
                <thead>
                    <tr>
                        <th>Nombre del producto</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Imagen</th>
                        <th>Cantidad</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody id="productTable">`;

        for (let index = 0; index < this.productos.length; index++) {
            const producto = this.productos[index];
            if (producto.estado === 'activo' && producto.stock > 0) {
                txtTabla += `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.desc}</td>
                    <td>$${producto.precio.toFixed(2)}</td>
                    <td>${producto.stock > 0 ? 'Sí' : 'No'}</td>
                    <td><img src="${producto.img}" alt="${producto.nombre}" style="width: 40px; heigth: 40px;"></td>
                    <td><input type="number" class="cantStock" min="1" max="${producto.stock}"></td>
                    <td><input type="submit" class="comprarProductos" value="Comprar" data-id="${this.productos[index].id}"></input></td>
                </tr>`;
            }
        }
        txtTabla += `</tbody></table>`;
        return txtTabla;
    }

    misCompras() {
        let txtTabla = `<h3>Mis Compras</h3>`;
        txtTabla += `<select id="filter" style="margin-bottom: 30px;">
            <option value="todas">Todas</option>
            <option value="aprobada">Aprobadas</option>
            <option value="cancelada">Canceladas</option>
            <option value="pendiente">Pendientes</option>
        </select>`;
        txtTabla += `<table style="margin-top: 15px;">
                <thead>
                    <tr>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Monto Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="comprasTable">`;

        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            txtTabla += `<tr>
                    <td>${misCompras.misProductos.nombre}</td>
                    <td>${misCompras.cantidad}</td>
                    <td>$${misCompras.cantidad * misCompras.misProductos.precio.toFixed(2)}</td>
                    <td>${misCompras.estado}</td>`
            if (misCompras.estado === 'pendiente') {
                txtTabla += `<td><input type="submit" class="cancelarCompra" value="Cancelar" data-id="${misCompras.idCompra}"></input></td>`
            }
            txtTabla += `</tr>`;
        }
        txtTabla += `</tbody></table>`;
        return txtTabla;
    }

    userNameExiste(userName) {
        for (let i = 0; i < this.personas.length; i++) {
            if (this.personas[i].userName === userName) {
                return true;
            }
        }
        return false;
    }


    userExiste(userName, password) {
        for (let i = 0; i < this.personas.length; i++) {
            if (this.personas[i].userName === userName && this.personas[i].password === password) {
                return true;
            }
        }
        return false;
    }

    devolverPersona(pNombre) {
        let unaPersona = null;
        let indice = 0;
        while (unaPersona === null && indice < this.personas.length) {
            if (this.personas[indice].userName === pNombre) unaPersona = this.personas[indice];
            else indice++;
        }
        return unaPersona;
    }

    AgregarCompra(idCLiente, idProducto, estado, cantidad) {
        let prod = this.encontrarProdById(idProducto);

        let unaCompra = new Compras(this.idIncremental(), idCLiente, estado, cantidad, prod);
        this.compras.push(unaCompra);
        this.agregarCompraACliente(idCLiente, unaCompra)
    }

    agregarCompraACliente(idCliente, arrayCompra) {
        let persona = null;
        for (let i = 0; i < this.personas.length; i++) {
            if (this.personas[i].id === idCliente) {
                this.personas[i].misCompras.push(arrayCompra)
                persona = this.personas[i]
            }
        }
        return persona;
    }

    encontrarProdById(idProd) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === idProd) {
                return this.productos[i]
            }
        }
    }

    precarga() {
        this.AgregarPersona(this.idIncremental(), "Juan", "Pérez", "juanperez", "Passw0rd1", "1234567890123456", '123');
        this.AgregarPersona(this.idIncremental(), "María", "González", "mariagonzalez", "Passw0rd2", "2345678901234567", '234');
        this.AgregarPersona(this.idIncremental(), "Carlos", "Rodríguez", "carlosrodriguez", "Passw0rd3", "3456789012345678", '345');
        this.AgregarPersona(this.idIncremental(), "Ana", "Martínez", "anamartinez", "Passw0rd4", "4567890123456789", '456');
        this.AgregarPersona(this.idIncremental(), "Luis", "García", "luisgarcia", "Passw0rd5", "5678901234567890", '567');
        this.AgregarPersona(this.idIncremental(), "Laura", "Hernández", "laurahernandez", "Passw0rd6", "6789012345678901", '678');
        this.AgregarPersona(this.idIncremental(), "Pedro", "López", "pedrolopez", "Passw0rd7", "7890123456789012", '789');
        this.AgregarPersona(this.idIncremental(), "Elena", "Sánchez", "elenasanchez", "Passw0rd8", "8901234567890123", '890');
        this.AgregarPersona(this.idIncremental(), "Jorge", "Ramírez", "jorgeramirez", "Passw0rd9", "9012345678901234", '901');
        this.AgregarPersona(this.idIncremental(), "Lucía", "Torres", "lucíatorres", "Passw0rd10", "0123456789012345", '312');
        this.AgregarPersona(this.idIncremental(), "Fernando", "Flores", "fernandoflores", "Passw0rd11", "1234567890123451", '123');
        this.AgregarPersona(this.idIncremental(), "Sara", "Rojas", "sararojas", "Passw0rd12", "2345678901234562", '234');
        this.AgregarPersona(this.idIncremental(), "Diego", "Morales", "diegomorales", "Passw0rd13", "3456789012345673", '345');
        this.AgregarPersona(this.idIncremental(), "Valeria", "Ortiz", "valeriaortiz", "Passw0rd14", "4567890123456784", '456');
        this.AgregarPersona(this.idIncremental(), "Miguel", "Jiménez", "migueljimenez", "Passw0rd15", "5678901234567895", '567');

        this.AgregarProducto(this.idIncremental(), "Balón de Baloncesto", 29.99, 40, true, "activo", "Balón oficial de baloncesto tamaño estándar.", "https://img.kwcdn.com/product/fancy/e727fac8-04fc-4c1a-b80c-0f6ac2458736.jpg?imageView2/2/w/650/q/50/format/webp"),
            this.AgregarProducto(this.idIncremental(), "Ropa de Yoga", 39.99, 60, false, "activo", "Conjunto de ropa cómoda para practicar yoga.", "")
        this.AgregarProducto(this.idIncremental(), "Bicicleta de Montaña", 299.99, 20, true, "activo", "Bicicleta diseñada para terrenos difíciles.", ""),
            this.AgregarProducto(this.idIncremental(), "Guantes de Boxeo", 49.99, 25, false, "activo", "Guantes profesionales para entrenamiento de boxeo.", ""),
            this.AgregarProducto(this.idIncremental(), "Tabla de Surf", 199.99, 15, true, "activo", "Tabla de surf resistente y maniobrable.", ""),
            this.AgregarProducto(this.idIncremental(), "Cuerda para Saltar", 9.99, 80, false, "activo", "Cuerda de saltar ajustable para entrenamientos intensivos.", ""),
            this.AgregarProducto(this.idIncremental(), "Pantalones Cortos de Running", 19.99, 70, true, "activo", "Pantalones cortos transpirables para correr.", "p"),
            this.AgregarProducto(this.idIncremental(), "Balón Medicinal", 39.99, 30, false, "pausado", "Balón medicinal para entrenamientos de fuerza y resistencia.", ""),
            this.AgregarProducto(this.idIncremental(), "Calcetines Deportivos", 7.99, 120, false, "pausado", "Calcetines cómodos y transpirables para deportes.", ""),
            this.AgregarProducto(this.idIncremental(), "Gorra de Tenis", 14.99, 50, true, "pausado", "Gorra ajustable para protegerse del sol durante el tenis.", ""),
            this.AgregarProducto(this.idIncremental(), "Mancuernas", 49.99, 45, true, "pausado", "Par de mancuernas para entrenamientos de fuerza.", ""),
            this.AgregarProducto(this.idIncremental(), "Pulsera de Actividad", 79.99, 65, false, "pausado", "Pulsera para monitorear actividad física y salud.", ""),
            this.AgregarProducto(this.idIncremental(), "Botella de Agua Deportiva", 12.99, 90, true, "pausado", "Botella de agua diseñada para deportistas.", ""),
            this.AgregarProducto(this.idIncremental(), "Mochila de Senderismo", 69.99, 25, false, "pausado", "Mochila resistente para excursiones largas.", "")
    }

    idIncremental() {
        if (this.id === undefined) {
            this.id = 1;
        } else {
            this.id++;
        }
        return this.id;
    }

}
