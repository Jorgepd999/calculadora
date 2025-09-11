const pantalla = document.querySelector('.pantalla');

const botones = document.querySelectorAll(".btn");

const ERROR_MSG = 'ERROR';
const DEFAULT_VALUE = '0';

// Resetea la pantalla

const resetPantalla = () => {
    pantalla.textContent = DEFAULT_VALUE;
};

// Borra el último carácter
const borrarUltimo = () => {
    if (pantalla.textContent.length === 1 || pantalla.textContent === ERROR_MSG) {
        resetPantalla();
    } else {
        pantalla.textContent = pantalla.textContent.slice(0, -1);
    }
};


// Evalúa la expresión de forma segura
const calcularResultado = () => {
    try {
        const resultado = Function(`return ${pantalla.textContent}`)();
        pantalla.textContent = resultado ?? ERROR_MSG;
    } catch {
        pantalla.textContent = ERROR_MSG;
    }
};


// Maneja la entrada de los botones
const manejarEntrada = (valor, id) => {
  switch (id) {
    case 'c':
      resetPantalla();
      break;
    case 'borrar':
      borrarUltimo();
      break;
    case 'igual':
      calcularResultado();
      break;
    default:
      if (pantalla.textContent === DEFAULT_VALUE || pantalla.textContent === ERROR_MSG) {
        pantalla.textContent = valor;
      } else {
        pantalla.textContent += valor;
      }
      break;
  }
};


// Asigna eventos a los botones
botones.forEach(boton => {
  boton.addEventListener('click', () => manejarEntrada(boton.textContent, boton.id));
});



const teclasValidas = ['/', '*', '-', '+', '.', '='];

document.addEventListener('keydown', (event) => {
  const { key } = event;

  // Reiniciar con Escape o "c"
  if (key === 'Escape' || key.toLowerCase() === 'c') {
    manejarEntrada('', 'c');
    return;
  }

  // Borrar con Backspace
  if (key === 'Backspace') {
    manejarEntrada('', 'borrar');
    return;
  }

  // Calcular con Enter o "="
  if (key === 'Enter' || key === '=') {
    manejarEntrada('', 'igual');
    return;
  }

  // Ingresar números (0-9) u operadores válidos
  if (!isNaN(key) || teclasValidas.includes(key)) {
    manejarEntrada(key, '');
  }
});


