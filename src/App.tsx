// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductCatalog from './pages/ProductCatalog'; // Corregido el nombre del componente
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {/* ¡CAMBIO AQUÍ! Se usa el componente <BrowserRouter> en lugar de <Router>. */}
        <BrowserRouter>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ProductCatalog />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
