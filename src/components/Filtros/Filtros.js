import React, { useState } from 'react';
import './Filtros.css';

const Filtros = ({ onFilterChange, cat }) => {
    const [categoria, setCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');
    const [rangoPrecio, setRangoPrecio] = useState([0, 60]);

    const handleFilterChange = (newFilters) => {
        onFilterChange(newFilters);
    };

    const handleRangeChange = (e) => {
        const newValue = e.target.value;
        const newRangoPrecio = [0, newValue];
        setRangoPrecio(newRangoPrecio);

        // Establece el fondo del control de rango dinámicamente
        const range = e.target;
        const value = ((newValue - range.min) / (range.max - range.min+20)) * 100;
        range.style.background = `linear-gradient(to right, #59402f ${value}%, #ddd ${value}%)`;

        handleFilterChange({ 
            categoria, 
            subCategoria, 
            marca, 
            tipoProducto, 
            rangoPrecio: newRangoPrecio 
        });
    };

    return (
        <div className="filtros">
            <h2>{cat}</h2>

            <div className="filtro-section">
                <h3>Categoría</h3>
                <select value={categoria} onChange={(e) => { 
                    const newCategoria = e.target.value; 
                    setCategoria(newCategoria);
                    handleFilterChange({ 
                        categoria: newCategoria, 
                        subCategoria, 
                        marca, 
                        tipoProducto, 
                        rangoPrecio 
                    });
                }}>
                    <option value="">Todas</option>
                    <option value="gourmet">Gourmet</option>
                    <option value="tradicional">Tradicional</option>
                </select>
            </div>

            <div className="filtro-section">
                <h3>Sub-Categoría</h3>
                <select value={subCategoria} onChange={(e) => { 
                    const newSubCategoria = e.target.value; 
                    setSubCategoria(newSubCategoria);
                    handleFilterChange({ 
                        categoria, 
                        subCategoria: newSubCategoria, 
                        marca, 
                        tipoProducto, 
                        rangoPrecio 
                    });
                }}>
                    <option value="">Todas</option>
                    <option value="bebida">Bebidas</option>
                    <option value="galletas">Galletas</option>
                    <option value="minerales">Minerales</option>
                    <option value="forraje">Vegetales</option>
                    <option value="frutas">Frutas</option>
                </select>
            </div>

            <div className="filtro-section">
                <h3>Marca</h3>
                <select value={marca} onChange={(e) => { 
                    const newMarca = e.target.value; 
                    setMarca(newMarca);
                    handleFilterChange({ 
                        categoria, 
                        subCategoria, 
                        marca: newMarca, 
                        tipoProducto, 
                        rangoPrecio 
                    });
                }}>
                    <option value="">Todas</option>
                    <option value="OceanTreats">OceanTreats</option>
                    <option value="SkyFeast">SkyFeast</option>
                    <option value="FlameFeast">FlameFeast</option>
                    <option value="MoonMeadow">MoonMeadow</option>
                    <option value="FairyFeast">FairyFeast</option>
                    <option value="GriffinBites">GriffinBites</option>
                </select>
            </div>

            <div className="filtro-section">
                <h3>Rango de precio</h3>
                <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={rangoPrecio[1]} 
                    onChange={handleRangeChange}
                    style={{ background: 'linear-gradient(to right, #59402f 30%, #ddd 30%)' }} // Estilo inicial
                />
                <p>S/ {rangoPrecio[0]} - S/ {rangoPrecio[1]}</p>
            </div>
        </div>
    );
};

export default Filtros;

