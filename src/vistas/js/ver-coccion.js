const { ipcRenderer } = require('electron');
const sentencias = require('../controladores/sentenciasDb');
const controlador = require('../controladores/controladorGeneral');
const conexion = new controlador();

const tipoCoccion = document.querySelector('#tipoCoccion');
const tarifas = document.querySelector('#tarifas');

function CalcularConsumoDispositivo(dispositivo, tarifa) {
    const resultado = (Math.round((dispositivo.Consumo * (tarifa.Precio_tarifa * (tarifa.U_tiempo_tarifa / 60))) * 100)) / 100;
    return resultado;
}

function mostrarTarifa(registro) {
    conexion.buscarRegistro(sentencias.buscarRegistro('recurso'), registro.FK_recurso, (recurso) => {
        //console.log(nombreRecurso);
        alerta = `<div class="alert alert-info" role="alert" id="${recurso.Nombre_recurso}">` +
            `${recurso.Nombre_recurso} = ${registro.Precio_tarifa}` +
            `</div>`;
        tarifas.innerHTML += alerta;
    });
}

function mostrarDispositivo(registro) {

    let precioFinal = 0;
    let nombreRecurso = "";
    //console.log(registro);
    conexion.buscarRegistro(sentencias.buscarRegistroTarifa(), registro.FK_recurso, (tarifa) => {
        precioFinal = CalcularConsumoDispositivo(registro, tarifa);

        conexion.buscarRegistro(sentencias.buscarRegistro('recurso'), registro.FK_recurso, (recurso) => {
            nombreRecurso = recurso.Nombre_recurso;

            //console.log(precioFinal, nombreRecurso);
            const template = `<div class="col-xs-4 p-2">
                                <div class="card text-center">
                                    <div class="card-header">
                                        <h5 class="card-title">${registro.Tipo_dispositivo} de ${nombreRecurso}</h5>
                                    </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Valor por Hora</label>
                                    </div>
                                    <div class="form-group">
                                        <label>$${precioFinal}</label>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-danger btn-sm" id="borrarDispositivo" data-id=${registro.Id_dispositivo}>BORRAR</button>
                                </div>
                            </div>
                        </div>`;

            tipoCoccion.innerHTML += template;
        });
    });
}

function borrarDispositivo() {
    const btns = document.querySelectorAll('#borrarDispositivo');
    btns.forEach(btn => {
        btn.addEventListener('click', e => {
    
            const idDispositivo = btn.getAttribute('data-id');
            //console.log(idDispositivo);
            conexion.eliminarRegistro(sentencias.eliminarRegistro("dispositivo"), idDispositivo, (error) => {
                if (error) {
                    alert('Error al eliminar el registro');
                } else {
                    e.target.parentElement.parentElement.parentElement.remove();
                }
            });
        });
    });    
}

document.addEventListener('DOMContentLoaded', () => {
    //Dibujar tarifas
    let alerta = "";

    conexion.buscarTodo(sentencias.buscarTodosRegistros("tarifas"), "", (registros) => {

        registros.forEach(registro => {
            mostrarTarifa(registro);
        });
    });

    conexion.buscarTodo(sentencias.buscarTodosRegistros("dispositivo"), "", (registros) => {
        registros.forEach(registro => {
            mostrarDispositivo(registro);
        });
    });
});

//Opcion para mostrar las tarifas
ipcRenderer.on('rates:show', e => {
    if (tarifas.hidden === true) {
        tarifas.hidden = false;
    } else {
        tarifas.hidden = true;
    }
});

//Tarifa nueva agregada
ipcRenderer.on('Nuevo:tarifa', (e, tarifa) => {
    mostrarTarifa(tarifa);
});

//Dispositivo nuevo agregado
ipcRenderer.on('Nuevo:dispositivo', (e, dispositivo) => {
    mostrarDispositivo(dispositivo);
    setTimeout(() => {
        borrarDispositivo();
    }, 150);
});

//Borrar dispositivos al abrir ventana
setTimeout(() => {
    borrarDispositivo();
}, 150);

//Opcion en menu para eliminar todo
ipcRenderer.on('BorrarTodo:dispositivo', e => {
    conexion.eliminarTodo(sentencias.eliminarTodoTabla('dispositivo'), (error) => {
        if(error){
            console.log('Error al eliminar los registros');
        }else{
            tipoCoccion.innerHTML = '';
        }
    });
});