import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProcesandoPedido.css';

function ProcesandoPedido() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simular un tiempo de procesamiento, por ejemplo, 3 segundos
    setTimeout(() => {
      navigate('/pedido-exito');
    }, 3000);
  }, [navigate]);

  return (
    <div className="procesando-pedido-container">
      <h1>Su pedido se está procesando...</h1>
      <p>Espere un momento mientras procesamos su pedido.</p>
      <div className="spinner"></div>
    </div>
  );
}

export default ProcesandoPedido;

