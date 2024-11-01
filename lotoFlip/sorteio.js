let usuarios = {}; // { nome: { rodadas: 0, qualificado: false } }
let rodadas = 0;
const metaRodadas = 5;
const premio = 50;

// Função para atualizar a interface
function atualizarInterface() {
    document.getElementById('rodadas-realizadas').textContent = rodadas;
    
    const usuariosList = document.getElementById('usuarios-list');
    usuariosList.innerHTML = '';
    
    for (const [nome, info] of Object.entries(usuarios)) {
        if (info.qualificado) {
            const p = document.createElement('p');
            p.textContent = `${nome} - Rodadas: ${info.rodadas}`;
            usuariosList.appendChild(p);
        }
    }
}

// Função para adicionar um usuário e atualizar sua participação
function adicionarUsuario(nome) {
    if (!usuarios[nome]) {
        usuarios[nome] = { rodadas: 0, qualificado: false };
    }
    usuarios[nome].rodadas += 1;
    
    if (usuarios[nome].rodadas >= metaRodadas) {
        usuarios[nome].qualificado = true;
    }
    
    atualizarInterface();
}

// Função para realizar o sorteio
function sortear() {
    const qualificados = Object.entries(usuarios)
        .filter(([_, info]) => info.qualificado)
        .map(([nome, _]) => nome);
    
    if (qualificados.length === 0) {
        alert('Nenhum usuário qualificado para o sorteio.');
        return;
    }
    
    const vencedor = qualificados[Math.floor(Math.random() * qualificados.length)];
    
    alert(`Parabéns ${vencedor}! Você ganhou R$50.`);
    
    // Atualizar saldo e limpar histórico
    usuarios[vencedor].rodadas = 0;
    usuarios[vencedor].qualificado = false;
    
    rodadas = 0; // Resetar rodadas
    atualizarInterface();
}

// Função para atualizar a contagem de rodadas
function atualizarRodadas() {
    rodadas += 1;
    
    // Verifica se alguém atingiu a meta
    for (const [nome, info] of Object.entries(usuarios)) {
        if (info.rodadas >= metaRodadas) {
            info.qualificado = true;
        }
    }
    
    atualizarInterface();
}

// Simular a participação de usuários e rodadas
adicionarUsuario('João');
adicionarUsuario('Maria');
adicionarUsuario('Pedro');
adicionarUsuario('Ana');

// Simular rodadas
for (let i = 0; i < metaRodadas; i++) {
    atualizarRodadas();
}