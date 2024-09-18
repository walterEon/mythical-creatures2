import React, { useState } from 'react';
import './Filtros.css';

const Filtros = ({ onFilterChange, cat }) => {
    const [categoria, setCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');
    const [rangoPrecio, setRangoPrecio] = useState([0, 60]);

    const handleFilterChange = () => {
        onFilterChange({ categoria, subCategoria, marca, tipoProducto, rangoPrecio });
    };

    return (
        <div className="filtros">
            <h2>{cat}</h2>

            <div className="filtro-section">
                <h3>Categoría</h3>
                <select value={categoria} onChange={(e) => { setCategoria(e.target.value); handleFilterChange(); }}>
                    <option value="">Todas</option>
                </select>
            </div>

            <div className="filtro-section">
                <h3>Sub-Categoría</h3>
                <select value={subCategoria} onChange={(e) => { setSubCategoria(e.target.value); handleFilterChange(); }}>
                    <option value="">Todas</option>
                </select>
            </div>

            <div className="filtro-section">
                <h3>Marca</h3>
                <select value={marca} onChange={(e) => { setMarca(e.target.value); handleFilterChange(); }}>
                    <option value="">Todas</option>
                </select>
            </div>

            <div className="filtro-section">
                <h3>Tipo de Producto</h3>
                <select value={tipoProducto} onChange={(e) => { setTipoProducto(e.target.value); handleFilterChange(); }}>
                    <option value="">Todos</option>
                </select>
            </div>

            <div className="filtro-section">
                <h3>Rango de precio</h3>
                <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={rangoPrecio[1]} 
                    onChange={(e) => { 
                        setRangoPrecio([0, e.target.value]); 
                        handleFilterChange(); 
                    }} 
                />
                <p>S/ {rangoPrecio[0]} - S/ {rangoPrecio[1]}</p>
            </div>
        </div>
    );
};

export default Filtros;
