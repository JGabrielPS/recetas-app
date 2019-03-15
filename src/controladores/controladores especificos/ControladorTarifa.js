const ControladorGeneral = require('../controladores generales/ControladorGeneral');
const controladorRecurso = require('./ControladorRecursos');

class ControladorTarifa extends ControladorGeneral{

    constructor () {
        super();
        this.tabla = "tarifa";
    }

    listarTarifas (callback) {
        this.listar(this.buscarTodosRegistros(this._tabla), "", (tarifas) => {
            return callback(tarifas);
        });
    }

    buscarTarifa (id, callback) {
        this.buscar(this.buscarRegistro(this._tabla), id, (tarifa) => {
            return callback(tarifa);
        });
    }

    buscarUltimaTarifa (callback) {
        this.buscar(this.buscarUltimoRegistro(this._tabla), "", (tarifa) => {
            return callback(tarifa);
        });
    }

    guardarTarifa (tarifa, callback) {
        this._query = `INSERT INTO 'tarifa' ('FK_recurso', 'Precio_tarifa') VALUES ($recurso, $precio)`;
        this.guardar(this._query, tarifa, (error) => {
            return callback(error);
        });
    }

    eliminarTarifa (id, callback) {
        this.eliminar(this.eliminarRegistro(this._tabla), id, (error) => {
            return callback(error);
        });
    }

    eliminarTodaTarifa (callback) {
        this.eliminarTodo(this.eliminarTodoRegistros(this._tabla), (error) => {
            return callback(error);
        });
    }

    dibujarTarifa (div, callback) {
        
        this.listarTarifas((tarifas) => {
            tarifas.forEach(tarifa => {
                
                const cRecurso = new controladorRecurso();
                cRecurso.buscarRecurso(tarifa.FK_recurso, (recurso) => {
                    
                    const template = `<div class="alert alert-info" role="alert" id="${recurso.Nombre_recurso}">` +
                                     `${recurso.Nombre_recurso} = ${tarifa.Precio_tarifa}` +
                                     `</div>`;
                    
                    div.innerHTML += template;
                });
            });
        });

        return callback(div);
    }

}

module.exports = ControladorTarifa;