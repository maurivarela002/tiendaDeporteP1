class Productos {
    constructor(id, nombre, precio, stock, oferta = false, estado, desc, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.oferta = oferta;
        this.estado = estado;
        this.desc = desc;
        this.img = img;
    }

    validarProductos() {
        if (this.nombre !== "" && this.desc !== "" && this.img !== "") {
            return true;
        } else {
            return false;
        }
    }

}
