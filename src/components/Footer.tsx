// src/components/Footer.tsx
import React from 'react';
import { Mail, Phone, MapPin, Facebook, X, Instagram, Store } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer-section" className="bg-dark text-light pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-white d-flex align-items-center justify-content-center justify-content-md-start">
              <Store className="me-2" />
              TechStore
            </h5>
            <p style={{ color: 'var(--color-beige)' }}>
              Tu tienda de tecnología de confianza. Los mejores productos 
              con la mejor calidad y precios competitivos.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-white">Enlaces</h5>
            <p><a href="#!" className="footer-link">Sobre Nosotros</a></p>
            <p><a href="#!" className="footer-link">Política de Privacidad</a></p>
            <p><a href="#!" className="footer-link">Términos y Condiciones</a></p>
            <p><a href="#!" className="footer-link">Preguntas Frecuentes</a></p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-white">Contacto</h5>
            <p style={{ color: 'var(--color-beige)' }}><MapPin size={16} className="me-2" /> Av. Principal 123, Ciudad</p>
            <p style={{ color: 'var(--color-beige)' }}><Mail size={16} className="me-2" /> info@techstore.com</p>
            <p style={{ color: 'var(--color-beige)' }}><Phone size={16} className="me-2" /> +593 968 166 5480</p>
          </div>
        </div>

        <hr className="my-3" style={{ borderColor: 'var(--color-medium-brown)' }} />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start" style={{ color: 'var(--color-beige)' }}>
              &copy; 2024 TechStore. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <Facebook size={22} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <X size={22} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
