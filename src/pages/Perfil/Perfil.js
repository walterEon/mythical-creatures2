import React, { useState } from 'react';
import './Perfil.css';

function Perfil() {
  const [selectedSection, setSelectedSection] = useState('perfil'); // Estado inicial

  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Control del popup

  const handleLogout = () => {
    setShowLogoutPopup(true); // Mostrar popup
  };

  const confirmLogout = () => {
    // Lógica para cerrar sesión
    console.log("Sesión cerrada");
    setShowLogoutPopup(false); // Cerrar popup
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false); // Cerrar popup sin cerrar sesión
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'perfil':
        return (
            <div>
                <h2>Mi perfil</h2>
                <div className='form-perfil'>
                    <div className='form-section'>
                        <label>Nombres</label>
                        <input type='text' value='Renzo Giovanni' disabled></input>
                    </div>

                    <div className='form-section'>
                        <label>Apellidos</label>
                        <input type='text' value='López Murillo' disabled></input>
                    </div>
                </div>

                <div className='form-perfil'>
                    <div className='form-section'>
                        <label>DNI</label>
                        <input type='text' value='76158923' disabled></input>
                    </div>
                </div>

                <div className='form-perfil'>
                    <div className='form-section'>
                        <label>Fecha de nacimiento</label>
                        <input type='date' value='' disabled></input>
                    </div>
                </div>

                <div className='form-perfil'>
                    <div className='form-section'>
                        <label>Email</label>
                        <input type='text' value='rlopez@gmail.com' disabled></input>
                    </div>
                </div>

                <div className='form-perfil'>
                    <div className='form-section'>
                        <label>Celular</label>
                        <input type='text' value='945342164' disabled></input>
                    </div>
                </div>

            </div>
        );
      case 'pedidos':
        return (
            <div>
                <h2>Mis pedidos</h2>
                <p>Usted todavía no tiene pedidos.</p>
            </div>
        );
      case 'contraseña':
        return (
            <div>
                <h2>Cambiar contraseña</h2>
                <div className='form-perfil'>
                    <div className='form-section'>
                        <label>Nueva Contraseña</label>
                        <input type='text' value=''></input>
                    </div>
                </div>
                <div className='form-perfil'>
                    <div className='form-section'>
                        <label>Confirmar Contraseña</label>
                        <input type='text' value=''></input>
                    </div>
                </div>

                <button className='cambiarc-b'>Cambiar contraseña</button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="perfil-container">

    
            {/* Sidebar */}
      <div className="perfil-sidebar">
        <ul>
          <li className={selectedSection === 'perfil' ? 'active' : ''}  onClick={() => setSelectedSection('perfil')}>Mi Perfil</li>
          <li className={selectedSection === 'pedidos' ? 'active' : ''}  onClick={() => setSelectedSection('pedidos')}>Mis Pedidos</li>
          <li className={selectedSection === 'contraseña' ? 'active' : ''}  onClick={() => setSelectedSection('contraseña')}>Cambiar Contraseña</li>
          <li onClick={handleLogout} className="logout-button">Cerrar Sesión</li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="perfil-content">
        {renderContent()}
      </div>

      {/* Popup de confirmación de cierre de sesión */}
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content-p">
            <p>¿Estás seguro de que quieres cerrar sesión?</p>
            <button onClick={confirmLogout}>Sí</button>
            <button onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    
      

    </div>
  );
}

export default Perfil;

