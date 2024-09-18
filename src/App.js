import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Perfil from './pages/Perfil/Perfil.js';
import Carrito from './pages/Carrito/Carrito.js';
import Navbar from './components/Navbar/Navbar.js';
import Categoria from './pages/Categoria/Categoria.js';
import AccessibilityButton from './components/AccessibilityButton/AccessibilityButton.js';
import Footer from './components/Footer/Footer.js';
import './App.css';

function App() {
  return (
    <>
      <Navbar />  
      <div className="page-content">
        <div className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categoria/:id' element={<Categoria />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/carrito' element={<Carrito />} />
          </Routes>
        </div>
        <Footer />
      </div>

      {/* Botón de accesibilidad */}
      <AccessibilityButton />
      
    </>
  );
}

export default App;
