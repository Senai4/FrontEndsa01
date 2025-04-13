const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      togglePowerButton = document.querySelector("#toggle-power");

let allKeys = [],
    audio = new Audio(`tunes/a.wav`);
let isPianoOn = false;

// Remover qualquer texto dentro do botão
togglePowerButton.textContent = "";

// Função para tocar nota
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");

    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

// Clicar nas teclas
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (isPianoOn) playTune(key.dataset.key);
    });
});

// Volume
const handleVolume = (e) => {
    audio.volume = e.target.value;
};

// Alternar estado do piano
const togglePianoState = () => {
    isPianoOn = !isPianoOn;

    togglePowerButton.classList.toggle("on", isPianoOn);
    togglePowerButton.classList.toggle("off", !isPianoOn);
};

// Pressionar teclas do teclado
const pressedKey = (e) => {
    if (isPianoOn && allKeys.includes(e.key)) {
        playTune(e.key);
    }
};

// Eventos
togglePowerButton.addEventListener("click", togglePianoState);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
