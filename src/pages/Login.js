import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const traduzirErro = (code) => {
    switch (code) {
      case 'auth/user-not-found': return 'Usuário não encontrado.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      case 'auth/invalid-email': return 'E-mail inválido.';
      default: return 'Erro ao acessar a conta.';
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/principal');
    } catch (error) {
      alert(traduzirErro(error.code));
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Conecte-se</h1>
        <input 
          type="email" placeholder="E-mail" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Senha" 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button onClick={handleLogin}>Acessar</button>
        <div className="link-container">
          <Link to="/cadastro">Não tem conta? Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}