import './Navbar.css';
import logo from './mythical_gourmet_nb.png';
import { FaSearch, FaShoppingCart, FaUser, FaTrash, FaMicrophone } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import galletas from '../../pages/Categoria/galletas.jpg';
import manzanas from '../../pages/Categoria/manzanas.jpg';

function Navbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); 
  const [showForgot, setShowForgot] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Popup para eliminar producto
  const [itemToDelete, setItemToDelete] = useState(null); // Producto seleccionado para eliminar

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

   // Función para manejar el clic en "Olvidé mi contraseña"
   const forgotPassword = () => {
    setShowForgot(true);  // Mostrar el formulario de "Forgot Password"
  };

  // Función para regresar al formulario de inicio de sesión
  const goBackToLogin = () => {
    setShowForgot(false);  // Regresar al formulario de login
  };

  useEffect(() => {
    console.log('carga navbar');
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

  const goToProduct = (id)  => {
    console.log('ID: '+id);
    setIsSearchOpen(false);
    navigate(`/producto-info/${id}`);
}

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

  const toggleMic = () => {
    console.log('se activo el mic');
  };


  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === product.id);
  
    if (productInCart) {
      productInCart.quantity += 1; // Si ya está en el carrito, solo aumenta la cantidad
    } else {
      cart.push({ ...product, quantity: 1 }); // Si no está, lo agrega con cantidad 1
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} ha sido agregado al carrito`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setIsSearchOpen(true);
    setSearchTerm(value);
    if (value.length > 0) {
      // Mock search results - replace this with actual search logic
      setSearchResults([
        {
          id: 1,
          image: galletas,
          name: 'Galletas de Estrella de Mar para Sirenas',
          description: 'Galletas crujientes hechas con algas y polvo de perlas, especialmente formuladas para las sirenas amantes de los sabores marinos.',
          price: 25.00,
          discount: 0,
          categoria: 'gourmet',
          subCategoria: 'galletas',
          marca: 'OceanTreats',
          tipoProducto: 'pack'
      },
      {
          id: 2,
          image: manzanas,
          name: 'Manzanas Doradas para Pegasos',
          description: 'Manzanas bañadas en miel dorada, ricas en energía celestial para Pegasos que necesitan volar largas distancias.',
          price: 45.00,
          discount: 5,
          categoria: 'gourmet',
          subCategoria: 'frutas',
          marca: 'SkyFeast',
          tipoProducto: 'bolsa'
      }
        // Add more mock results as needed
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const SearchResults = () => (
    <div className="search-results">

      <div className='left-results'>
        <div className='sugerencias'>
          <h4>Sugerencias</h4>
          <p>Galletas de Estrella</p>
          <p>Manzanas Doradas</p>
          <p>Piedras de Lava</p>
          <p>Hierba Lunar</p>
        </div>
        <div className='marcas-sugeridas'>
          <h4>Marcas Sugeridas</h4>
          <p>OceanTreats</p>
          <p>SkyFeast</p>
          <p>FlameFeast</p>

          
        </div>
      </div>
  
      <div className='resultados-busqueda'>
        <h4>Resultado para {searchTerm}</h4>
        <div className='resultados-items'>
          {searchResults.map((result) => (
            <div key={result.id} className="search-result-item">
              <img className='img-producto' src={result.image} alt={result.name} onClick={() => goToProduct(result.id)}/>
              <div>
                <p>{result.name}</p>
                <p>Precio Online: S/ {result.price.toFixed(2)}</p>
              </div>
              <button className="agregar-btn" onClick={() => addToCart(result)}>AGREGAR</button>
            </div>
          ))}
        </div>
        
        {searchResults.length > 0 &&  (
          <button className="ver-todos-btn">VER LOS {searchResults.length} PRODUCTOS</button>
        )}
      </div>
      
    </div>
  );

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} onClick={goHome} alt="Mythical Gourmet" />
      </div>

      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar alimentos gourmet..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaMicrophone className='mic-icon'  onClick={toggleMic} size={23}/>
        {searchResults.length > 0 && isSearchOpen && <SearchResults />}
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
                <button className="view-cart-btn" onClick={goCarrito}>VER CARRITO</button>
                <button className="view-cart-btn" onClick={goCarrito}>COMPRAR AHORA</button>
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
              showForgot ? (
                // Formulario "Forgot Password"
                <div>
                  <h5>Recuperar Contraseña</h5>
                  <form>
                    <input type="email" placeholder="Ingresa tu correo" required />
                    <button type="submit">Enviar Código</button>
                  </form>
                  <p onClick={goBackToLogin} style={{ cursor: 'pointer', marginTop: '10px' }}>Volver a Iniciar Sesión</p>
                </div> ):( 
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
                  <p onClick={forgotPassword} className='forgot-link'>Olvidé mi contraseña </p>
                  <button type="submit">ENTRAR</button>
                </form>
              </div>
                )
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



