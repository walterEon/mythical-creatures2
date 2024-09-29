import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import lanz1 from './Lanzamientos1.png';
import lanz2 from './Lanzamientos2.png';
import lanz3 from './Lanzamientos3.png';
import './PromoCarousel.css';

const promos = [
  { image: lanz1, link: '/categoria/Lanzamientos' }, 
  { image: lanz2, link: '/categoria/Lanzamientos' }, 
  { image: lanz3, link: '/categoria/Lanzamientos' }, 
  { image: lanz1, link: '/categoria/Lanzamientos' }, 
  { image: lanz2, link: '/categoria/Lanzamientos' },
];

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
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
      >
        {promos.map((promo, index) => (
          <div key={index} className="slide-c2">
            <div className="promo-hover-container">
              <img src={promo.image} alt={`Promo ${index}`} className="promo-image" />
              <div className="overlay">
                <a href={promo.link} className="ver-mas-button">Ver más</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="carousel-button left-button" disabled={currentIndex === 0}>
        <ChevronLeft size={24} color="#4F46E5" />
      </button>
      <button onClick={nextSlide} className="carousel-button right-button" disabled={currentIndex === maxIndex}>
        <ChevronRight size={24} color="#4F46E5" />
      </button>
    </div>
  );
};

export default PromoCarousel;

