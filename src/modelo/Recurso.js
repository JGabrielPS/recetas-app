class Recurso {

    constructor (nombre, medida) {
        this.nombre = nombre;
        this.medida = medida ;   
    }

    generarRegistro () {
        
        const registro = {
            $nombre: this._nombre,
            $medida: this._medida
        }

        return registro;
    }

    get nombre () {
        return this._nombre;
    }

    get medida () {
        return this._medida;
    }

    set nombre (nombre) {
        this._nombre = nombre;
    }

    set medida (medida) {
        this._medida = medida;
    }

}

module.exports = Recurso;