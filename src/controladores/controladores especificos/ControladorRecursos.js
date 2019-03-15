const ControladorGeneral = require('../controladores generales/ControladorGeneral');

class ControladorRecurso extends ControladorGeneral {

    constructor () {
        super();
        this._tabla = "recurso";
    }

    listarRecursos (callback) {
        this.listar(this.buscarTodosRegistros(this._tabla), "", (recursos) => {
            return callback(recursos);
        });
    }

    buscarRecurso (id, callback) {
        this.buscar(this.buscarRegistro(this._tabla), id, (recurso) => {
            return callback(recurso);
        });
    }

    buscarUltimoRecurso (callback) {
        this.buscar(this.buscarUltimoRegistro(this._tabla), "", (recurso) =>{
            return callback(recurso);
        });
    } 

    guardarRecurso (recurso, callback) {
        this._query = `INSERT INTO 'recurso' ('Nombre_recurso', 'Medida_recurso') VALUES ($nombre, $medida)`;
        this.guardar(this._query, recurso, (error) => {
            return callback(error);
        });
    }

    eliminarRecurso (id, callback) {
        this.eliminar(this.eliminarRegistro(this._tabla), id, (error) => {
            return callback(error);
        });
    }

    eliminarTodosRecursos (callback) {
        this.eliminarTodo(this.eliminarTodoRegistros(this._tabla), (error) => {
            return callback(error);
        });
    }

}

module.exports = ControladorRecurso;