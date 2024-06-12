class Compras {
    constructor(idCompra, idC, estado, cant, prods = []) {
        this.idCompra = idCompra
        this.idCliente = idC;
        this.estado = estado;
        this.cantidad = cant;
        this.misProductos = prods
    }


}
