import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import comida1 from './comida1.png'

const promos = [
  {
    discount: '35%',
    category: 'en néctar de ambrosía',
    brand: 'Pegasus Delights',
    description: 'Ideal para unicornios y pegasos exigentes',
    image: comida1,
    validDate: 'Válido del 16 al 22 de septiembre de 2024.',
    bgColor: '#936025',
  },
  {
    discount: '50%',
    category: 'en escamas de dragón crujientes',
    brand: 'DragonMunch',
    description: 'El snack preferido de las quimeras',
    image: comida1,
    validDate: 'Válido del 16 al 22 de septiembre de 2024.',
    bgColor: '#6F4616',
  },
  {
    discount: '20%',
    category: 'en sushi de kraken',
    brand: 'NeptuneNibbles',
    description: 'Delicias marinas para sirenas y tritones',
    image: comida1,
    validDate: 'Válido del 16 al 22 de septiembre de 2024.',
    bgColor: '#54350D',
  },
  {
    discount: '40%',
    category: 'en ambrosía para fénix',
    brand: 'FirebirdFeast',
    description: 'Alimento que reaviva las llamas eternas',
    image: comida1,
    validDate: 'Válido del 16 al 22 de septiembre de 2024.',
    bgColor: '#BE7333',
  },
  {
    discount: '25%',
    category: 'en néctar de flores élficas',
    brand: 'ElvenElixirs',
    description: 'La bebida preferida de las hadas del bosque',
    image: comida1,
    validDate: 'Válido del 16 al 22 de septiembre de 2024.',
    bgColor: '#936025',
  },
];

const styles = {
  carouselContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '1200px',
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    marginTop: '20px',
    marginBottom: '20px',
    
  },
  carouselWrapper: {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',
    height: '200px',
    
  },
  slide: {
    flexShrink: 0,
    width: 'calc(33.333% - 16px)',
    margin: '0 8px',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',

  },
  textContent: {
    flex: '1',
    paddingRight: '16px',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '4px',
  },
  discount: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 1,
    marginBottom: '4px',
  },
  category: {
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '4px',
  },
  brand: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '4px',
  },
  description: {
    fontSize: '0.75rem',
    fontStyle: 'italic',
    color: 'white',
    marginBottom: '8px',
  },
  validDate: {
    fontSize: '0.6875rem',
    color: 'white',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  leftButton: {
    left: '10px',
  },
  rightButton: {
    right: '10px',
  },
};

const PromoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slidesToShow = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 3;
  const maxIndex = promos.length - slidesToShow;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div style={styles.carouselContainer}>
      <div
        style={{
          ...styles.carouselWrapper,
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
      >
        {promos.map((promo, index) => (
          <div key={index} style={{ ...styles.slide, backgroundColor: promo.bgColor }}>
            <div style={styles.textContent}>
              <h2 style={styles.heading}>HASTA</h2>
              <p style={styles.discount}>{promo.discount}</p>
              <p style={styles.heading}>DESCT.</p>
              <p style={styles.category}>{promo.category}</p>
              <p style={styles.brand}>{promo.brand}</p>
              <p style={styles.description}>{promo.description}</p>
              <p style={styles.validDate}>{promo.validDate}</p>
            </div>
            <img src={promo.image} alt="Promo" style={styles.image} />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} style={{ ...styles.button, ...styles.leftButton }} disabled={currentIndex === 0}>
        <ChevronLeft size={24} color="#4F46E5" />
      </button>
      <button onClick={nextSlide} style={{ ...styles.button, ...styles.rightButton }} disabled={currentIndex === maxIndex}>
        <ChevronRight size={24} color="#4F46E5" />
      </button>
    </div>
  );
};

export default PromoCarousel;