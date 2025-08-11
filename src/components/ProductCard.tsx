import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/Products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity: 1 } });
  };

  return (
    <div className="card h-100 shadow-sm product-card">
      <Link to={`/producto/${product.id}`} className="text-decoration-none">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-muted mb-2">
          {product.category} {product.brand && `(${product.brand})`}
        </p>
        <div className="d-flex align-items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < product.rating ? '#ffc107' : 'none'}
              stroke={i < product.rating ? '#ffc107' : '#ccc'}
              className="me-1"
            />
          ))}
          <span className="ms-1 text-muted small">({product.reviews} reseñas)</span>
        </div>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="fs-5 fw-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through ms-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/producto/${product.id}`} className="btn btn-outline-primary flex-grow-1">
              Ver Detalles
            </Link>
        
            {product.inStock ? (
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="me-1" />
                Añadir
              </button>
            ) : (
              <span className="btn btn-secondary disabled d-flex align-items-center justify-content-center">
                Agotado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
