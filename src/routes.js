import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Principal from './pages/Principal';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        <Route 
          path="/principal" 
          element={
            <ProtectedRoute>
              <Principal />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}