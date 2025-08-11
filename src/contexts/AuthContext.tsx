// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la interfaz para el objeto de usuario
// ¡CORRECCIÓN AQUÍ: Añadimos 'id' a la interfaz User!
interface User {
  id: string; // El ID del usuario es ahora requerido
  name: string;
  email: string;
}

// Define la interfaz para el estado de autenticación
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

// Define la interfaz para el contexto de autenticación
interface AuthContextType {
  state: AuthState;
  login: (user: User) => void;
  logout: () => void;
  registerUser: (user: User) => void; // Función para registrar un usuario (si la usas)
}

// Crea el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea el proveedor de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  // Función para iniciar sesión
  const login = (user: User) => {
    setAuthState({
      isLoggedIn: true,
      user: user,
    });
    // Opcional: guardar el usuario en localStorage o sessionStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
    // Opcional: limpiar el usuario de localStorage
    localStorage.removeItem('currentUser');
  };

  // Función para registrar un usuario (ejemplo, puedes adaptarla a tu lógica real)
  const registerUser = (user: User) => {
    // Aquí normalmente integrarías con un backend para guardar el usuario
    // Por ahora, solo lo "registramos" en el estado local y lo logueamos
    setAuthState({
      isLoggedIn: true,
      user: user,
    });
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('Usuario registrado:', user);
  };

  // Valor del contexto
  const contextValue: AuthContextType = {
    state: authState,
    login,
    logout,
    registerUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};