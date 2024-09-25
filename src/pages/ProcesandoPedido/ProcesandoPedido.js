import { useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './ProcesandoPedido.css';
import SoundPlayer from '../../components/SoundPlayer/SoundPlayer';

function ProcesandoPedido() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simular un tiempo de procesamiento, por ejemplo, 3 segundos
    setTimeout(() => {
      navigate('/pedido-exito');
      playSound('successSound');
    }, 3000);
  }, [navigate]);

  const soundPlayerRef = useRef(null);



  const playSound = (soundName) => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.playSound(soundName);
    }
  };

  return (
    <div className="procesando-pedido-container">
      <h1>Su pedido se está procesando...</h1>
      <p>Espere un momento mientras procesamos su pedido.</p>
      <div className="spinner"></div>
      <SoundPlayer ref={soundPlayerRef} />
    </div>
  );
}

export default ProcesandoPedido;

