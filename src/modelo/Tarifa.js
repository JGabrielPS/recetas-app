class Tarifa {
    
    constructor (recurso, precio) {
        this.recurso = recurso;
        this.precio = precio;
    }

    generarRegistro () {
        
        const registro = {
            $recurso: this._recurso,
            $precio: this._precio
        }

        return registro;
    }

    get recurso () {
        return this._recurso;
    }

    get precio () {
        return this._precio;
    }

    set recurso (recurso) {
        this._recurso = recurso;
    }

    set precio (precio) {
        this._precio = precio;
    }

}

module.exports = Tarifa;