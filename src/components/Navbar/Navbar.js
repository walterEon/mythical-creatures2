import './Navbar.css';
import logo from './mythical_gourmet_nb.png';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hierba from '../../pages/Categoria/hierba.jpg';
import manzanas from '../../pages/Categoria/manzanas.jpg';

function Navbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
        navigate('/perfil');
    }


  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Mythical Gourmet" />
        </Link>
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar alimentos gourmet..." />
      </div>

      {/* Pestañas de la derecha */}
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

      {/* Popup del carrito */}
      {isCartOpen && (
        <div className="cart-popup-overlay">
          <div className="cart-popup">
            <button className="close-btn" onClick={toggleCart}>×</button>
            <h3>Carrito</h3>
            <div className="cart-items">
              {/* Aquí iterarías sobre los productos en el carrito */}
              <h4>Tienes 2 items</h4>
              <div className="cart-item">
                <img src={manzanas} alt="Producto 1" />
                <div>
                  <p>Manzanas Doradas para Pegasos</p>
                  <div className="item-quantity">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                  <p>S/ 70</p>
                </div>
              </div>
              <div className="cart-item">
                <img src={hierba} alt="Producto 2" />
                <div>
                  <p>Hierba Lunar para Unicornios</p>
                  <div className="item-quantity">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                  <p>S/ 80</p>
                </div>
              </div>
            </div>
            <div className="cart-summary">
              <p>Subtotal: S/ 150</p>
              <p>Costo de entrega: GRATIS</p>
              <h4>Total: S/ 150</h4>
            </div>
            <button className="view-cart-btn">Ver Carrito</button>
          </div>
        </div>
      )}

      {/* Popup para el perfil */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h5>Iniciar sesión</h5>
            <form onSubmit={handleSubmit}>
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
        </div>
      )}
    </div>
  );
}

export default Navbar;

