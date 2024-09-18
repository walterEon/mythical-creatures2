import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import imagen from './mito.jpg';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function UncontrolledExample() {
  return (
    <div className='cuerpo-carrusel'>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img className='imagen-zoe' src={imagen} alt='placeh'/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className='imagen-zoe' src={imagen} alt='placeh'/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className='imagen-zoe' src={imagen} alt='placeh'/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    
  );
}

export default UncontrolledExample;