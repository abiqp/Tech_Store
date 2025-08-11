// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Asegúrate de que este import sea correcto

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { registerUser } = useAuth(); // Usamos la función registerUser del contexto

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación básica
    if (!name || !email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Validación de formato de correo simple
    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    // Validación de contraseña (ejemplo: al menos 6 caracteres)
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // En una aplicación real, aquí enviarías los datos a tu backend
      // y el backend te devolvería un ID de usuario.
      // Por ahora, generamos un ID simple.
      const newUserId = `user-${Date.now()}`; // Genera un ID único simple

      registerUser({ id: newUserId, name, email }); // Pasamos el ID al registrar
      navigate('/login'); // Redirige al login después del registro exitoso
      alert('Registro exitoso. ¡Ahora puedes iniciar sesión!'); // Usar un modal en vez de alert en producción
    } catch (err) {
      setError('Error al registrar. Por favor, inténtalo de nuevo.');
      console.error('Error de registro:', err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Registrarse</h2>
        <form onSubmit={handleRegister}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;