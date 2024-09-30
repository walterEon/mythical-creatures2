import React from 'react';
import './ProductoInfo.css';
import { useParams, useNavigate } from 'react-router-dom';
import galletas from '../Categoria/galletas.jpg';
import manzanas from '../Categoria/manzanas.jpg';
import piedras from '../Categoria/piedras.jpg';
import hierba from '../Categoria/hierba.jpg';
import nectar from '../Categoria/nectar.jpg';
import raices from '../Categoria/raices.jpg';  
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useRef } from 'react';
import SoundPlayer from '../../components/SoundPlayer/SoundPlayer';

const productosMitologicos = [
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
    },
    {
        id: 3,
        image: piedras,
        name: 'Piedras de Lava para Dragones',
        description: 'Bocadillos de roca volcánica enriquecidos con especias de fuego, diseñados para satisfacer el apetito feroz de los dragones.',
        price: 100.00,
        discount: 15,
        categoria: 'gourmet',
        subCategoria: 'minerales',
        marca: 'FlameFeast',
        tipoProducto: 'bloque'
    },
    {
        id: 4,
        image: hierba,
        name: 'Hierba Lunar para Unicornios',
        description: 'Exquisita hierba cultivada bajo la luz de la luna llena, perfecta para unicornios que buscan nutrir su magia.',
        price: 80.00,
        discount: 20,
        categoria: 'gourmet',
        subCategoria: 'forraje',
        marca: 'MoonMeadow',
        tipoProducto: 'paca'
    },
    {
        id: 5,
        image: nectar,
        name: 'Néctar Floral para Hadas',
        description: 'Mezcla premium de néctares florales, llena de vitalidad mágica para mantener a las hadas volando felices todo el día.',
        price: 30.00,
        discount: 10,
        categoria: 'gourmet',
        subCategoria: 'bebida',
        marca: 'FairyFeast',
        tipoProducto: 'botella'
    },
    {
        id: 6,
        image: raices,
        name: 'Raíces Místicas para Grifos',
        description: 'Raíces mágicas con alto contenido en minerales, diseñadas para fortalecer el vigor y la majestuosidad de los grifos.',
        price: 90.00,
        discount: 12,
        categoria: 'gourmet',
        subCategoria: 'forraje',
        marca: 'GriffinBites',
        tipoProducto: 'raíz'
    }
];

function ProductoInfo() {
  const { id } = useParams();
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const soundPlayerRef = useRef(null);

  const playSound = (soundName) => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.playSound(soundName);
    }
  };

  const closeSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
  };

  const producto = productosMitologicos.find(p => p.id === parseInt(id));

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === producto.id);

    if (productInCart) {
      productInCart.quantity += quantity; // Add the selected quantity to the existing quantity
    } else {
      cart.push({ ...producto, quantity: quantity }); // Add the product with the selected quantity
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsSuccessPopupOpen(true);
    playSound('successSound');
  };

  return (
    <div className='producto-info-page'>
      <div className='producto-info-container'>
        <img src={producto.image} alt={producto.name} className='producto-image' />
        <div className='producto-details'>
          <h1>{producto.name}</h1>
          <p>{producto.description}</p>
          <label>Cantidad: 
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))} 
              min="1"
            />
          </label>
          <p>Precio: ${producto.price}</p>
          <div className='buttons'>
            <button onClick={() => navigate(-1)}>Atrás</button>
            <button onClick={handleAddToCart}>Agregar al carrito</button>
          </div>
        </div>
      </div>
      <div className='producto-info-container-c'>
      <div className='comentarios'>
        <h3>Comentarios</h3>
        {/* Ejemplo de comentarios con imagen de usuario */}
        <div className='comentario'>
          <FaRegUserCircle className='comentario-img'/>
          <div className='comentario-box'>
            <p><strong>Usuario 1</strong></p>
            <p>¡Es excelente!</p>
          </div>
        </div>

        <div className='comentario'>
        <FaRegUserCircle className='comentario-img'/>
          <div className='comentario-box'>
            <p><strong>Usuario 2</strong></p>
            <p>El producto tiene buena calidad.</p>
          </div>
        </div>

        {/* Añadir más comentarios aquí */}
      </div>
    </div>
      {isSuccessPopupOpen && (
        <div className="logout-popup">
          <div className="popup-content-p">
            <h2>¡Éxito!</h2>
            <p>Se han añadido {quantity} unidad(es) del producto al carrito.</p>
            <button onClick={closeSuccessPopup}>OK</button>
          </div>
        </div>
      )}
      <SoundPlayer ref={soundPlayerRef} />
    </div>
  );
}

export default ProductoInfo;
