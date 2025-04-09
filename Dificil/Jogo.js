let vezDoJogador = 'X'; // Começa com o jogador X
let tabuleiro = ['', '', '', '', '', '', '', '', '']; // Representação do tabuleiro
let jogoAtivo = true; // Controla se o jogo ainda está em andamento

// Função para alternar entre os jogadores
function alternarJogador() {
    vezDoJogador = vezDoJogador === 'X' ? 'O' : 'X';
}

// Função para verificar se há um vencedor
function verificarVencedor() {
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return tabuleiro[a]; // Retorna o vencedor (X ou O)
        }
    }
    return null; // Nenhum vencedor ainda
}

// Função para verificar empate
function verificarEmpate() {
    return !tabuleiro.includes('') && verificarVencedor() === null;
}

// Função para atualizar o tabuleiro
function atualizarTabuleiro() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerHTML = tabuleiro[index] ? `<i class="fas fa-${tabuleiro[index] === 'X' ? 'times' : 'circle'}"></i>` : '';
    });
}

// Função para manipular o clique em uma célula
function jogar(event) {
    if (!jogoAtivo) return;

    const index = event.target.getAttribute('data-index') - 1;
    if (tabuleiro[index] !== '') return;

    tabuleiro[index] = vezDoJogador;
    atualizarTabuleiro();

    const vencedor = verificarVencedor();
    if (vencedor) {
        exibirMensagem(`${vencedor} venceu!`);
        jogoAtivo = false;
        return;
    }

    if (verificarEmpate()) {
        exibirMensagem('EMPATE!');
        jogoAtivo = false;
        return;
    }

    alternarJogador();
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    atualizarTabuleiro();
    vezDoJogador = 'X';
    jogoAtivo = true;
    document.getElementById('mensagem').textContent = '';
    document.getElementById('mensagem').classList.remove('mostrar');
}

// Exibe a mensagem no centro da tela
function exibirMensagem(texto) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.classList.add('mostrar');
}

// Configura os eventos
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', jogar);
});
document.getElementById('reset').addEventListener('click', reiniciarJogo);

// Inicializa o tabuleiro
atualizarTabuleiro();
