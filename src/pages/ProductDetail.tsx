import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // ¡CORRECCIÓN AQUÍ! Importa Link
import { products } from '../data/products';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const product = products.find(p => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Si el producto no se encuentra, redirige a la página de productos o a una 404
    if (!product) {
      navigate('/productos'); // O a una página de error 404
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido eliminado.</p>
        <Link to="/productos" className="btn btn-primary">Volver a Productos</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    alert(`Se añadieron ${quantity} de "${product.name}" al carrito.`); // Considera usar un modal más amigable
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // ¡CORRECCIÓN AQUÍ! Usamos product.stock para la validación de cantidad
    if (value > 0 && value <= product.stock) { 
      setQuantity(value);
    } else if (value > product.stock) {
      setQuantity(product.stock); // Establece la cantidad máxima al stock disponible
      alert(`Solo hay ${product.stock} unidades de este producto disponibles.`);
    } else {
      setQuantity(1); // Mínimo 1
    }
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
        <ArrowLeft size={18} className="me-2" /> Volver
      </button>

      <div className="row g-5">
        {/* Columna de imágenes */}
        <div className="col-lg-6">
          <div className="main-image-container mb-3">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '500px', objectFit: 'contain', width: '100%' }}
            />
          </div>
          <div className="d-flex gap-2 overflow-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`img-thumbnail cursor-pointer ${selectedImage === index ? 'border border-primary border-3' : ''}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Columna de detalles del producto */}
        <div className="col-lg-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="text-muted mb-2">{product.category} {product.brand && `(${product.brand})`}</p>
          
          <div className="d-flex align-items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < product.rating ? '#ffc107' : 'none'}
                stroke={i < product.rating ? '#ffc107' : '#ccc'}
                className="me-1"
              />
            ))}
            <span className="ms-2 text-muted">({product.reviews} reseñas)</span>
          </div>

          <p className="fs-4 fw-bold text-primary mb-2">${product.price.toFixed(2)}</p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-muted text-decoration-line-through mb-3">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}

          <p className="mb-4">{product.description}</p>

          <h5 className="mb-2">Características Clave:</h5>
          <ul className="list-unstyled mb-4">
            {product.features.map((feature, index) => (
              <li key={index} className="mb-1">
                <span className="badge bg-secondary me-2">✔</span>{feature}
              </li>
            ))}
          </ul>

          {product.color && (
            <p className="mb-2">
              <span className="fw-semibold">Color:</span> {product.color}
            </p>
          )}

          <p className="mb-4">
            <span className="fw-semibold">Disponibilidad:</span>{' '}
            {product.stock > 0 ? ( // ¡CORRECCIÓN AQUÍ! Usamos product.stock
              <span className="text-success">En Stock ({product.stock} unidades)</span>
            ) : (
              <span className="text-danger">Agotado</span>
            )}
          </p>

          <div className="d-flex align-items-center mb-4">
            <label htmlFor="quantityInput" className="form-label me-3 mb-0">Cantidad:</label>
            <input
              type="number"
              id="quantityInput"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stock} // ¡CORRECCIÓN AQUÍ! Usamos product.stock
              style={{ width: '80px' }}
              disabled={product.stock === 0} // Deshabilita si el stock es 0
            />
          </div>

          <button
            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || quantity <= 0} // Deshabilita si el stock es 0 o cantidad <= 0
          >
            <ShoppingCart size={24} className="me-2" />
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;