import React, { useState } from 'react';
import './Categoria.css';
import Filtros from '../../components/Filtros/Filtros';
import Producto from '../../components/Producto/Producto';
import { useParams } from 'react-router-dom';
import galletas from './galletas.jpg';
import manzanas from './manzanas.jpg';
import piedras from './piedras.jpg';
import hierba from './hierba.jpg';
import nectar from './nectar.jpg';
import raices from './raices.jpg';  

function Categoria() {

    const {id} = useParams();
    const [filtros, setFiltros] = useState({
        categoria: '',
        subCategoria: '',
        marca: '',
        tipoProducto: '',
        rangoPrecio: [0, 60]
    });

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
    
    

    const handleFilterChange = (newFilters) => {
        setFiltros(newFilters);
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

    const productosFiltrados = productosMitologicos.filter((producto) => {
        return (
            (!filtros.categoria || producto.categoria === filtros.categoria) &&
            (!filtros.subCategoria || producto.subCategoria === filtros.subCategoria) &&
            (!filtros.marca || producto.marca === filtros.marca) &&
            (!filtros.tipoProducto || producto.tipoProducto === filtros.tipoProducto) &&
            producto.price >= filtros.rangoPrecio[0] &&
            producto.price <= filtros.rangoPrecio[1]
        );
    });

    return (
        <div className="categoria-page">
            <div className="categoria-layout">
                <Filtros onFilterChange={handleFilterChange} cat={id} />
                <div className="productos-grid">
                    {productosFiltrados.map((producto) => (
                        <Producto
                            id={producto.id}
                            image={producto.image}
                            name={producto.name}
                            price={producto.price}
                            discount={producto.discount}
                            description={producto.description}
                            onAddToCart={() => addToCart(producto)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categoria;
