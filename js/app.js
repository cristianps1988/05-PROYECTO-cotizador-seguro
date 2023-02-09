// constructor

function Seguro(marca, year, tipo){
    this.marca = marca,
    this.year = year,
    this.tipo = tipo
}

function UI(){};

// llenar las opciones de los years
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones();
});

eventListeners();

function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro(e){
    e.preventDefault();

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        console.log('Falta algo');
    } else{
        console.log('todo en orden');
    }
}