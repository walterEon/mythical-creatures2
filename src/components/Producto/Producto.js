import React from 'react';
import './Producto.css';

const Producto = ({ image, name, price, discount, description }) => {
    return (
        <div className="producto">
            {discount && <span className="producto-discount">-{discount}%</span>}
            <img src={image} alt={name} className="producto-image" />
            <h2 className="producto-name">{name}</h2>
            <p className="producto-description">{description}</p>
            <p className="producto-price">S/ {price}</p>
            <button className="producto-button">AGREGAR</button>
        </div>
    );
};

export default Producto;
