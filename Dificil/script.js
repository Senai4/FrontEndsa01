let vezDoJogador = 'X'; // Controla de quem é  a vez no momento
let tabuleiro = ['', '', '', '', '', '', '', '', '']; // Array de 9 posições representado as células
let jogoAtivo = true; // Indica se o jogo ainda está em andamento (evitando jogadas após o fim da partida)

// Função para alternar entre os jogadores
function alternarJogador() {
    vezDoJogador = vezDoJogador === 'X' ? 'O' : 'X';
}

// Função para verificar as possvéis combinações vencedoras
function verificarVencedor() {
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const combinacao of combinacoesVencedoras) { // Caso haja 3 icones iguais em sequencia, retorna qual jogador venceu
        const [a, b, c] = combinacao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return tabuleiro[a]; // Retorna o vencedor (X ou O)
        }
    }
    return null; // Se ainda não houver um vencedor ele retorna null
}

// Função para verificar empate
function verificarEmpate() {
    return !tabuleiro.includes('') && verificarVencedor() === null; // Verifica se todas as células então preenchidas, se não houver uma das posivéis combinações é "Empate"
}

// Função para atualizar o tabuleiro
// Percorre todas as celúlas do tabuleiro e para cada uma, vê se ha um X ou O no array tabuleiro naquela posição
function atualizarTabuleiro() { 
    const cells = document.querySelectorAll('.cell'); // Seleciona os elementos html que tem na class .cell
    cells.forEach((cell, index) => { // Percorre cada célula
        cell.innerHTML = tabuleiro[index] ? `<i class="fas fa-${tabuleiro[index] === 'X' ? 'times' : 'circle'}"></i>` : ''; // Se tiver, mostra o ícone correspondente na tela, se não tiver, deixa em branco
    });
}

// Função para manipular o clique em uma célula
function jogar(event) {
    if (!jogoAtivo) return; // Verifica se o jogo ainda está ativo 

    const index = event.target.getAttribute('data-index') - 1;
    if (tabuleiro[index] !== '') return; // Verifica se a células está vazia

    tabuleiro[index] = vezDoJogador;
    atualizarTabuleiro(); // Atualiza o visual do tabuleiro

    // Verifica se houve uma vitória ou empate
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

    // Caso não haja alterna a vez de jogar e continua o jogo
    alternarJogador();
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', '']; // limpa do tabuleiro deixando todas as células vazias e atualizando o visual no HTML
    atualizarTabuleiro();
    vezDoJogador = 'X'; // Defini que o jogar X começa a nova partida
    jogoAtivo = true; // Marca se o jogo está ativo novamente
    document.getElementById('mensagem').textContent = ''; // limpa a mensagem de resultado do jogo anterior
    document.getElementById('mensagem').classList.remove('mostrar'); // remove a class .mostrar da mensagem para que ela fique oculta novamente 
}

// Exibe a mensagem no centro da tela
function exibirMensagem(texto) {
    const mensagem = document.getElementById('mensagem');// Pega o id="mensagem" 
    mensagem.textContent = texto; // Muda o texto conforma o resultado da partida
    mensagem.classList.add('mostrar'); // Adicione a class  CSS .mostrar para que a mensagem apareça na tela
}

// Configura os eventos
document.querySelectorAll('.cell').forEach(cell => { // Seleciona todas aa células do tabuleiro
    cell.addEventListener('click', jogar); // Adiciona o evento click, quando o jogador clicar em uma células a função Jogar é chamada
});
document.getElementById('reset').addEventListener('click', reiniciarJogo);// Seleciona o botão com id="reset", adicione o evento click que chama a função Reiniciar Jogo

// Inicializa o tabuleiro
atualizarTabuleiro(); // Garante que o tabuleiro esteja limpo e sincronizado com o array tabuleito
