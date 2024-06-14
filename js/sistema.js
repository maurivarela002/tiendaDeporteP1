class Sistema {
    constructor() {
        this.personas = [];
        this.compras = [];
        this.productos = [];
        this.sesionActiva = null;
        this.precarga();
    }
    //listo
    hacerLogin(userName, password) {
        if (this.sesionActiva === null) {
            if (this.userExiste(userName, password)) {
                console.log("Login exitoso");
                this.sesionActiva = this.devolverPersona(userName);
                return true;
            } else {
                console.log("Credenciales inválidas");
                return false;
            }
        }
    }

    hacerLogOut() {
        this.sesionActiva = null;
    }

    //listo
    AgregarPersona(id, nombre, apellido, userName, password, numeroTarjeta, cvc, admin) {
        let unaPersona = new Persona(id, nombre, apellido, userName, password, numeroTarjeta, cvc, admin);
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

    AgregarCompra(idProducto, estado, cantidad) {
        let prod = this.encontrarProdById(idProducto);
        let objCli = {
            "id": this.sesionActiva.id,
            "userName": this.sesionActiva.nombre,
            "saldo": this.sesionActiva.saldo
        };

        let unaCompra = new Compras(this.idIncremental(), this.sesionActiva.id, estado, cantidad, prod, objCli);
        this.compras.push(unaCompra);
        //this.restarSaldo(this.sesionActiva.id, prod.precio, cantidad);
    }

    restarSaldo(idCliente, precio, cantidad) {
        for (let i = 0; i < this.personas.length; i++) {
            if (this.personas[i].id === idCliente) {
                this.personas[i].saldo = this.personas[i].saldo - (precio * cantidad);
                break;
            }
        }
    }

    encontrarProdById(idProd) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === idProd) {
                return this.productos[i]
            }
        }
    }

    cancelarCompraById(idCompra) {
        for (let i = 0; i < this.compras.length; i++) {
            if (this.compras[i].idCompra === idCompra) {
                this.compras[i].estado = 'cancelada';
                break;
            }
        }
    }


    // Dibujo de tablas cliente

    productosDisponibles() {
        let txtTabla = `<h3>Listado de productos disponibles</h3>`

        for (let index = 0; index < this.productos.length; index++) {
            const producto = this.productos[index];
            if (producto.estado === 'activo' && producto.stock > 0) {
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
                txtTabla += `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.desc}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock > 0 ? 'Sí' : 'No'}</td>
                    <td><img src="${producto.img}" alt="${producto.nombre}" style="width: 40px; heigth: 40px;"></td>
                    <td><input type="number" class="cantStock" min="1" max="${producto.stock}" value="1"></td>
                    <td><input type="submit" class="comprarProductos" value="Comprar" data-id="${this.productos[index].id}"></input></td>
                </tr>`;
            }
            txtTabla += `</tbody></table>`;
        }
        return txtTabla;
    }

    productosEnOferta() {
        let txtTablaOferta = `<h3>Listado de productos en oferta</h3>`
        for (let index = 0; index < this.productos.length; index++) {
            const producto = this.productos[index];
            if (producto.oferta) {
                txtTablaOferta += `<table style="margin-top: 15px;">
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
                txtTablaOferta += `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.desc}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock > 0 ? 'Sí' : 'No'}</td>
                    <td><img src="${producto.img}" alt="${producto.nombre}" style="width: 40px; heigth: 40px;"></td>
                    <td><input type="number" class="cantStock" min="1" max="${producto.stock}" value="1"></td>
                    <td><input type="submit" class="comprarProductosOferta" value="Comprar" data-id="${this.productos[index].id}"></input></td>
                </tr>`;
            }
            txtTablaOferta += `</tbody></table>`;
        }
        return txtTablaOferta;
    }

    misCompras() {
        let txtTabla = `<h3>Mis Compras</h3>`;
        txtTabla += `<select class="filter" style="margin-bottom: 30px;">
            <option value="todas" selected>Todas</option>
            <option value="aprobada">Aprobadas</option>
            <option value="cancelada">Canceladas</option>
            <option value="pendiente">Pendientes</option>
        </select>`;
        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            txtTabla += `<table style="margin-top: 15px;">
                <thead>
                    <tr>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Monto Total</th>
                    <th>Estado</th>
                    <th>Oferta</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="comprasTable">`;
            txtTabla += `<tr>
                    <td>${misCompras.misProductos.nombre}</td>
                    <td>${misCompras.cantidad}</td>
                    <td>$${misCompras.cantidad * misCompras.misProductos.precio}</td>
                    <td>${misCompras.estado}</td>
                    <td>${misCompras.misProductos.oferta ? 'En Oferta' : 'Sin oferta'}</td>`
            if (misCompras.estado === 'pendiente') {
                txtTabla += `<td><input type="submit" class="cancelarCompra" value="Cancelar" data-id="${misCompras.idCompra}"></input></td>`
            }
            txtTabla += `</tr>`;

            if (misCompras.estado === 'aprobada') {
                txtTabla += `<p>La cantidad de compras es ${misCompras.cantidad}, y el saldo disponible ${misCompras.cliente.saldo}</p>`
            }
            txtTabla += `</tbody></table>`;
        }
        return txtTabla;
    }


    //Dibujo de tablas admin

    comprasPendientes() {
        let txtTabla = `<h3>Compras Pendientes</h3>`;
        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            txtTabla += `<table style="margin-top: 15px;">
                <thead>
                    <tr>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Monto Total</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="comprasTable">`;
            txtTabla += `<tr>
                    <td>${misCompras.misProductos.nombre}</td>
                    <td>${misCompras.cantidad}</td>
                    <td>$${misCompras.cantidad * misCompras.misProductos.precio}</td>`
            if (misCompras.estado === 'pendiente') {
                txtTabla += `<td><input type="submit" class="aprobarCompra" value="Aprobar" data-id="${misCompras.idCompra}"></input></td>`
            }
            txtTabla += `</tr>`;

            if (misCompras.estado === 'aprobada') {
                txtTabla += `<p>La cantidad de compras es ${misCompras.cantidad}, y el saldo disponible ${misCompras.cliente.saldo}</p>`
            }
            txtTabla += `</tbody></table>`;
        }
        return txtTabla;
    }

    comprasAprobadas() {
        let txtTabla = `<h3>Compras Aprobadas</h3>`;
        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            if(misCompras.estado === '')
            txtTabla += `<table style="margin-top: 15px;">
                <thead>
                    <tr>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Monto Total</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="comprasTable">`;
            txtTabla += `<tr>
                    <td>${misCompras.misProductos.nombre}</td>
                    <td>${misCompras.cantidad}</td>
                    <td>$${misCompras.cantidad * misCompras.misProductos.precio}</td>`
            txtTabla += `</tr>`;

            if (misCompras.estado === 'aprobada') {
                txtTabla += `<p>La cantidad de compras es ${misCompras.cantidad}, y el saldo disponible ${misCompras.cliente.saldo}</p>`
            }
            txtTabla += `</tbody></table>`;
        }
        return txtTabla;
    }

    comprasaCanceladas() {
        let txtTabla = `<h3>Compras Canceladas</h3>`;
        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            txtTabla += `<table style="margin-top: 15px;">
                <thead>
                    <tr>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Monto Total</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="comprasTable">`;
            txtTabla += `<tr>
                    <td>${misCompras.misProductos.nombre}</td>
                    <td>${misCompras.cantidad}</td>
                    <td>$${misCompras.cantidad * misCompras.misProductos.precio}</td>`
            txtTabla += `</tr>`;

            if (misCompras.estado === 'aprobada') {
                txtTabla += `<p>La cantidad de compras es ${misCompras.cantidad}, y el saldo disponible ${misCompras.cliente.saldo}</p>`
            }
            txtTabla += `</tbody></table>`;
        }
        return txtTabla;
    }

    precarga() {
        this.AgregarPersona(this.idIncremental(), "Juan", "Pérez", "juanperez", "Passw0rd1", "1234567890123456", '123', false);
        this.AgregarPersona(this.idIncremental(), "María", "González", "mariagonzalez", "Passw0rd2", "2345678901234567", '234', true);
        this.AgregarPersona(this.idIncremental(), "Carlos", "Rodríguez", "carlosrodriguez", "Passw0rd3", "3456789012345678", '345', false);
        this.AgregarPersona(this.idIncremental(), "Ana", "Martínez", "anamartinez", "Passw0rd4", "4567890123456789", '456', false);
        this.AgregarPersona(this.idIncremental(), "Luis", "García", "luisgarcia", "Passw0rd5", "5678901234567890", '567', false);
        this.AgregarPersona(this.idIncremental(), "Laura", "Hernández", "laurahernandez", "Passw0rd6", "6789012345678901", '678', false);
        this.AgregarPersona(this.idIncremental(), "Pedro", "López", "pedrolopez", "Passw0rd7", "7890123456789012", '789', false);
        this.AgregarPersona(this.idIncremental(), "Elena", "Sánchez", "elenasanchez", "Passw0rd8", "8901234567890123", '890', false);
        this.AgregarPersona(this.idIncremental(), "Jorge", "Ramírez", "jorgeramirez", "Passw0rd9", "9012345678901234", '901', false);
        this.AgregarPersona(this.idIncremental(), "Lucía", "Torres", "lucíatorres", "Passw0rd10", "0123456789012345", '312', false);
        this.AgregarPersona(this.idIncremental(), "Fernando", "Flores", "fernandoflores", "Passw0rd11", "1234567890123451", '123', false);
        this.AgregarPersona(this.idIncremental(), "Sara", "Rojas", "sararojas", "Passw0rd12", "2345678901234562", '234', false);
        this.AgregarPersona(this.idIncremental(), "Diego", "Morales", "diegomorales", "Passw0rd13", "3456789012345673", '345', false);
        this.AgregarPersona(this.idIncremental(), "Valeria", "Ortiz", "valeriaortiz", "Passw0rd14", "4567890123456784", '456', false);
        this.AgregarPersona(this.idIncremental(), "Miguel", "Jiménez", "migueljimenez", "Passw0rd15", "5678901234567895", '567', false);

        this.AgregarProducto(this.idIncremental(), "Balón de Baloncesto", 29, 40, true, "activo", "Balón oficial de baloncesto tamaño estándar.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Ropa de Yoga", 39, 60, false, "activo", "Conjunto de ropa cómoda para practicar yoga.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Bicicleta de Montaña", 299, 20, true, "activo", "Bicicleta diseñada para terrenos difíciles.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Guantes de Boxeo", 49, 25, false, "activo", "Guantes profesionales para entrenamiento de boxeo.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Tabla de Surf", 199, 15, true, "activo", "Tabla de surf resistente y maniobrable.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Cuerda para Saltar", 9, 80, false, "activo", "Cuerda de saltar ajustable para entrenamientos intensivos.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Pantalones Cortos de Running", 19, 70, true, "activo", "Pantalones cortos transpirables para correr.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Balón Medicinal", 39, 30, false, "pausado", "Balón medicinal para entrenamientos de fuerza y resistencia.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Calcetines Deportivos", 7, 120, false, "pausado", "Calcetines cómodos y transpirables para deportes.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Gorra de Tenis", 14, 50, true, "pausado", "Gorra ajustable para protegerse del sol durante el tenis.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Mancuernas", 49, 45, true, "pendiente", "Par de mancuernas para entrenamientos de fuerza.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Pulsera de Actividad", 79, 65, false, "aprobada", "Pulsera para monitorear actividad física y salud.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Botella de Agua Deportiva", 12, 90, true, "pausado", "Botella de agua diseñada para deportistas.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Mochila de Senderismo", 69, 25, false, "pausado", "Mochila resistente para excursiones largas.", "./assets/baloncestoBall.webp");
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
