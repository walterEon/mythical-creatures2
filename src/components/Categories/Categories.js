import './Categories.css';
import icono from './sea-dragon_38125.jpg';
import { useNavigate } from 'react-router-dom';

function Categories() {

    const navigate = useNavigate();
  
    const handleClick = (id) => {
        navigate(`/categoria/${id}`);
    }

  return (
    <div className="categories-container">
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Dragón')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Dragón</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Fénix')}>
        <img src={icono} alt='dragon'></img>
        </div>  
        <label>Fénix</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Unicornio')}>
        <img src={icono} alt='dragon'></img>
        </div>
        <label>Unicornio</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Basilisco')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Basilisco</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Niffler')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Niffler</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Grindylow')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Grindylow</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Bowtruckle')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Bowtruckle</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Erumpent')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Erumpent</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Acromantula')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Acromantula</label>
      </div>
      <div className='categoria' >
        <div className='imagen-container' onClick={() => handleClick('Mantícora')}>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Mantícora</label>
      </div>
    </div>
  );
}

export default Categories;