const { ipcRenderer } = require('electron');
const modelo = require('../../modelo/Tarifa');
const conexionTarifa = require('../../controladores/controladores especificos/ControladorTarifa');
const conexionRecurso = require('../../controladores/controladores especificos/ControladorRecursos');
const cRecurso = new conexionRecurso();

const form = document.querySelector('form');
const select = document.querySelector('select');

document.querySelector('DOMContentLoaded', () => {

    cRecurso.listarRecursos((recursos) => {
        recursos.forEach(recurso => {
            console.log(recurso);
            select.innerHTML += `<option value=${recurso.Id_recurso}>${recurso.Nombre_recurso}</option>`;     
        });
    });
});

select.addEventListener('change', () => {

    const tipoRecurso = select.options[select.selectedIndex].text;

    cRecurso.listarRecursos((recursos) => {
        recursos.forEach(recurso => {
            if(tipoRecurso === recurso.Nombre_recurso) {
                document.querySelector('#precioTarifa').placeholder = `Ingrese el valor total por ${recurso.Medida_recurso}`;
            }
        });
    });
    
    document.querySelector('#precioTarifa').hidden = false;
});

form.addEventListener('submit', e =>{
    e.preventDefault();

    const recursoTarifa = document.querySelector('#recursoTarifa').value;
    const precioTarifa = document.querySelector('#precioTarifa').value * 1.21;

    const tarifa = new modelo(recursoTarifa, precioTarifa);
    console.log(tarifa.generarRegistro());
});