// main.js
import { signUp } from './auth.js';

document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value; // Obtem o nome completo
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageElement = document.getElementById('message');

  try {
    const user = await signUp(email, password, fullName); // Passa o nome completo
    messageElement.textContent = `Usuário cadastrado com sucesso: ${user.email}`;
    
    // Redireciona para a página principal após o cadastro
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500); // Tempo de espera para o usuário ver a mensagem (1.5 segundos)

  } catch (error) {
    messageElement.textContent = `Erro ao cadastrar: ${error.message}`;
  }
});


document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageElement = document.getElementById('message');

  try {
    const user = await signUp(email, password, fullName);
    messageElement.textContent = `Usuário cadastrado com sucesso: ${user.email}`;
    
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);

  } catch (error) {
    messageElement.textContent = error.message; // Exibe a mensagem de erro personalizada
  }
});