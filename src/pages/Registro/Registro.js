import { useState } from 'react';
import './Registro.css';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dni, setDni] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('userSession', 'active');
        navigate('/perfil');
      };

    return (
        <div className='registro-page'>
            <h1>Regístrate con nosotros</h1>
            <div className='form-container'>
                <div className='form-section'>
                    <label>Nombres:</label>
                    <div className='input-with-icon'>
                        <input 
                            type='text' 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                        <span className='icono-microfono'>🎤</span>
                    </div>
                </div>

                <div className='form-section'>
                    <label>Apellidos:</label>
                    <div className='input-with-icon'>
                        <input 
                            type='text' 
                            value={apellido} 
                            onChange={(e) => setApellido(e.target.value)} 
                        />
                        <span className='icono-microfono'>🎤</span>
                    </div>
                </div>

                <div className='form-section'>
                    <label>Teléfono:</label>
                    <div className='input-with-icon'>
                        <input 
                            type='text' 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                        />
                        <span className='icono-microfono'>🎤</span>
                    </div>
                </div>

                <div className='form-section'>
                    <label>DNI:</label>
                    <div className='input-with-icon'>
                        <input 
                            type='text' 
                            value={dni} 
                            onChange={(e) => setDni(e.target.value)} 
                        />
                        <span className='icono-microfono'>🎤</span>
                    </div>
                </div>

                <div className='form-section'>
                    <label>Correo:</label>
                    <div className='input-with-icon'>
                        <input 
                            type='email' 
                            value={correo} 
                            onChange={(e) => setCorreo(e.target.value)} 
                        />
                        <span className='icono-microfono'>🎤</span>
                    </div>
                </div>

                <div className='form-section'>
                    <label>Contraseña:</label>
                    <div className='input-with-icon'>
                        <input 
                            type='password' 
                            value={contrasena} 
                            onChange={(e) => setContrasena(e.target.value)} 
                        />
                        <span className='icono-microfono'>🎤</span>
                    </div>
                </div>

                <button className='submit-button' onClick={handleLogin}>Registrarse</button>
            </div>
        </div>
    );
}

export default Registro;
