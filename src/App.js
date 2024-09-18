import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.js';
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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categoria/:id' element={<Categoria />} />
        </Routes>
      </div>

      {/* Botón de accesibilidad */}
      <AccessibilityButton />
      <Footer />
    </>
  );
}

export default App;
