    // Seleciona todos os elementos com a classe "key" dentro do contêiner ".piano-keys"
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      // Seleciona o controle deslizante de volume (input dentro de .volume-slider)
      volumeSlider = document.querySelector(".volume-slider input"),
      // Seleciona o botão de ligar/desligar o piano (com ID "toggle-power")
      togglePowerButton = document.querySelector("#toggle-power");

// Array que armazenará as teclas do piano 
let allKeys = [],
    // Objeto de áudio que será usado para tocar os sons das notas
    audio = new Audio(`tunes/a.wav`),
    // Variável booleana para controlar se o piano está ligado ou desligado
    isPianoOn = false;

// Remove qualquer texto dentro do botão de ligar/desligar, deixando ele apenas visual 
togglePowerButton.textContent = "";

/* Função responsável por tocar a nota musical correspondente a uma tecla */
const playTune = (key) => {
    // Atualiza o caminho do arquivo de som conforme a tecla clicada 
    audio.src = `tunes/${key}.wav`;
    audio.play(); // Reproduz o áudio

    // Seleciona visualmente a tecla que foi tocada
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    // Adiciona a classe "active" para dar um efeito visual (como se a tecla afundasse)
    clickedKey.classList.add("active");
    
    // Remove a classe "active" após 150 milissegundos para encerrar a animação
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

/* Adiciona eventos de clique para todas as teclas do piano */
pianoKeys.forEach(key => {
    // Adiciona a tecla atual ao array allKeys
    allKeys.push(key.dataset.key);

    // Quando a tecla for clicada e o piano estiver ligado, toca a nota correspondente
    key.addEventListener("click", () => {
        if (isPianoOn) playTune(key.dataset.key);
    });
});

/* Função que ajusta o volume do piano com base no valor do controle deslizante */
const handleVolume = (e) => {
    audio.volume = e.target.value; // Define o volume atual do áudio
};

/* Função que liga ou desliga o piano ao clicar no botão */
const togglePianoState = () => {
    // Inverte o estado atual do piano (de ligado para desligado ou vice-versa)
    isPianoOn = !isPianoOn;

    // Se o piano estiver ligado, adiciona a classe "on" ao botão
    togglePowerButton.classList.toggle("on", isPianoOn);
    // Se estiver desligado, adiciona a classe "off" ao botão
    togglePowerButton.classList.toggle("off", !isPianoOn);
};

/* Função que detecta se uma tecla do teclado físico foi pressionada */
const pressedKey = (e) => {
    // Se o piano estiver ligado e a tecla pressionada estiver no array allKeys, toca a nota
    if (isPianoOn && allKeys.includes(e.key)) {
        playTune(e.key);
    }
};

// ===== Eventos principais do piano ===== //

// Quando o botão de ligar/desligar for clicado, alterna o estado do piano
togglePowerButton.addEventListener("click", togglePianoState);

// Quando o usuário mover o controle de volume, ajusta o volume do áudio
volumeSlider.addEventListener("input", handleVolume);

// Quando o usuário pressionar uma tecla do teclado físico, verifica se deve tocar som
document.addEventListener("keydown", pressedKey);
