import './Navbar.css';
import logo from './mythical_gourmet_nb.png';
import { FaSearch, FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); 
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Popup para eliminar producto
  const [itemToDelete, setItemToDelete] = useState(null); // Producto seleccionado para eliminar
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
    }
  }, [isCartOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('userSession', 'active');
    setIsLoggedIn(true);
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setIsPopupOpen(false);
    setShowLogoutPopup(false);
    navigate('/');
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsPopupOpen(false);
  };

  const goHome = () => {
    setIsCartOpen(false);
    setIsPopupOpen(false);
    navigate('/');
  };

  const goPerfil = () => {
    setIsCartOpen(false);
    setIsPopupOpen(false);
    navigate('/perfil');
  };

  const goCarrito = () => {
    setIsCartOpen(false);
    setIsPopupOpen(false);
    navigate('/carrito');
  };

  // Abrir el popup para eliminar un producto
  const openDeletePopup = (item) => {
    setItemToDelete(item);
    setShowDeletePopup(true);
  };

  // Confirmar eliminación del producto
  const confirmDeleteItem = () => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));
    localStorage.setItem('cart', JSON.stringify(cartItems.filter((item) => item.id !== itemToDelete.id))); // Actualizar localStorage
    setShowDeletePopup(false);
    setItemToDelete(null);
  };

  const cancelDeleteItem = () => {
    setShowDeletePopup(false);
    setItemToDelete(null);
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} onClick={goHome} alt="Mythical Gourmet" />
      </div>

      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Buscar alimentos gourmet..." />
      </div>

      <div className="navbar-links">
        <div className="navbar-icon" onClick={togglePopup}>
          <FaUser />
          <span>Perfil</span>
        </div>
        <div className="navbar-icon" onClick={toggleCart}>
          <FaShoppingCart />
          <span>Carrito</span>
        </div>
      </div>

      {isCartOpen && (
        <div className="cart-popup-overlay">
          <div className="cart-popup">
            <button className="close-btn" onClick={toggleCart}>×</button>
            <h3>Carrito</h3>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <div className="item-quantity">
                        <button>-</button>
                        <span>{item.quantity}</span>
                        <button>+</button>
                      </div>
                      <p>S/ {item.price * item.quantity}</p>
                    </div>
                    <FaTrash className="delete-icon" onClick={() => openDeletePopup(item)} />
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="cart-summary">
                <p>Subtotal: S/ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                <p>Costo de entrega: GRATIS</p>
                <h4>Total: S/ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
                <button className="view-cart-btn" onClick={goCarrito}>Ver Carrito</button>
              </div>
            )}
            
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div className={`popup ${isPopupOpen ? 'show' : ''}`}>
          <div className="popup-content">
            {isLoggedIn ? (
              <div className='sesion'>
                <h5>Mi Cuenta</h5>
                <p className='pestana-perfil' onClick={goPerfil} style={{ cursor: 'pointer' }}>Mi Perfil</p>
                <p className='pestana-cerrar' onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar Sesión</p>
              </div>
            ) : (
              <div>
                <h5>Iniciar sesión</h5>
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="Ej.: ejemplo@mail.com" required />
                  <input type="password" placeholder="Contraseña" required />
                  <div className="terminos">
                    <input type="checkbox" required /> He leído y acepto los 
                    <a href="/terms">Términos y Condiciones</a>
                  </div>
                  <p>¿Aún no tienes una cuenta? <a href='/registro'>Regístrate</a> </p>
                  <button type="submit">Entrar</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content-p">
            <p>¿Estás seguro de que quieres cerrar sesión?</p>
            <button onClick={confirmLogout}>Sí</button>
            <button onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}

      {/* Popup de confirmación para eliminar producto */}
      {showDeletePopup && (
        <div className="logout-popup">
          <div className="popup-content-p">
            <p>¿Estás seguro de que quieres eliminar este producto del carrito?</p>
            <button onClick={confirmDeleteItem}>Sí</button>
            <button onClick={cancelDeleteItem}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;



