import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Perfil from './pages/Perfil/Perfil.js';
import Registro from './pages/Registro/Registro.js';
import Carrito from './pages/Carrito/Carrito.js';
import Navbar from './components/Navbar/Navbar.js';
import Navbar2 from './components/Navbar2/Navbar2.js';
import Categoria from './pages/Categoria/Categoria.js';
import AccessibilityButton from './components/AccessibilityButton/AccessibilityButton.js';
import ProductoInfo from './pages/ProductoInfo/ProductoInfo.js';
import Compra from './pages/Compra/Compra.js';
import Footer from './components/Footer/Footer.js';
import ProcesandoPedido from './pages/ProcesandoPedido/ProcesandoPedido.js';
import PedidoExito from './pages/PedidoExito/PedidoExito.js';
import './App.css';

function App() {
  const location = useLocation();

  // Condicionar si la ruta actual es compra, procesando pedido o pedido exito
  const isSpecialPage = ['/compra', '/procesando-pedido', '/pedido-exito'].includes(location.pathname);

  return (
    <>
      <div className='whole-page'>
        {/* Mostrar Navbar2 en las páginas de compra, procesando pedido o pedido exito, de lo contrario, mostrar Navbar */}
        {isSpecialPage ? <Navbar2 /> : <Navbar />}
        
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
              <Route path='/procesando-pedido' element={<ProcesandoPedido />} />
              <Route path='/pedido-exito' element={<PedidoExito />} />
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

