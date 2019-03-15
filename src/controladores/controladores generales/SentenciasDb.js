class SentenciasDB {
    
    constructor () {
        this.query = "";
        this.tabla = "";
    }

    buscarTodosRegistros(tabla) {
        return this._query = `SELECT * FROM ${tabla}`;
    }

    buscarRegistro(tabla) {
        return this._query = `SELECT * FROM ${tabla} WHERE Id_${tabla} = ?`;
    }

    buscarUltimoRegistro(tabla) {
        return this._query = `SELECT * FROM ${tabla} ORDER BY Id_${tabla} DESC LIMIT 1`;
    }

    eliminarRegistro(tabla) {
        return this._query = `DELETE FROM ${tabla} WHERE Id_${tabla} = ?`;
    }

    eliminarTodoRegistros(tabla) {
        return this._query = `DELETE FROM ${tabla}`;
    }

    get query () {
        return this._query;
    }

    set query (query) {
        this._query = query;
    }

    get tabla () {
        return this._tabla;
    }

    set tabla (tabla) {
        this._tabla = tabla;
    }

}

module.exports = SentenciasDB;