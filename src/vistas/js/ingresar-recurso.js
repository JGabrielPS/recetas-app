const { ipcRenderer } = require('electron');
const modelo = require('../../modelo/Recurso');
const conexion = require('../../controladores/controladores especificos/ControladorRecursos');

const form = document.querySelector('form');

form.addEventListener('submit', e => {

    e.preventDefault();

    const nombreRecurso = document.querySelector('#nombreRecurso').value;
    const medidaRecurso = document.querySelector('#medidaRecurso').value;

    const recurso = new modelo(nombreRecurso, medidaRecurso);
    const registro = recurso.generarRegistro();
    
    const controlador = new conexion();
    controlador.guardarRecurso(registro, (error) => {
        if(error){
            alert(error + 'No se pudo guardar el registro');
        }else{
            console.log('Registro guardado');
            ipcRenderer.send('Guardado:recurso');
        }
    });

})