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
                this.sesionActiva = this.devolverPersona(userName);
                return true;
            } else {
                document.querySelector('#credencialInvalida').innerHTML = 'Credenciales inválidas'
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
            unaPersona.validarPassword() && unaPersona.validarTarjeta(numeroTarjeta)
            && unaPersona.validarCvc()) {
            this.personas.push(unaPersona);
            return true
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

    precioProductoById(idProd) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === idProd) {
                return this.productos[i].precio
            }
        }
    }

    //aprobar y cancelar compras
    cancelarCompraById(idCompra) {
        for (let i = 0; i < this.compras.length; i++) {
            if (this.compras[i].idCompra === idCompra) {
                this.compras[i].estado = 'cancelada';
                break;
            }
        }
    }

    aprobarCompraById(idCompra) {
        for (let i = 0; i < this.compras.length; i++) {
            const compra = this.compras[i];
            const producto = compra.misProductos;
            const cliente = compra.cliente;
            if (compra.idCompra === idCompra && compra.estado === 'pendiente') {
                if (producto.estado === 'activo' && cliente.saldo >= (producto.precio * compra.cantidad) && producto.stock >= compra.cantidad) {
                    compra.estado = 'aprobada';
                    producto.stock -= compra.cantidad;
                    cliente.saldo -= (producto.precio * compra.cantidad);

                    if (producto.stock === 0) {
                        producto.estado = 'pausado';
                    }
                } else {
                    compra.estado = 'cancelada';
                }
                break;
            }
        }
    }

    //administracion de productos
    modificarStockById(idProd, stockNuevo) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === idProd) {
                this.productos[i].stock = stockNuevo;
                break;
            }
        }
    }
    modificarEstadoById(idProd, estadoNuevo) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === idProd) {
                this.productos[i].estado = estadoNuevo;
                break;
            }
        }
    }
    modificarOfertaById(idProd, ofertaNueva) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === idProd) {
                this.productos[i].oferta = ofertaNueva;
                break;
            }
        }
    }


    // Dibujo de tablas cliente

    productosDisponibles() {
        let txtTabla = `<h3>Listado de productos disponibles</h3>`;
        txtTabla += `<table style="margin-top: 15px; width: 100%; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Nombre del producto</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Descripción</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Disponible</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Imagen</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Acción</th>
            </tr>
        </thead>
        <tbody id="productTable">`;

        for (let index = 0; index < this.productos.length; index++) {
            const producto = this.productos[index];
            if (producto.estado === 'activo' && producto.stock > 0) {
                txtTabla += `<tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${producto.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${producto.desc}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${producto.precio}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${producto.stock > 0 ? 'Sí' : 'No'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><img src="${producto.img}" alt="${producto.nombre}" style="width: 40px; height: 40px;"></td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><input type="number" class="cantStock" min="1" max="${producto.stock}" value="1"></td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><input type="submit" class="comprarProductos" value="Comprar" data-id="${this.productos[index].id}"></input></td>
                </tr>`;
            }
        }
        txtTabla += `</tbody></table>`;
        return txtTabla;
    }


    productosEnOferta() {
        let txtTablaOferta = `<h3>Listado de productos en oferta</h3>`;
        txtTablaOferta += `<table style="margin-top: 15px; width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nombre del producto</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Descripción</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Disponible</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Imagen</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Acción</th>
                </tr>
            </thead>
            <tbody id="productTable">`;

        for (let index = 0; index < this.productos.length; index++) {
            const producto = this.productos[index];
            if (producto.oferta) {
                txtTablaOferta += `<tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${producto.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${producto.desc}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${producto.precio}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${producto.stock > 0 ? 'Sí' : 'No'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><img src="${producto.img}" alt="${producto.nombre}" style="width: 40px; height: 40px;"></td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><input type="number" class="cantStock" min="1" max="${producto.stock}" value="1"></td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><input type="submit" class="comprarProductosOferta" value="Comprar" data-id="${this.productos[index].id}"></input></td>
                </tr>`;
            }
        }
        txtTablaOferta += `</tbody></table>`;
        return txtTablaOferta;
    }


    misCompras(filtroNuevo = 'todas') {
        let contadorCompras = 1;
        let txtTabla = `<h3>Mis Compras</h3>`;
        txtTabla += `<select class="filter" style="margin-bottom: 30px;">
            <option value="todas" ${filtroNuevo === 'todas' ? 'selected' : ''}>Todas</option>
            <option value="aprobada" ${filtroNuevo === 'aprobada' ? 'selected' : ''}>Aprobadas</option>
            <option value="cancelada" ${filtroNuevo === 'cancelada' ? 'selected' : ''}>Canceladas</option>
            <option value="pendiente" ${filtroNuevo === 'pendiente' ? 'selected' : ''}>Pendientes</option>
        </select>`;
        txtTabla += `<table style="margin-top: 15px; width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nombre del Producto</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Monto Total</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Estado</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Oferta</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Acciones</th>
                </tr>
            </thead>
            <tbody id="comprasTable">`;

        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            if (filtroNuevo === 'todas' || misCompras.estado === filtroNuevo) {
                txtTabla += `<tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.misProductos.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.cantidad}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${misCompras.cantidad * misCompras.misProductos.precio}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.estado}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.misProductos.oferta ? 'En Oferta' : 'Sin oferta'}</td>`;
                if (misCompras.estado === 'pendiente') {
                    txtTabla += `<td style="border: 1px solid #ddd; padding: 8px;"><input type="submit" class="cancelarCompra" value="Cancelar" data-id="${misCompras.idCompra}"></input></td>`;
                } else {
                    txtTabla += `<td style="border: 1px solid #ddd; padding: 8px;"></td>`;
                }
                txtTabla += `</tr>`;

                if (misCompras.estado === 'aprobada') {
                    txtTabla += `<p>La cantidad de compras es ${contadorCompras++}, y el saldo disponible ${misCompras.cliente.saldo}</p>`;
                }
            }
        }
        txtTabla += `</tbody></table>`;
        return txtTabla;
    }

    resumenCompras() {
        let txtResumen = `<h3>Resumen de compras</h3>`;
        let totalesPorProducto = {};
        for (let index = 0; index < this.compras.length; index++) {
            const compra = this.compras[index];
            let productoId = compra.misProductos.id;
            let nombreProducto = compra.misProductos.nombre;
            let cantidad = compra.cantidad;

            if (totalesPorProducto[productoId]) {
                //si existe el prod le suma la cantidad
                totalesPorProducto[productoId].cantidad += cantidad;
            } else {
                //si el prod esta por primera vez le asigna la cantidad actual
                totalesPorProducto[productoId] = {
                    idProd: productoId,
                    nombre: nombreProducto,
                    cantidad: cantidad
                };
            }
        }

        for (let productId in totalesPorProducto) {
            if (totalesPorProducto.hasOwnProperty(productId)) {
                let nombreProducto = totalesPorProducto[productId].nombre;
                let cantidadVendida = totalesPorProducto[productId].cantidad;
                let gananciaTotal = cantidadVendida * this.precioProductoById(totalesPorProducto[productId].idProd);

                txtResumen += `<p>Producto: ${nombreProducto} - Cantidad vendida: ${cantidadVendida} - Ganancia total: ${gananciaTotal}</p>`;
            }
        }

        return txtResumen;
    }


    //Dibujo de tablas admin

    comprasPendientes() {
        let txtTabla = `<h3>Compras Pendientes</h3>`;
        txtTabla += `<table style="margin-top: 15px; width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nombre del Producto</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Monto Total</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Acciones</th>
                </tr>
            </thead>
            <tbody id="comprasTable">`;

        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            if (misCompras.estado === 'pendiente') {
                txtTabla += `<tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.misProductos.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.cantidad}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${misCompras.cantidad * misCompras.misProductos.precio}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><input type="submit" class="aprobarCompra" value="Aprobar" data-id="${misCompras.idCompra}"></input></td>
                </tr>`;
            }
        }
        txtTabla += `</tbody></table>`;
        return txtTabla;
    }


    comprasAprobadas() {
        let txtTabla = `<h3>Compras Aprobadas</h3>`;
        txtTabla += `<table style="margin-top: 15px; width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nombre del Producto</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Monto Total</th>
                </tr>
            </thead>
            <tbody id="comprasTable">`;

        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            if (misCompras.estado === 'aprobada') {
                txtTabla += `<tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.misProductos.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.cantidad}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${misCompras.cantidad * misCompras.misProductos.precio}</td>
                </tr>`;
            }
        }
        txtTabla += `</tbody></table>`;
        return txtTabla;
    }


    comprasCanceladas() {
        let txtTabla = `<h3>Compras Canceladas</h3>`;
        txtTabla += `<table style="margin-top: 15px; width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nombre del Producto</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Monto Total</th>
                </tr>
            </thead>
            <tbody id="comprasTable">`;

        for (let index = 0; index < this.compras.length; index++) {
            const misCompras = this.compras[index];
            if (misCompras.estado === 'cancelada') {
                txtTabla += `<tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.misProductos.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${misCompras.cantidad}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${misCompras.cantidad * misCompras.misProductos.precio}</td>
                </tr>`;
            }
        }
        txtTabla += `</tbody></table>`;
        return txtTabla;
    }


    administrarProductos() {
        let txtTabla = "<h3>Administración de productos</h3>";
        txtTabla += `<table style="margin-top: 15px; width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nombre del Producto</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Descripción</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Stock</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Estado</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Oferta</th>
                </tr>
            </thead>
            <tbody id="productosTable">`;

        for (let index = 0; index < this.productos.length; index++) {
            const producto = this.productos[index];
            txtTabla += `<tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${producto.nombre}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${producto.desc}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${producto.precio}</td>
                <td style="border: 1px solid #ddd; padding: 8px;"><input type="number" value="${producto.stock}" data-id="${producto.id}" class="modificarStock" style="width: 50px;"></td>
                <td style="border: 1px solid #ddd; padding: 8px;">
                    <select data-id="${producto.id}" class="modificarEstado">
                        <option value="activo" ${producto.estado === 'activo' ? 'selected' : ''}>Activo</option>
                        <option value="pausado" ${producto.estado === 'pausado' ? 'selected' : ''}>Pausado</option>
                    </select>
                </td>
                <td style="border: 1px solid #ddd; padding: 8px;"><input type="checkbox" data-id="${producto.id}" class="modificarOferta" ${producto.oferta ? 'checked' : ''}></td>
            </tr>`;
        }

        txtTabla += `</tbody></table>`;
        return txtTabla;
    }


    precarga() {
        this.AgregarPersona(this.idIncremental(), "Juan", "Pérez", "juanperez", "Passw0rd1", "1234-5678-9012-3456", '123', false);
        this.AgregarPersona(this.idIncremental(), "María", "González", "mariagonzalez", "Passw0rd2", "2345-6789-0123-4567", '234', true);

        this.AgregarProducto(this.idIncremental(), "Balón de Baloncesto", 29, 40, true, "activo", "Balón oficial de baloncesto tamaño estándar.", "./assets/baloncestoBall.webp");
        this.AgregarProducto(this.idIncremental(), "Ropa de Yoga", 39, 60, false, "activo", "Conjunto de ropa cómoda para practicar yoga.", "./assets/ropaYoga.jpg");
        this.AgregarProducto(this.idIncremental(), "Bicicleta de Montaña", 299, 20, true, "activo", "Bicicleta diseñada para terrenos difíciles.", "./assets/biciMontania.avif");
        this.AgregarProducto(this.idIncremental(), "Guantes de Boxeo", 49, 25, false, "activo", "Guantes profesionales para entrenamiento de boxeo.", "./assets/guantesBoxeo.webp");
        this.AgregarProducto(this.idIncremental(), "Tabla de Surf", 199, 15, true, "activo", "Tabla de surf resistente y maniobrable.", "./assets/tablasSurf.webp");
        this.AgregarProducto(this.idIncremental(), "Cuerda para Saltar", 9, 80, false, "activo", "Cuerda de saltar ajustable para entrenamientos intensivos.", "./assets/cuerdaSaltar.jfif");
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