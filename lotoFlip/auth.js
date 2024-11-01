// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import app from './firebaseConfig.js';
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app); // Inicialize o Firestore

// Função para cadastro de usuário
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Atualiza o displayName do usuário
    await updateProfile(userCredential.user, { displayName: displayName });

    // Salva informações adicionais no Firestore
    await setDoc(doc(db, "usuarios", userCredential.user.uid), {
      nome: displayName,
      email: email,
      uid: userCredential.user.uid
    });

    return userCredential.user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.error("Erro ao cadastrar: O e-mail já está em uso.");
      throw new Error("O e-mail já está em uso. Por favor, use outro e-mail ou faça login.");
    } else {
      console.error("Erro ao cadastrar:", error.message);
      throw error;
    }
  }
};

// Função para login de usuário
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao entrar:", error.message);
    throw error;
  }
};