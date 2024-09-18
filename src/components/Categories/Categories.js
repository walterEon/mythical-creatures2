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
      <div className='categoria' onClick={() => handleClick('Dragón')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Dragón</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Fénix')}>
        <div className='imagen-container'>
        <img src={icono} alt='dragon'></img>
        </div>  
        <label>Fénix</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Unicornio')}>
        <div className='imagen-container'>
        <img src={icono} alt='dragon'></img>
        </div>
        <label>Unicornio</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Basilisco')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Basilisco</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Niffler')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Niffler</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Grindylow')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Grindylow</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Bowtruckle')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Bowtruckle</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Erumpent')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Erumpent</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Acromantula')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Acromantula</label>
      </div>
      <div className='categoria' onClick={() => handleClick('Mantícora')}>
        <div className='imagen-container'>
            <img src={icono} alt='dragon'></img>
        </div>
        <label>Mantícora</label>
      </div>
    </div>
  );
}

export default Categories;