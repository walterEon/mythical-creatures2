import React, { useState, useEffect } from 'react';
import './Perfil.css';

function Perfil() {
  const [selectedSection, setSelectedSection] = useState('perfil'); // Estado inicial
  const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos

  // Obtener los pedidos desde localStorage al cargar el componente
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders)); // Convertir de string a objeto
    }
  }, []);

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

      {/* Contenido principal */}
      <div className="perfil-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Perfil;


