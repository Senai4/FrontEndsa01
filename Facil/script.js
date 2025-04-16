// Seleciona todos os elementos das teclas do piano, controle de volume e botão de ligar/desligar
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      togglePowerButton = document.querySelector("#toggle-power");


// Array que vai guardar as teclas (ex: "a", "s", "d"...)
// Objeto de áudio usado para tocar as notas
// Booleano que controla se o piano está ligado ou desligado
let allKeys = [],
    audio = new Audio(`tunes/a.wav`);
let isPianoOn = false;

// Remove qualquer texto que esteja dentro do botão de ligar/desligar (caso use só ícone)
togglePowerButton.textContent = "";

// Função que toca a nota correspondente à tecla
const playTune = (key) => {
// Atualiza o caminho do áudio com base na tecla
audio.src = `tunes/${key}.wav`;
audio.play();

// Seleciona a tecla clicada para animar visualmente
const clickedKey = document.querySelector(`[data-key="${key}"]`);
clickedKey.classList.add("active");

// Remove a classe de animação após 150ms
setTimeout(() => {
    clickedKey.classList.remove("active");
    }, 150);
};

// Para cada tecla do piano:
pianoKeys.forEach(key => {
    // Armazena a tecla no array allKeys (ex: "a", "s", "d"...)
    allKeys.push(key.dataset.key);
    // Adiciona evento de clique: se o piano estiver ligado, toca a nota
    key.addEventListener("click", () => {
        if (isPianoOn) playTune(key.dataset.key);
    });
});

// Função que ajusta o volume conforme o valor do controle deslizante
const handleVolume = (e) => {
    audio.volume = e.target.value;
};

// Função para alternar o estado do piano (ligado/desligado)
const togglePianoState = () => {
    isPianoOn = !isPianoOn;

    // Altera visualmente o botão com classes CSS "on" e "off"
    togglePowerButton.classList.toggle("on", isPianoOn);
    togglePowerButton.classList.toggle("off", !isPianoOn);
};

// Detecta quando uma tecla do teclado físico é pressionada
const pressedKey = (e) => {
    if (isPianoOn && allKeys.includes(e.key)) {
        playTune(e.key);
    }
};

// Eventos
// Clique no botão de ligar/desligar
togglePowerButton.addEventListener("click", togglePianoState);
// Mudança no controle de volume
volumeSlider.addEventListener("input", handleVolume);
// Pressionar tecla do teclado físico
document.addEventListener("keydown", pressedKey);
