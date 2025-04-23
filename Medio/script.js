const $luzesDelCirculo = document.querySelectorAll('.luzes-circulo');//seleciona elementos do html

// Sequência desejada: vermelho → verde → amarelo
const ordemDasCores = ['red', 'green', 'yellow'];
let contadorDeLuz = 0;

const mostrarLuz = () => {
  // Remove todas as classes de cor das luzes
  $luzesDelCirculo.forEach(luz => {
    luz.className = 'luzes-circulo';
  });

  // Pega a cor atual da sequência
  const corAtual = ordemDasCores[contadorDeLuz];

  // Encontra o span com o atributo color correspondente
  const luzAtual = Array.from($luzesDelCirculo).find(
    luz => luz.getAttribute('color') === corAtual
  );

  // Adiciona a classe da cor
  if (luzAtual) {
    luzAtual.classList.add(corAtual);
  }

  // Avança para a próxima cor na sequência
  contadorDeLuz = (contadorDeLuz + 1) % ordemDasCores.length;
};

setInterval(mostrarLuz, 2000);//loop infinito
