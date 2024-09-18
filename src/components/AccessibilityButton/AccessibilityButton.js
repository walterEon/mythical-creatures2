import React, { useState } from 'react';
import { FaUniversalAccess } from 'react-icons/fa';
import './AccessibilityButton.css';

function AccessibilityButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const adjustTextSize = (e) => {
    document.body.style.fontSize = `${e.target.value}px`;
  };
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="accessibility-container">
      <button className="accessibility-btn" onClick={toggleMenu}>
        <FaUniversalAccess color='black' size={24} />
      </button>

      {isMenuOpen && (
        <div className="accessibility-menu">
          <div className="accessibility-header">
            <h2>Ajustes de accesibilidad</h2>
            <button className="close-menu" onClick={toggleMenu}>✖</button>
          </div>
          <div className="accessibility-options">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityButton;



