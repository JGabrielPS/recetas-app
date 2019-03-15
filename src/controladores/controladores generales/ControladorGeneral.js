const SentenciasDB = require('./SentenciasDb');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('prueba.db');
const mls = 100; 

class ControladorGeneral extends SentenciasDB {

    listar(sql, consulta, callback) {

        db.serialize(() => {
            if (consulta === "") {
                db.all(sql, (err, rows) => {
                    setTimeout(function () {
                        //console.log(rows);
                        return callback(rows);
                    }, mls);
                });
            } else {
                db.all(sql, consulta, (err, rows) => {
                    setTimeout(function () {
                        //console.log(consulta);
                        //console.log(rows);
                        return callback(rows);
                    }, mls);
                });
            }
        });
    }

    buscar(sql, consulta, callback) {

        db.serialize(() => {
            if (consulta === "") {
                db.get(sql, (err, row) => {
                    setTimeout(() => {
                        //console.log(row);
                        return callback(row);
                    }, mls);
                });
            } else {
                db.get(sql, consulta, (err, row) => {
                    setTimeout(() => {
                        //console.log(row);
                        return callback(row);
                    }, mls);
                });
            }
        });
    }

    guardar(sql, registro, callback) {

        db.serialize( () => {
            db.run(sql, registro, (err) => {
                setTimeout( () => {
                    return callback(err);
                }, mls);
            });
        });
    }

    eliminar(sql, idRegistro, callback) {
        db.serialize( () =>{
            db.run(sql, idRegistro, (err) => {
                setTimeout( () => {
                    return callback(err);
                }, mls);
            });
        })
    }

    eliminarTodo(sql, callback) {
        db.serialize( () => {
            db.run(sql, (err) => {
                setTimeout( () => {
                    return callback(err);
                }, mls);
            });
        });
    }
}

module.exports = ControladorGeneral;