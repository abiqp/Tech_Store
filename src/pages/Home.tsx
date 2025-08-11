// src/pages/Home.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 6);
  const newProducts = products.filter((p) => p.isNew);
  const [email, setEmail] = useState("");

  // --- LÓGICA PARA EL CARRUSEL ---
  // Creamos una estructura de datos donde cada slide contiene 3 productos:
  // el anterior, el actual (centro) y el siguiente.
  const carouselSlides =
    newProducts.length > 0
      ? newProducts.map((_, index) => {
          const prevIndex =
            (index - 1 + newProducts.length) % newProducts.length;
          const nextIndex = (index + 1) % newProducts.length;
          return [
            newProducts[prevIndex],
            newProducts[index],
            newProducts[nextIndex],
          ];
        })
      : [];

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      alert(`¡Gracias por suscribirte con el correo: ${email}!`);
      setEmail("");
    } else {
      alert("Por favor, ingresa un correo electrónico válido.");
    }
  };

  return (
    <>
      {/* --- ESTILOS CSS PARA EL NUEVO CARRUSEL --- */}
      <style>{`
        #novedades-carousel .carousel-inner {
          overflow: visible;
        }

        #novedades-carousel .carousel-item .product-wrapper {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          align-items: center;
        }

        #novedades-carousel .carousel-item .product-card-container {
          transition: transform 0.6s ease, opacity 0.6s ease;
          transform: scale(0.85);
          opacity: 0.6;
        }
        
        /* --- ¡CORRECCIÓN DEL BUG DE TRANSICIÓN! --- */
        /* Mantiene el estilo del elemento central durante la animación de salida */
        #novedades-carousel .carousel-item.active .product-card-container:nth-child(2),
        #novedades-carousel .carousel-item-next .product-card-container:nth-child(2),
        #novedades-carousel .carousel-item-prev .product-card-container:nth-child(2) {
          transform: scale(1);
          opacity: 1;
        }
        
        #novedades-carousel .carousel-control-prev,
        #novedades-carousel .carousel-control-next {
            width: auto;
            background: transparent;
            border: none;
        }
        
        #novedades-carousel .carousel-control-prev {
            left: -25px;
        }

        #novedades-carousel .carousel-control-next {
            right: -25px;
        }

        @media (max-width: 768px) {
            #novedades-carousel .carousel-item .product-card-container:nth-child(1),
            #novedades-carousel .carousel-item .product-card-container:nth-child(3) {
                display: none;
            }
            #novedades-carousel .carousel-control-prev {
                left: -10px;
            }
            #novedades-carousel .carousel-control-next {
                right: -10px;
            }
        }
      `}</style>

      {/* Sección del héroe */}
      <div id="home-top" className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Los Mejores Productos de Tecnología
              </h1>
              <p className="lead mb-4">
                Descubre nuestra selección de productos tecnológicos de última
                generación con la mejor calidad y precios competitivos.
              </p>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Varios dispositivos tecnológicos sobre una mesa"
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de características */}
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <Truck className="text-primary mb-3" size={48} />
                <h5>Envío Gratis</h5>
                <p className="text-muted mb-0">En compras superiores a $100</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <Shield className="text-primary mb-3" size={48} />
                <h5>Garantía Extendida</h5>
                <p className="text-muted mb-0">
                  2 años de garantía en todos los productos
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <Headphones className="text-primary mb-3" size={48} />
                <h5>Soporte 24/7</h5>
                <p className="text-muted mb-0">
                  Atención al cliente las 24 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="novedades-section">
        {carouselSlides.length > 0 && (
          <div className="py-5 bg-white">
            <div className="container position-relative">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3">Novedades</h2>
                <p className="lead text-muted">
                  Descubre nuestros productos más recientes
                </p>
              </div>

              <div
                id="novedades-carousel"
                className="carousel carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="5000"
              >
                <div className="carousel-inner">
                  {carouselSlides.map((slide, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <div className="product-wrapper">
                        {slide.map((product) => (
                          <div
                            className="product-card-container"
                            key={`${index}-${product.id}`}
                          >
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#novedades-carousel"
                  data-bs-slide="prev"
                >
                  <ChevronLeft size={40} className="text-dark" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#novedades-carousel"
                  data-bs-slide="next"
                >
                  <ChevronRight size={40} className="text-dark" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Sección de productos destacados */}
      <div id="featured-products-section" className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Productos Destacados</h2>
          <Link to="/productos" className="btn btn-outline-secondary">
            Ver todos los productos
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Sección de newsletter */}
      <div className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h3 className="mb-3">Mantente Actualizado</h3>
              <p className="mb-0">
                Suscríbete a nuestro newsletter y recibe ofertas exclusivas
              </p>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubscription} className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
