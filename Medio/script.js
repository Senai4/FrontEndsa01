
const $luzesDelCirculo = document

 .querySelectorAll(

  '.luzes-circulo');

let contadorDeLuz = 0;

const mostrarLuz = () => {

 $luzesDelCirculo[contadorDeLuz]

  .className = 'luzes-circulo';

 contadorDeLuz++;

 if (contadorDeLuz > 2)

  contadorDeLuz = 0;

 const luzActual =

  $luzesDelCirculo[

   contadorDeLuz];

 luzActual.classList.add(

  luzActual.getAttribute(

   'color'))

}

setInterval(mostrarLuz, 2000)

        