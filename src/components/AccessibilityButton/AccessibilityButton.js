import React, { useState, useEffect, useRef } from 'react';
import { FaUniversalAccess, FaSave, FaUpload } from 'react-icons/fa';
import './AccessibilityButton.css';

function AccessibilityButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contrast, setContrast] = useState('normal');
  const [adhdProfile, setAdhdProfile] = useState(false);
  const [daltonismo, setDaltonismo] = useState('none');
  const [lupa, setLupa] = useState(false);
  const [lupaContent, setLupaContent] = useState('');
  const [textReadingActive, setTextReadingActive] = useState(false);
  const [monochromatic, setMonochromatic] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [readingGuideActive, setReadingGuideActive] = useState(false);
  const readingGuideRef = useRef(null);
  const lupaRef = useRef(null);

  const [profiles, setProfiles] = useState([]);
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem('accessibilityProfiles')) || [];
    setProfiles(savedProfiles);
  }, []);

  const saveProfile = () => {
    if (!profileName.trim()) {
      alert('Por favor, ingresa un nombre para el perfil.');
      return;
    }
    const newProfile = {
      name: profileName,
      settings: {
        contrast,
        fontSize,
        readingGuideActive,
        monochromatic,
        daltonismo,
        adhdProfile,
        textReadingActive,
        lupa
      }
    };
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('accessibilityProfiles', JSON.stringify(updatedProfiles));
    setProfileName('');
    alert('Perfil guardado exitosamente.');
  };

  const loadProfile = (profile) => {
    setContrast(profile.settings.contrast);
    setFontSize(profile.settings.fontSize);
    setReadingGuideActive(profile.settings.readingGuideActive);
    setMonochromatic(profile.settings.monochromatic);
    setDaltonismo(profile.settings.daltonismo);
    setAdhdProfile(profile.settings.adhdProfile);
    setTextReadingActive(profile.settings.textReadingActive);
    setLupa(profile.settings.lupa);

    // Aplicar los ajustes
    document.documentElement.style.fontSize = `${profile.settings.fontSize}%`;
    document.body.className = `contrast-${profile.settings.contrast}`;
    document.body.classList.toggle('monochromatic', profile.settings.monochromatic);
    document.body.classList.toggle('adhd-mode', profile.settings.adhdProfile);
    applyDaltonismoFilter(profile.settings.daltonismo);

    alert(`Perfil "${profile.name}" cargado exitosamente.`);
  };

  const deleteProfile = (profileToDelete) => {
    const updatedProfiles = profiles.filter(profile => profile.name !== profileToDelete.name);
    setProfiles(updatedProfiles);
    localStorage.setItem('accessibilityProfiles', JSON.stringify(updatedProfiles));
    alert(`Perfil "${profileToDelete.name}" eliminado.`);
  };

  // Toggle the Lupa feature on and off
  const toggleLupa = () => {
    setLupa(prevState => !prevState);
  };

  const toggleMonochromatic = () => {
    document.body.classList.remove('protanopia');
    document.body.classList.remove('deuteranopia');
    document.body.classList.remove('tritanopia');
    setDaltonismo('none');
    setMonochromatic(prevState => !prevState);
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
      const target = e.target;
      
      if (lupa && target.tagName.match(/P|H1|H2|H3|H4|H5|H6|SPAN|A|BUTTON|INPUT|LABEL|SELECT|TEXTAREA/i)) {
        // Verificar si es un input o textarea
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          setLupaContent(target.value); // Mostrar el valor del input
        } else {
          setLupaContent(target.textContent); // Mostrar el contenido de texto
        }
    
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

  const toggleReadingGuide = () => {
    setReadingGuideActive(prev => !prev);
  };

  // Efecto para manejar el movimiento de la guía de lectura
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (readingGuideActive && readingGuideRef.current) {
        readingGuideRef.current.style.left = `${e.clientX - 50}px`; // Centra la línea en el cursor
        readingGuideRef.current.style.top = `${e.clientY + 20}px`; // Coloca la línea debajo del cursor
      }
    };

    if (readingGuideActive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [readingGuideActive]);

  useEffect(() => {
    if (monochromatic) {
      document.body.classList.add('monochromatic');
    } else {
      document.body.classList.remove('monochromatic');
    }
  }, [monochromatic]);

   // Función mejorada para ajustar el tamaño del texto
   const adjustTextSize = (e) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  // Efecto para aplicar el tamaño de fuente
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Function to toggle contrast levels
  const toggleContrast = () => {
    setDaltonismo('none');
    setMonochromatic(false);
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

  const toggleDaltonismo = (tipo) => setDaltonismo(prev => prev === tipo ? 'none' : tipo);

  const applyDaltonismoFilter = (tipo) => {
    setMonochromatic(false);
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (tipo !== 'none') {
      document.body.classList.add(tipo);
    }
  };

  useEffect(() => {
    applyDaltonismoFilter(daltonismo);
  }, [daltonismo]);

  // Effect to apply contrast changes
  useEffect(() => {
    document.body.className = `contrast-${contrast}`;
  }, [contrast]);

  // Function to read text content when an element is clicked
  const readTextContent = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'es-ES';  // Set the language to Spanish
    window.speechSynthesis.speak(speech);
  };

  // Effect to handle clicks on elements and read their content only if text reading is active
  useEffect(() => {
    if (textReadingActive) {
      const handleClick = (e) => {
        if (e.target.tagName.match(/BUTTON|INPUT|A|P|H1|H2|H3|H4|H5|LABEL|SELECT/i)) {
          readTextContent(e.target.textContent || e.target.value || e.target.alt || 'Elemento seleccionado');
        }
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [textReadingActive]);


  // Reset all accessibility settings
  const resetAccessibilitySettings = () => {
    setContrast('normal');
    setAdhdProfile(false);
    setDaltonismo('none');
    setReadingGuideActive(false);

    setLupa(false);
    setTextReadingActive(false); // Desactivar lectura de texto al restablecer
    setMonochromatic(false);
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
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

  // Toggle the text reading functionality
  const toggleTextReading = () => {
    setTextReadingActive(prevState => !prevState);
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
            
            <div className="accessibility-option-r">
              <button onClick={resetAccessibilitySettings}>Restablecer ajustes</button>
            </div>
          </div>

          <div className="accessibility-options">
            <h5>Enfoque a discapacidades visuales</h5>
            <div className="accessibility-option">
              <span>Ajustar tamaño del texto</span>
              <input 
                type="range" 
                min="100" 
                max="200" 
                step="10"
                value={fontSize} 
                onChange={adjustTextSize} 
              />
              <span>{fontSize}%</span>
            </div>


            <div className="accessibility-option">
              <span>Lupa de Texto</span>
              <button onClick={toggleLupa}>
                {lupa ? 'Desactivar' : 'Activar'}
              </button>
            </div>

            <div className="accessibility-option">
              <span>Lector de Pantalla</span>
              <button onClick={toggleTextReading}>
                {textReadingActive ? 'Desactivar' : 'Activar'}
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
              <h5>Ayudas de Lectura</h5>
              <div className="accessibility-option">
                <span>Guía de Lectura</span>
                <button onClick={toggleReadingGuide}>
                  {readingGuideActive ? 'Desactivar' : 'Activar'}
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
            <h5>Modo Monocromático</h5>
            <div className="accessibility-option">
              <span>Activar modo monocromático</span>
              <button onClick={toggleMonochromatic}>
                {monochromatic ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>

          <div className="accessibility-profiles">
  <h5>Perfiles de Accesibilidad</h5>
  <div className="save-profile">
    <input 
      type="text" 
      value={profileName} 
      onChange={(e) => setProfileName(e.target.value)}
      placeholder="Nombre del perfil"
      className="profile-input"
    />
    <button onClick={saveProfile} className="save-button"><FaSave /> Guardar perfil</button>
  </div>
  <div className="profile-list">
    {profiles.map((profile, index) => (
      <div key={index} className="profile-item">
        <span className="profile-name">{profile.name}</span>
        <div className="profile-actions">
          <button onClick={() => loadProfile(profile)} className="load-button"><FaUpload /> Cargar</button>
          <button onClick={() => deleteProfile(profile)} className="delete-button">Eliminar</button>
        </div>
      </div>
    ))}
  </div>
</div>

        

          
          
        
        </div>
      )}
      {lupa && (
        <div 
          ref={lupaRef} 
          className="lupa-overlay"
        >
          {lupaContent}
        </div>
      )}

{readingGuideActive && (
        <div ref={readingGuideRef} className="reading-guide"></div>
      )}
    </div>
  );
}

export default AccessibilityButton;




