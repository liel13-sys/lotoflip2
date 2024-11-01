import { logIn } from './auth.js';

// Adiciona um listener para o formulário de login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        const user = await logIn(email, password);
        messageElement.textContent = `Bem-vindo(a), ${user.email}`;

        // Salva o ID do usuário no localStorage
        localStorage.setItem('userId', user.uid); // Supondo que 'user.uid' é o ID do usuário retornado pelo logIn

        // Redireciona para a página principal após o login
        setTimeout(() => {
            window.location.href = "index.html"; // Altere para a URL da sua tela de perfil
        }, 1500);

    } catch (error) {
        messageElement.textContent = `Erro ao entrar: ${error.message}`;
    }
});