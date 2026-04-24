import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const traduzirErro = (code) => {
    switch (code) {
      case 'auth/email-already-in-use': return 'E-mail já cadastrado.';
      case 'auth/weak-password': return 'A senha deve ter 6+ caracteres.';
      case 'auth/invalid-email': return 'E-mail inválido.';
      default: return 'Erro no cadastro.';
    }
  };

  const handleCadastro = async () => {
    if(!nome || !email || !senha) return alert("Preencha os campos obrigatórios!");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nome, sobrenome, nascimento: dataNasc
      });
      alert("Sucesso!");
      navigate('/');
    } catch (error) {
      alert(traduzirErro(error.code));
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Criar Conta</h1>
        <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
        <input placeholder="Sobrenome" onChange={e => setSobrenome(e.target.value)} />
        <input type="date" onChange={e => setDataNasc(e.target.value)} />
        <input placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
        <button onClick={handleCadastro}>Cadastrar</button>
        <div className="link-container">
          <Link to="/">Já tem conta? Login</Link>
        </div>
      </div>
    </div>
  );
}