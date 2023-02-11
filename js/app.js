// constructor

function Seguro(marca, year, tipo){
    this.marca = marca,
    this.year = year,
    this.tipo = tipo
}

Seguro.prototype.cotizarSeguro = function(){
    // 1 = 1.15
    // 2 = 1.05
    // 3 = 1.35
    let resultado;
    const base = 2000;
    switch (this.marca) {
        case '1':
            resultado = base * 1.15;
            break;
        case '2':
            resultado = base * 1.05;
            break;
        case '3':
            resultado = base * 1.35;
            break;
        default:
            break;
    }

    // leer el year
    const diferencia = new Date().getFullYear() - this.year;

    // por cada year de antiguedad, el costo reduce 3%
    resultado -= ((diferencia * 3) * resultado) / 100;

    // si el seguro es basico se multiplica por 30%
    // si es completo se multiplica por 50%

    if(this.tipo === 'basico'){
        resultado *= 1.3;
    } else{
        resultado *= 1.5;
    }

    return resultado
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

// muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    
    if(tipo === 'error'){
        div.classList.add('error')
    } else{
        div.classList.add('correcto')
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
    const {marca, year, tipo} = seguro;
    let textoTipo;
    switch (marca) {
        case '1':
            textoTipo = 'Americano';
            break;
        case '2':
            textoTipo = 'Asiatico';
            break;
        case '3':
            textoTipo = 'Europeo';
            break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class='header'>Tu resumen</p>
        <p class='font-bold'>Marca: <span class='font-normal'>${textoTipo}</span></p>
        <p class='font-bold'>Year: <span class='font-normal'>${year}</span></p>
        <p class='font-bold'>Tipo: <span class='font-normal capitalize'>${tipo}</span></p>
        <p class='font-bold'>Total: <span class='font-normal'>$${total}</span></p>
    `
    const resultadoDiv = document.querySelector('#resultado');

    // mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);
}


// instanciar ui
const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones(); // llena el select con los years
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
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando', 'exito');

    // remover div de resultados anteriores
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    // instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // utilizar el proto que va a cotizar
    ui.mostrarResultado(total, seguro);
}