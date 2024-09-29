import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import promo1 from './Promocion1.png';
import promo2 from './Promocion2.png';
import promo3 from './Promocion3.png';
import promo4 from './Promocion4.png';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function UncontrolledExample() {

  const navigate = useNavigate();

  const soundPlayerRef = useRef(null);

    const playSound = (soundName) => {
      if (soundPlayerRef.current) {
        soundPlayerRef.current.playSound(soundName);
      }
    };

  const goPromo = () => {
    playSound('buttonSound');
    navigate('/categoria/Promociones');
  }

  return (
    <div className='cuerpo-carrusel'>
      <Carousel>
      <Carousel.Item onClick={goPromo}> 
        <img className='imagen-zoe' src={promo1} alt='promo1'/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={goPromo}>
      <img className='imagen-zoe' src={promo2} alt='promo2'/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={goPromo}>
      <img className='imagen-zoe' src={promo3} alt='promo3'/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={goPromo}>
      <img className='imagen-zoe' src={promo4} alt='promo4'/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <SoundPlayer ref={soundPlayerRef} />
    </div>
    
  );
}

export default UncontrolledExample;