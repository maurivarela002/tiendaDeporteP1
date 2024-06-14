class Compras {
    constructor(idCompra, idC, estado, cant, prods = [], cliente = {}) {
        this.idCompra = idCompra
        this.idCliente = idC;
        this.estado = estado;
        this.cantidad = cant;
        this.misProductos = prods
        this.cliente = cliente
    }


}
