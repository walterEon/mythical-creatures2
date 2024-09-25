import { useEffect, useState } from 'react';
import './PedidoExito.css';

function PedidoExito() {
  const [ultimoPedido, setUltimoPedido] = useState(null);

  useEffect(() => {
    // Recuperar la lista de pedidos desde localStorage
    const pedidos = JSON.parse(localStorage.getItem('orders')) || [];

    // Verificar si hay algún pedido
    if (pedidos.length > 0) {
      // Obtener el último pedido realizado
      setUltimoPedido(pedidos[pedidos.length - 1]);
    }
  }, []);

  // Si no hay pedido reciente
  if (!ultimoPedido) {
    return (
      <div className="pedido-exito-container">
        <h2>No hay pedidos recientes</h2>
        <p>Parece que no hay un pedido registrado. Intente realizar una compra nuevamente.</p>
      </div>
    );
  }

  // Mostrar la información del último pedido
  return (
    <div className="pedido-exito-container">
      <h2>Pedido realizado con éxito</h2>

      <div className="pedido-info">
        <p>ID del pedido: <span>{ultimoPedido.id}</span></p>
        <p>Fecha: <span>{new Date(ultimoPedido.fecha).toLocaleString()}</span></p>
        <p>Total: <span>S/ {ultimoPedido.total.toFixed(2)}</span></p>
        <p>Método de pago: <span>{ultimoPedido.metodoPago}</span></p>
        <p>Entrega: <span>{ultimoPedido.entrega === 'domicilio' ? 'Entrega a domicilio' : 'Recogida en tienda'}</span></p>
      </div>

      <div className="detalles-pedido">
        <h3>Detalles del pedido:</h3>
        <ul>
          {ultimoPedido.items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x S/ {item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <button className="boton-continuar" onClick={() => window.location.href = '/'}>
        Continuar comprando
      </button>
    </div>
  );
}

export default PedidoExito;


