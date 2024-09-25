import './Carrito.css';
import { useEffect, useState, useRef } from 'react';
import SoundPlayer from '../../components/SoundPlayer/SoundPlayer';
import {FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Carrito() {

    const [cartItems, setCartItems] = useState([]);

    const [showDeletePopup, setShowDeletePopup] = useState(false); // Popup para eliminar producto

    const [itemToDelete, setItemToDelete] = useState(null); // Producto seleccionado para eliminar

    const soundPlayerRef = useRef(null);

    const navigate = useNavigate();

  const playSound = (soundName) => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.playSound(soundName);
    }
  };

    // Abrir el popup para eliminar un producto
  const openDeletePopup = (item) => {
    setItemToDelete(item);
    setShowDeletePopup(true);
  };

  const goComprar = () => {
    navigate('/compra');
  }

    // Confirmar eliminación del producto
  const confirmDeleteItem = () => {
    playSound('deleteSound');
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));
    localStorage.setItem('cart', JSON.stringify(cartItems.filter((item) => item.id !== itemToDelete.id))); // Actualizar localStorage
    setShowDeletePopup(false);
    
    setItemToDelete(null);
  };

  const cancelDeleteItem = () => {
    setShowDeletePopup(false);
    setItemToDelete(null);
  };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
      }, []);

    return(
        <div className='carrito-page'>
            <div className='cabecera-carrito'>
            <h1>Mi carrito</h1>
            <p>Tienes {cartItems.length} ítems en tu carrito</p>
            </div>
            
            <div className='cuerpo-carrito'>
                <div className='productos-carrito'>
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

                <div className='datos-compra'>
                {cartItems.length > 0 && (
                <div className="cart-summary">
                    <p>Subtotal: S/ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                    <p>Costo de entrega: GRATIS</p>
                    <h4>Total: S/ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
                    <button className="view-cart-btn" onClick={goComprar}>COMPRAR AHORA</button>
                </div>
                )}
                </div>
            </div>
            

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

            <SoundPlayer ref={soundPlayerRef} />
        </div>
    )
}

export default Carrito;
