import React, { useState, useEffect } from 'react';
import './Perfil.css';

function Perfil() {
  const [selectedSection, setSelectedSection] = useState('perfil');
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data from localStorage
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession) {
      setUserData(userSession);
    }

    // Fetch orders from localStorage
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Por favor complete ambos campos.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    // Obtener la lista de usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Encontrar el usuario en la lista usando el email del userSession
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const updatedUsers = users.map((user) => {
      if (user.email === userSession.email) {
        return { ...user, password: newPassword }; // Actualizar la contraseña
      }
      return user;
    });

    // Actualizar la lista de usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Actualizar la contraseña del usuario en userSession también
    const updatedUserSession = { ...userSession, password: newPassword };
    localStorage.setItem('userSession', JSON.stringify(updatedUserSession));

    // Actualizar el estado de userData
    setUserData(updatedUserSession);

    // Mostrar mensaje de éxito
    setMessage('Contraseña actualizada con éxito.');

    // Limpiar campos
    setNewPassword('');
    setConfirmPassword('');
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'perfil':
        return (
          <div>
            <h2>Mi perfil</h2>
            {userData && (
              <>
                <div className='form-perfil'>
                  <div className='form-section'>
                    <p>Nombres</p>
                    <input type='text' value={userData.nombre || ''} disabled />
                  </div>
                  <div className='form-section'>
                    <p>Apellidos</p>
                    <input type='text' value={userData.apellido || ''} disabled />
                  </div>
                </div>
                <div className='form-perfil'>
                  <div className='form-section'>
                    <p>DNI</p>
                    <input type='text' value={userData.dni || ''} disabled />
                  </div>
                </div>
                <div className='form-perfil'>
                  <div className='form-section'>
                    <p>Celular</p>
                    <input type='text' value={userData.telefono || ''} disabled />
                  </div>
                </div>
                <div className='form-perfil'>
                  <div className='form-section'>
                    <p>Email</p>
                    <input type='text' value={userData.email || ''} disabled />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case 'pedidos':
        return (
          <div>
            <h2>Mis pedidos</h2>
            {orders.length === 0 ? (
              <p>No tiene pedidos.</p>
            ) : (
              <div className="pedidos-list">
                {orders.map((order, index) => (
                  <div key={index} className="pedido-item">
                    <p><strong>ID del pedido:</strong> {order.id}</p>
                    <p><strong>Fecha:</strong> {order.fecha}</p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Estado: Activo</strong> {order.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'contraseña':
        return (
          <div>
            <h2>Cambiar contraseña</h2>
            <div className='form-perfil'>
              <div className='form-section'>
                <p>Nueva Contraseña</p>
                <input 
                  type='password' 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='form-perfil'>
              <div className='form-section'>
                <p>Confirmar Contraseña</p>
                <input 
                  type='password' 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button className='cambiarc-b' onClick={handlePasswordChange}>
              Cambiar contraseña
            </button>
            {message && <p className="message">{message}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-sidebar">
        <ul>
          <li
            className={selectedSection === 'perfil' ? 'active' : ''}
            onClick={() => setSelectedSection('perfil')}
          >
            Mi Perfil
          </li>
          <li
            className={selectedSection === 'pedidos' ? 'active' : ''}
            onClick={() => setSelectedSection('pedidos')}
          >
            Mis Pedidos
          </li>
          <li
            className={selectedSection === 'contraseña' ? 'active' : ''}
            onClick={() => setSelectedSection('contraseña')}
          >
            Cambiar Contraseña
          </li>
        </ul>
      </div>
      <div className="perfil-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Perfil;



