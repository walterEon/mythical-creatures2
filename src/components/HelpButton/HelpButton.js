import React, { useState } from 'react';
import './HelpButton.css'; // Asegúrate de crear este archivo CSS para el estilo

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="help-button-container">
      <button 
        aria-label="Abrir ventana de ayuda" 
        className="help-button" 
        onClick={toggleHelp}
        aria-expanded={isOpen}
      >
        {/* Icono de ayuda o texto */}
        <span role="img" aria-label="Ícono de Ayuda">❓</span>
      </button>

      {isOpen && (
        <div className="help-menu">
          <h2>¿En qué podemos ayudarte?</h2>
          <ul>
            <li><a href="#live-chat">Chat en Vivo</a></li>
            <li><a href="#user-guides">Guías de Usuario</a></li>
            <li><a href="#contact-info">Información de Contacto</a></li>
          </ul>
          <button className="close-button" onClick={toggleHelp} aria-label="Cerrar ventana de ayuda">X</button>
        </div>
      )}
    </div>
  );
};

export default HelpButton;
