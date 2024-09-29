import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Book, PhoneCall, Send } from 'lucide-react';
import './HelpButton.css';

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  const toggleHelp = () => {
    setIsOpen(!isOpen);
    setActiveSection(null);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      
      // Simulación de respuesta del agente
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { 
          text: "Gracias por tu mensaje. Un agente te responderá pronto.", 
          sender: 'agent' 
        }]);
      }, 1000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return (
            <div className="help-section chat-section">
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="send-button">
                  <Send size={20} />
                </button>
              </div>
            </div>
          );
      case 'guides':
        return (
          <div className="help-section">
            <h3>Guías de Usuario</h3>
            <ul>
              <li>Cómo realizar un pedido</li>
              <li>Política de devoluciones</li>
              <li>Preguntas frecuentes</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div className="help-section">
            <h3>Información de Contacto</h3>
            <p>Email: soporte@tutienda.com</p>
            <p>Teléfono: +1 234 567 890</p>
            <p>Horario: Lun-Vie 9:00-18:00</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="help-button-container">
      <button onClick={toggleHelp} className="help-button">
        ❓
      </button>
      {isOpen && (
        <div className="help-menu">
          <h2>¿En qué podemos ayudarte?</h2>
          <ul>
            <li>
              <button onClick={() => setActiveSection('chat')} className="help-option">
                <MessageSquare className="icon" />
                <span>Chat en Vivo</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('guides')} className="help-option">
                <Book className="icon" />
                <span>Guías de Usuario</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('contact')} className="help-option">
                <PhoneCall className="icon" />
                <span>Información de Contacto</span>
              </button>
            </li>
          </ul>
          {renderSection()}
          <button onClick={toggleHelp} className="close-button">
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default HelpButton;
