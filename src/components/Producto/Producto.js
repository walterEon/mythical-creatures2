import React from 'react';
import './Producto.css';
import { useNavigate } from 'react-router-dom';

const Producto = ({ id, image, name, price, discount, description, onAddToCart }) => {

    const navigate = useNavigate();

    const goToProduct = (id)  => {
        console.log('ID: '+id);
        navigate(`/producto-info/${id}`);
        
    }

    return (
        <div className="producto">
            {discount > 0 ? <span className="producto-discount">-{discount}%</span> : ''}
            <img src={image} alt={name} className="producto-image" onClick={() => goToProduct(id)} />
            <h2 className="producto-name">{name}</h2>
            <p className="producto-description">{description}</p>
            <p className="producto-price">S/ {price}</p>
            <button className="producto-button" onClick={onAddToCart}>AGREGAR</button>
        </div>
    );
};

export default Producto;
