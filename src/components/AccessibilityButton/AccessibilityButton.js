import React, { useState, useEffect, useRef } from 'react';
import { FaUniversalAccess } from 'react-icons/fa';
import './AccessibilityButton.css';

function AccessibilityButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contrast, setContrast] = useState('normal');
  const [adhdProfile, setAdhdProfile] = useState(false);
  const [daltonismo, setDaltonismo] = useState('none');
  const [lupa, setLupa] = useState(false);
  const [lupaContent, setLupaContent] = useState('');
  const lupaRef = useRef(null);

  // Toggle the Lupa feature on and off
  const toggleLupa = () => {
    setLupa(prevState => !prevState);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (lupa && lupaRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        lupaRef.current.style.left = `${x + 10}px`;
        lupaRef.current.style.top = `${y + 10}px`;
      }
    };

    const handleMouseEnter = (e) => {
      if (lupa && e.target.tagName.match(/P|H1|H2|H3|H4|H5|H6|SPAN|A|BUTTON|INPUT|LABEL|SELECT/i)) {
        setLupaContent(e.target.textContent);
        if (lupaRef.current) {
          lupaRef.current.style.display = 'block';
        }
      }
    };

    const handleMouseLeave = () => {
      if (lupaRef.current) {
        lupaRef.current.style.display = 'none';
      }
    };

    if (lupa) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseEnter);
      document.addEventListener('mouseout', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [lupa]);

   // Function to adjust text size
  const adjustTextSize = (e) => {
    document.documentElement.style.fontSize = `${e.target.value}px`;
    document.body.style.fontSize = `${e.target.value}px`;
  };

  // Function to toggle contrast levels
  const toggleContrast = () => {
    setDaltonismo('none');
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

  const toggleDaltonismo = (tipo) => {
    //setAdhdProfile(false);
    const nuevoFiltro = daltonismo === tipo ? 'none' : tipo; // Si ya está activado, desactivar
    setDaltonismo(nuevoFiltro);
    document.body.classList.add(nuevoFiltro); // Aplica el filtro al body
    //localStorage.setItem('daltonismo', nuevoFiltro); // Guarda el filtro en localStorage
    if(nuevoFiltro === 'none'){
      document.body.classList.remove('protanopia');
      document.body.classList.remove('deuteranopia');
      document.body.classList.remove('tritanopia');
    }else if(nuevoFiltro === 'protanopia'){
      document.body.classList.remove('deuteranopia');
      document.body.classList.remove('tritanopia');
    }else if(nuevoFiltro === 'deuteranopia'){
      document.body.classList.remove('protanopia');
      document.body.classList.remove('tritanopia');
    }else if(nuevoFiltro === 'tritanopia'){
      document.body.classList.remove('protanopia');
      document.body.classList.remove('deuteranopia');
    }
  };

  // Effect to apply contrast changes
  useEffect(() => {
    document.body.className = `contrast-${contrast}`;
  }, [contrast]);

  // Reset all accessibility settings
  const resetAccessibilitySettings = () => {
    setContrast('normal');
    setAdhdProfile(false);
    setDaltonismo('none');
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
              <span>Lupa de Texto</span>
              <button onClick={toggleLupa}>
                {lupa ? 'Desactivar' : 'Activar'}
              </button>
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
            <h5>Filtros de Daltonismo</h5>
            <div className="accessibility-option">
              <span>Protanopia</span>
              <button onClick={() => toggleDaltonismo('protanopia')}>
                {daltonismo === 'protanopia' ? 'Desactivar' : 'Activar'}
              </button>
            </div>

            <div className="accessibility-option">
              <span>Deuteranopia</span>
              <button onClick={() => toggleDaltonismo('deuteranopia')}>
                {daltonismo === 'deuteranopia' ? 'Desactivar' : 'Activar'}
              </button>
            </div>

            <div className="accessibility-option">
              <span>Tritanopia</span>
              <button onClick={() => toggleDaltonismo('tritanopia')}>
                {daltonismo === 'tritanopia' ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>

          <div className="accessibility-options">
            <h5>Restablecer ajustes</h5>
            <div className="accessibility-option">
              <button onClick={resetAccessibilitySettings}>Restablecer ajustes</button>
            </div>
          </div>
          {lupa && (
        <div 
          ref={lupaRef} 
          className="lupa-overlay"
        >
          {lupaContent}
        </div>
      )}
        
        </div>
      )}
    </div>
  );
}

export default AccessibilityButton;




