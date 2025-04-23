// Seleção dos Elementos da Página
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      togglePowerButton = document.querySelector("#toggle-power");


// Declaração de Variáveis
let allKeys = [],
    audio = new Audio(`tunes/a.wav`);
let isPianoOn = false;

// Remover Texto do Botão de Ligar/Desligar
togglePowerButton.textContent = "";

// Função para Tocar a Nota
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

//  Adicionando Eventos de Clique nas Teclas:
pianoKeys.forEach(key => {
    // Armazena a tecla no array allKeys (ex: "a", "s", "d"...)
    allKeys.push(key.dataset.key);
    // Adiciona evento de clique: se o piano estiver ligado, toca a nota
    key.addEventListener("click", () => {
        if (isPianoOn) playTune(key.dataset.key);
    });
});

// Função para Controlar o Volume
const handleVolume = (e) => {
    audio.volume = e.target.value;
};

// Função para Alternar o Estado do Piano (Ligado/Desligado)
const togglePianoState = () => {
    isPianoOn = !isPianoOn;

    // Altera visualmente o botão com classes CSS "on" e "off"
    togglePowerButton.classList.toggle("on", isPianoOn);
    togglePowerButton.classList.toggle("off", !isPianoOn);
};

// Detectando Teclas do Teclado Físico
const pressedKey = (e) => {
    if (isPianoOn && allKeys.includes(e.key)) {
        playTune(e.key);
    }
};

// Eventos
togglePowerButton.addEventListener("click", togglePianoState);
// Mudança no controle de volume
volumeSlider.addEventListener("input", handleVolume);
// Pressionar tecla do teclado físico
document.addEventListener("keydown", pressedKey);
