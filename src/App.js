import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Perfil from './pages/Perfil/Perfil.js';
import Registro from './pages/Registro/Registro.js';
import Carrito from './pages/Carrito/Carrito.js';
import Navbar from './components/Navbar/Navbar.js';
import Categoria from './pages/Categoria/Categoria.js';
import AccessibilityButton from './components/AccessibilityButton/AccessibilityButton.js';
import ProductoInfo from './pages/ProductoInfo/ProductoInfo.js';
import Compra from './pages/Compra/Compra.js';
import Footer from './components/Footer/Footer.js';
import './App.css';

function App() {
  return (
    <>
    <div className='whole-page'> 
      <Navbar />  
      <div className="page-content">
        <div className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categoria/:id' element={<Categoria />} />
            <Route path='/producto-info/:id' element={<ProductoInfo />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/compra' element={<Compra />} />
          </Routes>
        </div>
        <Footer />
      </div>

      {/* Botón de accesibilidad */}
      <AccessibilityButton />

  </div>
      
    </>
  );
}

export default App;
