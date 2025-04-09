// Atribuindo as teclas e os sons
const pianoKeys = {
    'keyC': 'C.mp3',
    'keyCSharp': 'CSharp.mp3',
    'keyD': 'D.mp3',
    'keyDSharp': 'DSharp.mp3',
    'keyE': 'E.mp3',
    'keyF': 'F.mp3',
    'keyFSharp': 'FSharp.mp3',
    'keyG': 'G.mp3',
    'keyGSharp': 'GSharp.mp3',
    'keyA': 'A.mp3',
    'keyASharp': 'ASharp.mp3',
    'keyB': 'B.mp3',
    'keyC2': 'C2.mp3'
  };
  
  // Função para tocar o som da tecla
  function playSound(note) {
    const audio = new Audio(`sounds/${note}`);
    audio.play();
  }
  
  // Função para adicionar o efeito de tecla pressionada
  function addPressedEffect(key) {
    key.classList.add('pressed');
    setTimeout(() => {
      key.classList.remove('pressed');
    }, 200);
  }
  
  // Selecionando todas as teclas do piano
  const keys = document.querySelectorAll('.key');
  
  // Adicionando event listeners para o clique nas teclas
  keys.forEach(key => {
    key.addEventListener('click', () => {
      const note = key.id; // Pega o ID da tecla (ex: keyC, keyDSharp, etc.)
      playSound(pianoKeys[note]); // Toca o som correspondente
      addPressedEffect(key); // Adiciona o efeito visual de pressionamento
    });
  });
  
  // Também podemos adicionar funcionalidade para tocar teclas com o teclado físico
  document.addEventListener('keydown', (event) => {
    const key = document.getElementById(`key${event.key.toUpperCase()}`);
    if (key) {
      playSound(pianoKeys[key.id]);
      addPressedEffect(key);
    }
  });
  