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

    // const productosMitologicos = [
    //     {
    //         id: 1,
    //         image: galletas,
    //         name: 'Galletas de Estrella de Mar para Sirenas',
    //         description: 'Galletas crujientes hechas con algas y polvo de perlas, especialmente formuladas para las sirenas amantes de los sabores marinos.',
    //         price: 25.00,
    //         discount: 0,
    //         categoria: 'gourmet',
    //         subCategoria: 'galletas',
    //         marca: 'OceanTreats',
    //         tipoProducto: 'pack'
    //     },
    //     {
    //         id: 2,
    //         image: manzanas,
    //         name: 'Manzanas Doradas para Pegasos',
    //         description: 'Manzanas bañadas en miel dorada, ricas en energía celestial para Pegasos que necesitan volar largas distancias.',
    //         price: 45.00,
    //         discount: 5,
    //         categoria: 'gourmet',
    //         subCategoria: 'frutas',
    //         marca: 'SkyFeast',
    //         tipoProducto: 'bolsa'
    //     },
    //     {
    //         id: 3,
    //         image: piedras,
    //         name: 'Piedras de Lava para Dragones',
    //         description: 'Bocadillos de roca volcánica enriquecidos con especias de fuego, diseñados para satisfacer el apetito feroz de los dragones.',
    //         price: 100.00,
    //         discount: 15,
    //         categoria: 'gourmet',
    //         subCategoria: 'minerales',
    //         marca: 'FlameFeast',
    //         tipoProducto: 'bloque'
    //     },
    //     {
    //         id: 4,
    //         image: hierba,
    //         name: 'Hierba Lunar para Unicornios',
    //         description: 'Exquisita hierba cultivada bajo la luz de la luna llena, perfecta para unicornios que buscan nutrir su magia.',
    //         price: 80.00,
    //         discount: 20,
    //         categoria: 'gourmet',
    //         subCategoria: 'forraje',
    //         marca: 'MoonMeadow',
    //         tipoProducto: 'paca'
    //     },
    //     {
    //         id: 5,
    //         image: nectar,
    //         name: 'Néctar Floral para Hadas',
    //         description: 'Mezcla premium de néctares florales, llena de vitalidad mágica para mantener a las hadas volando felices todo el día.',
    //         price: 30.00,
    //         discount: 10,
    //         categoria: 'gourmet',
    //         subCategoria: 'bebida',
    //         marca: 'FairyFeast',
    //         tipoProducto: 'botella'
    //     },
    //     {
    //         id: 6,
    //         image: raices,
    //         name: 'Raíces Místicas para Grifos',
    //         description: 'Raíces mágicas con alto contenido en minerales, diseñadas para fortalecer el vigor y la majestuosidad de los grifos.',
    //         price: 90.00,
    //         discount: 12,
    //         categoria: 'gourmet',
    //         subCategoria: 'forraje',
    //         marca: 'GriffinBites',
    //         tipoProducto: 'raíz'
    //     }
    // ];

    

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
                    onChange={(e) => { 
                        const newRangoPrecio = [0, e.target.value]; 
                        setRangoPrecio(newRangoPrecio);
                        handleFilterChange({ 
                            categoria, 
                            subCategoria, 
                            marca, 
                            tipoProducto, 
                            rangoPrecio: rangoPrecio 
                        });
                    }}
                />
                <p>S/ {rangoPrecio[0]} - S/ {rangoPrecio[1]}</p>
            </div>
        </div>
    );
};

export default Filtros;
