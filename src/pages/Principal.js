import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const [userDoc, setUserDoc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docSnap = await getDoc(doc(db, "usuarios", user.uid));
        if (docSnap.exists()) setUserDoc(docSnap.data());
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Minha Conta</h2>
        {userDoc ? (
          <div style={{ textAlign: 'left', margin: '20px 0' }}>
            <p><strong>Nome:</strong> {userDoc.nome}</p>
            <p><strong>Sobrenome:</strong> {userDoc.sobrenome}</p>
            <p><strong>Nascimento:</strong> {userDoc.dataNasc}</p>
          </div>
        ) : <p>Carregando...</p>}
        <button onClick={handleLogout} style={{backgroundColor: '#89cfde'}}>Sair</button>
      </div>
    </div>
  );
}
