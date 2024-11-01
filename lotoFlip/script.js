let balance = 10000;
let numbers = [];
let boughtNumbers = {};
let prize = 3.50;
let bonusPrize = 5.00;
let cost = 2.50;
let rodadaAtual = 1;
let rodadasParticipadas = 0;
let rodadasMeta = 5;
let premioMissao = 50.00;
let participouNaRodadaAtual = false;

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosLocalStorage();
    generateNumbers();
    updateBalance();
    carregarHistorico();
    mostrarProgressoMissao(); // Atualiza a barra de progresso da missão

    // Adiciona eventos para abrir e fechar o chat
    const chatButton = document.getElementById('chatButton');
    const closeChatButton = document.getElementById('closeChat');
    if (chatButton) chatButton.addEventListener('click', toggleChat);
    if (closeChatButton) closeChatButton.addEventListener('click', fecharChat);
});

// Função para gerar números no painel
function generateNumbers() {
    const numberPanel = document.getElementById('numberPanel');
    numberPanel.innerHTML = '';
    numbers = [];

    for (let i = 1; i <= 100; i++) {
        let numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = i;
        numberElement.onclick = () => buyNumber(i);
        numberPanel.appendChild(numberElement);
        numbers.push(numberElement);
    }
}

// Função para abrir e fechar o chat
function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    if (chatPopup) {
        chatPopup.classList.toggle('show');  // Alterna a classe 'show' para exibir/esconder o chat
    } else {
        console.error("Elemento de chat não encontrado.");
    }
}

// Função para fechar o chat
function fecharChat() {
    const chatPopup = document.getElementById('chatPopup');
    if (chatPopup) chatPopup.classList.remove('show');
}

// Função para comprar um número
function buyNumber(num) {
    if (balance >= cost && !boughtNumbers[num]) {
        boughtNumbers[num] = true;
        numbers[num - 1].classList.add('bought');
        balance -= cost;
        updateComprados();
        updateBalance();

        if (!participouNaRodadaAtual) {
            rodadasParticipadas++;
            participouNaRodadaAtual = true;
            verificarProgressoMissao();  // Verifica e atualiza o progresso da missão
        }

        verificarBotaoSortear(); // Verifica se deve habilitar o botão de sorteio
    } else {
        alert('Saldo insuficiente ou número já comprado.');
    }
}

// Função para verificar e atualizar o progresso da missão
function verificarProgressoMissao() {
    mostrarProgressoMissao();
}

// Função para atualizar a barra de progresso da missão
function mostrarProgressoMissao() {
    const missaoProgresso = document.getElementById('missaoProgresso');
    
    const progresso = (rodadasParticipadas / rodadasMeta) * 100;
    
    missaoProgresso.style.width = `${progresso}%`;
    missaoProgresso.textContent = `${Math.round(progresso)}%`;  // Exibe a porcentagem

    if (progresso >= 100) {
        console.log("Missão concluída!");
    }
}

// Atualiza o saldo
function updateBalance() {
    const balanceElement = document.getElementById('userBalance');
    balanceElement.textContent = balance.toFixed(2) + ' R$';
    salvarDadosLocalStorage();
}

// Função para atualizar números comprados
function updateComprados() {
    const compradosContainer = document.getElementById('comprados');
    compradosContainer.innerHTML = '';

    Object.keys(boughtNumbers).forEach(num => {
        let compradoElement = document.createElement('span');
        compradoElement.textContent = num;
        compradosContainer.appendChild(compradoElement);
    });
    verificarBotaoSortear();
}

// Ativa o botão de sorteio apenas se houver números comprados
function verificarBotaoSortear() {
    const sortearButton = document.querySelector('.sort-button');
    sortearButton.disabled = Object.keys(boughtNumbers).length === 0;
}

// Função para sortear números
function sortearNumeros() {
    if (Object.keys(boughtNumbers).length < 100) {
        alert('É necessário comprar todos os 100 números antes de realizar o sorteio!');
        return;
    }

    let sorteados = [];
    let bonusSorteados = [];
    let ganhos = 0;
    let gastoTotal = Object.keys(boughtNumbers).length * cost;

    while (sorteados.length < 40) {
        let numSorteado = Math.floor(Math.random() * 100) + 1;
        if (!sorteados.includes(numSorteado)) {
            sorteados.push(numSorteado);
            if (boughtNumbers[numSorteado]) {
                ganhos += prize;
            }
        }
    }

    while (bonusSorteados.length < 4) {
        let numBonus = Math.floor(Math.random() * 100) + 1;
        if (!bonusSorteados.includes(numBonus)) {
            bonusSorteados.push(numBonus);
            if (boughtNumbers[numBonus]) {
                ganhos += bonusPrize;
            }
        }
    }

    let lucroBruto = ganhos - gastoTotal;
    balance += ganhos;

    updateBalance();
    mostrarTelaSorteio(sorteados, bonusSorteados);
    atualizarHistorico(rodadaAtual, sorteados, bonusSorteados);
    mostrarResultadoRodada(gastoTotal, ganhos, lucroBruto);
    resetarRodada();
    rodadaAtual++;
}

// Funções para exibir o sorteio e o resultado da rodada
function mostrarTelaSorteio(numeros, numerosBonus) {
    const numerosSorteados = document.getElementById('numerosSorteados');
    const numerosBonusElement = document.getElementById('numerosBonus');

    numerosSorteados.innerHTML = '';
    numerosBonusElement.innerHTML = '';

    numeros.forEach((num, index) => {
        let numeroElement = document.createElement('span');
        numeroElement.textContent = num;
        numeroElement.style.animationDelay = `${index * 0.1}s`;
        numerosSorteados.appendChild(numeroElement);
    });

    numerosBonus.forEach((num, index) => {
        let numeroBonusElement = document.createElement('span');
        numeroBonusElement.textContent = num;
        numeroBonusElement.style.animationDelay = `${index * 0.1}s`;
        numerosBonusElement.appendChild(numeroBonusElement);
    });

    const sorteioTela = document.getElementById('sorteioTela');
    sorteioTela.classList.add('show');
}

// Função para mostrar o resultado da rodada
function mostrarResultadoRodada(gasto, ganho, lucro) {
    const modal = document.getElementById('resultadoRodadaModal');
    const gastosRodada = document.getElementById('gastosRodada');
    const ganhosRodada = document.getElementById('ganhosRodada');
    const lucroRodada = document.getElementById('lucroRodada');

    gastosRodada.textContent = `Valor Gasto na Rodada: R$${gasto.toFixed(2)}`;
    ganhosRodada.textContent = `Valor Ganho na Rodada: R$${ganho.toFixed(2)}`;
    lucroRodada.textContent = lucro >= 0 ? `Lucro: R$${lucro.toFixed(2)}` : `Deslucro: R$${Math.abs(lucro).toFixed(2)}`;
    lucroRodada.style.color = lucro >= 0 ? 'green' : 'red';

    modal.style.display = 'flex';
}

// Função para fechar o modal de sorteio
function fecharTelaSorteio() {
    const sorteioTela = document.getElementById('sorteioTela');
    sorteioTela.classList.remove('show');
}

// Salva dados no LocalStorage
function salvarDadosLocalStorage() {
    localStorage.setItem('saldo', JSON.stringify(balance));
}

// Carrega dados do LocalStorage
function carregarDadosLocalStorage() {
    const saldoSalvo = JSON.parse(localStorage.getItem('saldo'));
    if (saldoSalvo) {
        balance = saldoSalvo;
    }
}