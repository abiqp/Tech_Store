import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Store, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../data/products';

const Navbar: React.FC = () => {
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();
  const location = useLocation();

  const filteredCategories = categories.filter(cat => cat !== 'Todos');

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Store className="me-2" size={28} />
          <span className="fw-bold">TechStore</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/productos') ? 'active' : ''}`} to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#featured-products-section">
                Destacados
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#novedades-section">
                Novedades
              </a>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#!"
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Categorias
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                {filteredCategories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      className="dropdown-item" 
                      to={`/productos?category=${category}`}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#footer-section">
                Contacto
              </a>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-2">
            {authState.isLoggedIn ? (
              <>
                <span className="navbar-text text-white me-2 d-none d-lg-inline">
                  ¡Hola, {authState.user?.name}!
                </span>
                <button 
                  onClick={logout} 
                  className="btn btn-outline-light d-flex align-items-center"
                >
                  <LogOut className="me-sm-2" size={20} />
                  <span className="d-none d-sm-inline">Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline-light d-flex align-items-center"
                >
                  <LogIn className="me-sm-2" size={20} />
                  <span className="d-none d-sm-inline">Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary d-flex align-items-center"
                >
                  <UserPlus className="me-sm-2" size={20} />
                  <span className="d-none d-sm-inline">Register</span>
                </Link>
              </>
            )}
            
            <Link 
              to="/carrito" 
              className="btn btn-outline-light position-relative d-flex align-items-center"
            >
              <ShoppingCart className="me-sm-2" size={20} />
              <span className="d-none d-sm-inline">Carrito</span>
              {cartState.itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {cartState.itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
