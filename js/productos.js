class Productos {
    constructor(id, nombre, precio, stock, oferta, estado, desc, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.oferta = false;
        this.estado = estado;
        this.desc = desc;
        this.img = img;
    }

    idIncremental() {
        if (this.id === "") {
            this.id = '' + 1
        } else {
            this.id = this.id++
        }
        return this.id;
    }

    prodcutosDisponibles() {
        if(this.stock > 0 && this.estado === 'activo') return true
    }

    productosEnOfertas() {
        if(this.oferta === true) return true;
    }

}