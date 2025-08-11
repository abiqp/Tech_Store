// src/pages/Login.tsx (Este código ya es correcto, no necesita cambios si ya lo aplicaste)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const requiredEmail = 'adqpozo0001@gmail.com';
    const requiredName = 'Abigail';
    const requiredPassword = '123456'; // ASUMIMOS que la contraseña es 'Abigail'. ¡Cámbiala si es diferente!

    if (email === requiredEmail && password === requiredPassword) {
      // La corrección de añadir 'id' ya estaba aquí
      login({ id: 'abigail-user-id-001', name: requiredName, email: requiredEmail }); 
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Ingrese el correo electronico y la contraseña correctas.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <p className="text-center mt-3">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;