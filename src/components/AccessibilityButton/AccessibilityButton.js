import React, { useState, useEffect } from 'react';
import { FaUniversalAccess } from 'react-icons/fa';
import './AccessibilityButton.css';

function AccessibilityButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [contrast, setContrast] = useState('normal');

  const adjustTextSize = (e) => {
    document.documentElement.style.fontSize = `${e.target.value}px`;
    document.body.style.fontSize = `${e.target.value}px`;
  };

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

  useEffect(() => {
    document.body.className = `contrast-${contrast}`;
  }, [contrast]);
  

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
            {/* <div className="accessibility-option">
              <span>Perfil a prueba de convulsiones</span>
              <button>Activar</button>
            </div>
            <div className="accessibility-option">
              <span>Perfil de personas con problemas de visión</span>
              <button>Activar</button>
            </div>
            <div className="accessibility-option">
              <span>Perfil orientado al TDAH</span>
              <button>Activar</button>
            </div>
            <div className="accessibility-option">
              <span>Perfil de discapacidad cognitiva</span>
              <button>Activar</button>
            </div>
            <div className="accessibility-option">
              <span>Navegación por teclado</span>
              <button>Activar</button>
            </div>
            <div className="accessibility-option">
              <span>Usuarios ciegos (lector de pantalla)</span>
              <button>Activar</button>
            </div> */}
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
            <h5>Enfoque a discapacidades auditivas</h5>
            
          </div>

        </div>
      )}
    </div>
  );
}

export default AccessibilityButton;



