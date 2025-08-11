import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, CreditCard, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  
  // --- ¡NUEVOS ESTADOS PARA EL MODAL DE PAGO! ---
  const [showModal, setShowModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Seleccionar, 2: Formulario, 3: Procesando, 4: Resultado
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  const handleRemoveItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
    }
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleProceedToPayment = () => {
    setShowModal(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep(3); // Muestra "Procesando..."
    
    // Simula una llamada a la API de pago
    setTimeout(() => {
      setPaymentSuccess(true);
      setPaymentStep(4); // Muestra el resultado
      handleClearCart(); // Limpia el carrito si el pago es exitoso
    }, 2500); // Espera 2.5 segundos
  };

  const resetPaymentModal = () => {
    setShowModal(false);
    // Espera a que la animación de cierre del modal termine antes de resetear
    setTimeout(() => {
      setPaymentStep(1);
      setPaymentSuccess(null);
    }, 500);
  };

  const renderPaymentModalContent = () => {
    switch (paymentStep) {
      case 1: // Selección de método de pago
        return (
          <>
            <h5 className="modal-title">Selecciona un Método de Pago</h5>
            <div className="d-grid gap-3 mt-4">
              <button className="btn btn-lg btn-outline-primary d-flex align-items-center justify-content-center" onClick={() => setPaymentStep(2)}>
                <CreditCard className="me-2" /> Tarjeta de Crédito/Débito
              </button>
              <button className="btn btn-lg btn-outline-info" disabled>
                <i>(Próximamente)</i> PayPal
              </button>
            </div>
          </>
        );
      case 2: // Formulario de tarjeta de crédito
        return (
          <form onSubmit={handleProcessPayment}>
            <h5 className="modal-title">Datos de la Tarjeta</h5>
            <div className="mb-3 mt-4">
              <label htmlFor="cardNumber" className="form-label">Número de Tarjeta</label>
              <input type="text" className="form-control" id="cardNumber" placeholder="0000 0000 0000 0000" required />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="expiryDate" className="form-label">Fecha de Vencimiento</label>
                <input type="text" className="form-control" id="expiryDate" placeholder="MM/AA" required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input type="text" className="form-control" id="cvv" placeholder="123" required />
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Pagar ${state.totalAmount.toFixed(2)}
              </button>
            </div>
          </form>
        );
      case 3: // Procesando pago
        return (
          <div className="text-center py-5">
            <Loader2 className="animate-spin text-primary" size={64} />
            <h5 className="mt-3">Procesando pago...</h5>
            <p className="text-muted">Por favor, espera un momento.</p>
          </div>
        );
      case 4: // Resultado del pago
        return (
          <div className="text-center py-5">
            {paymentSuccess ? (
              <>
                <CheckCircle className="text-success mb-3" size={64} />
                <h5 className="text-success">¡Pago Exitoso!</h5>
                <p className="text-muted">Gracias por tu compra. Recibirás una confirmación por correo.</p>
              </>
            ) : (
              <>
                <XCircle className="text-danger mb-3" size={64} />
                <h5 className="text-danger">Pago Fallido</h5>
                <p className="text-muted">Hubo un problema al procesar tu pago. Inténtalo de nuevo.</p>
              </>
            )}
            <button className="btn btn-secondary mt-3" onClick={resetPaymentModal}>Cerrar</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container py-5">
        <h2 className="mb-4 text-center">Tu Carrito de Compras</h2>

        {state.itemCount === 0 ? (
          <div className="text-center py-5">
            <p className="lead">
              {paymentSuccess ? 'Tu compra ha sido completada.' : 'Tu carrito está vacío.'}
            </p>
            <Link to="/productos" className="btn btn-primary">Explorar Productos</Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {state.items.map(item => (
                <div key={item.product.id} className="card mb-3 shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3">
                      <img src={item.product.image} className="img-fluid rounded-start" alt={item.product.name} style={{ height: '120px', objectFit: 'cover', width: '100%' }} />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title mb-1">{item.product.name}</h5>
                            <p className="card-text text-muted small mb-2">{item.product.category}</p>
                            <p className="card-text fw-bold text-primary">${item.product.price.toFixed(2)}</p>
                          </div>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveItem(item.product.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus size={16} />
                          </button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>
                            <Plus size={16} />
                          </button>
                          <span className="ms-auto fw-bold">Total: ${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-4">
                <Link to="/productos" className="btn btn-outline-secondary">Seguir Comprando</Link>
                <button className="btn btn-danger" onClick={handleClearCart}>Vaciar Carrito</button>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm p-4 sticky-top" style={{top: '100px'}}>
                <h4 className="mb-3">Resumen del Pedido</h4>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Subtotal ({state.itemCount} items):
                    <span>${state.totalAmount.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Envío:
                    <span className="text-success">Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center fw-bold fs-5 px-0">
                    Total:
                    <span>${state.totalAmount.toFixed(2)}</span>
                  </li>
                </ul>
                <button className="btn btn-primary btn-lg w-100" onClick={handleProceedToPayment}>
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL DE PAGO --- */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {paymentStep < 3 && (
                <button type="button" className="btn-close" onClick={resetPaymentModal}></button>
              )}
            </div>
            <div className="modal-body">
              {renderPaymentModalContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
