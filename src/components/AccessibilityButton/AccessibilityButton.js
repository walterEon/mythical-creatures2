import React, { useState, useEffect } from 'react';
import { FaUniversalAccess } from 'react-icons/fa';
import './AccessibilityButton.css';

function AccessibilityButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contrast, setContrast] = useState('normal');
  const [adhdProfile, setAdhdProfile] = useState(false);

  // Function to adjust text size
  const adjustTextSize = (e) => {
    document.documentElement.style.fontSize = `${e.target.value}px`;
    document.body.style.fontSize = `${e.target.value}px`;
  };

  // Function to toggle contrast levels
  const toggleContrast = () => {
    setContrast(prevContrast => {
      switch(prevContrast) {
        case 'normal':
          return 'high';
        case 'high':
          return 'low';
        case 'low':
          return 'normal';
        default:
          return 'normal';
      }
    });
  };

  // Effect to apply contrast changes
  useEffect(() => {
    document.body.className = `contrast-${contrast}`;
  }, [contrast]);

  // Reset all accessibility settings
  const resetAccessibilitySettings = () => {
    setContrast('normal');
    setAdhdProfile(false);
    document.documentElement.style.fontSize = '16px';
    document.body.style.fontSize = '16px';
    document.body.className = ''; // Reset any classes
  };

  // Function to toggle the ADHD profile
  const toggleAdhdProfile = () => {
    setAdhdProfile(prevState => !prevState);
  };

  // Updated function to apply the ADHD effect
  const applyAdhdEffect = (e) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;
  
    document.body.style.setProperty('--cursor-x', `${cursorX}px`);
    document.body.style.setProperty('--cursor-y', `${cursorY}px`);
  };

  // Effect to add/remove the ADHD profile styles
  useEffect(() => {
    if (adhdProfile) {
      document.body.classList.add('adhd-mode');
      document.addEventListener('mousemove', applyAdhdEffect);
    } else {
      document.body.classList.remove('adhd-mode');
      document.removeEventListener('mousemove', applyAdhdEffect);
    }
    return () => {
      document.body.classList.remove('adhd-mode');
      document.removeEventListener('mousemove', applyAdhdEffect);
    };
  }, [adhdProfile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="accessibility-container">
      <FaUniversalAccess className="accessibility-btn" onClick={toggleMenu} color='brown' size={50} />

      {isMenuOpen && (
        <div className="accessibility-menu">
          <div className="accessibility-header">
            <h2>Ajustes de accesibilidad</h2>
            <button className="close-menu" onClick={toggleMenu}>✖</button>
          </div>

          <div className="accessibility-options">
            <h5>Enfoque a discapacidades visuales</h5>
            <div className="accessibility-option">
              <span>Ajustar tamaño del texto</span>
              <input type="range" min="14" max="30" defaultValue="16" onChange={adjustTextSize} />
            </div>

            <div className="accessibility-option">
              <span>Ajustar contraste</span>
              <button onClick={toggleContrast}>
                {contrast === 'normal' ? 'Normal' : contrast === 'high' ? 'Alto' : 'Bajo'}
              </button>
            </div>
          </div>

          <div className="accessibility-options">
            <h5>Enfoque TDAH</h5>
            <div className="accessibility-option">
              <span>Perfil con menos distracciones</span>
              <button onClick={toggleAdhdProfile}>
                {adhdProfile ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>

          <div className="accessibility-options">
            <h5>Restablecer ajustes</h5>
            <div className="accessibility-option">
              <button onClick={resetAccessibilitySettings}>Restablecer ajustes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityButton;




