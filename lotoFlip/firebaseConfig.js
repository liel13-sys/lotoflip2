// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCR802fJbDk6pe_Eh49wzkHM215PYVu6kg",
  authDomain: "lottoflip-f4abd.firebaseapp.com",
  projectId: "lottoflip-f4abd",
  storageBucket: "lottoflip-f4abd.appspot.com",
  messagingSenderId: "322656396128",
  appId: "1:322656396128:web:b67e88e5522301b019f405",
  measurementId: "G-GH85SPQ657"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;