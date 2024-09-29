import { useState } from 'react';
import './Registro.css';
import {FaMicrophone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dni, setDni] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [escuchando, setEscuchando] = useState(false);
    const [micActivo, setMicActivo] = useState('');

    const navigate = useNavigate();

    // Configuración de reconocimiento de voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const reconocimiento = new SpeechRecognition();

    reconocimiento.continuous = false;
    reconocimiento.lang = "es-ES";
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    const iniciarEscuchaParaCampo = (campo) => {
        setMicActivo(campo);
        setEscuchando(true);
        reconocimiento.start();

        reconocimiento.onresult = (event) => {
            let transcript = event.results[0][0].transcript;
            transcript= transcript.replace(' arroba ', '@');
            // Asignar el texto reconocido al campo correcto
            if (campo === 'nombre') setNombre(transcript);
            else if (campo === 'apellido') setApellido(transcript);
            else if (campo === 'telefono') setTelefono(transcript);
            else if (campo === 'dni') setDni(transcript);
            else if (campo === 'correo') setCorreo(transcript);
            else if (campo === 'contrasena') setContrasena(transcript);

            setEscuchando(false);
            setMicActivo('');
        };
    };

    reconocimiento.onspeechend = () => {
        reconocimiento.stop();
        setEscuchando(false);
        setMicActivo('');
    };

    reconocimiento.onerror = (event) => {
        console.error("Error al reconocer la voz: ", event.error);
        setEscuchando(false);
        setMicActivo('');
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(user => user.email === correo)) {
          alert('An account with this email already exists');
          return;
        }
        
        const newUser = {
          nombre,
          apellido,
          telefono,
          dni,
          email: correo,
          password: contrasena
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('userSession', JSON.stringify(newUser));
        
        navigate('/perfil');
      };

    // Replace the existing handleLogin function in Registro.js with this:
const handleLogin = (e) => {
    e.preventDefault();
    handleRegistration(e);
  };

    return (
        <div className='registro-page'>
    <h1>Regístrate con nosotros</h1>
    <div className='form-container'>
        <div className='form-grid'>
            <div className='form-section'>
                <label>Nombres:</label>
                <div className='input-with-icon'>
                    <input 
                        type='text' 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                    />
                    <FaMicrophone
                        className="mic-icon"
                        onClick={() => iniciarEscuchaParaCampo('nombre')}
                        size={23}
                        style={{ color:  micActivo === 'nombre' ? 'red' : 'black' }}
                    />
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
                    <FaMicrophone
                        className="mic-icon"
                        onClick={() => iniciarEscuchaParaCampo('apellido')}
                        size={23}
                        style={{ color:  micActivo === 'apellido' ? 'red' : 'black' }}
                    />
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
                    <FaMicrophone
                        className="mic-icon"
                        onClick={() => iniciarEscuchaParaCampo('telefono')}
                        size={23}
                        style={{ color:  micActivo === 'telefono' ? 'red' : 'black' }}
                    />
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
                    <FaMicrophone
                        className="mic-icon"
                        onClick={() => iniciarEscuchaParaCampo('dni')}
                        size={23}
                        style={{ color:  micActivo === 'dni' ? 'red' : 'black' }}
                    />
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
                    <FaMicrophone
                        className="mic-icon"
                        onClick={() => iniciarEscuchaParaCampo('correo')}
                        size={23}
                        style={{ color:  micActivo === 'correo' ? 'red' : 'black' }}
                    />
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
                    <FaMicrophone
                        className="mic-icon"
                        onClick={() => iniciarEscuchaParaCampo('contrasena')}
                        size={23}
                        style={{ color:  micActivo === 'contrasena' ? 'red' : 'black' }}
                    />
                </div>
            </div>
        </div>
        <button className='submit-button' onClick={handleLogin}>Registrarse</button>
    </div>
    {escuchando && (
        <div className="mic-popup">
            <p>Te estamos escuchando...</p>
        </div>
    )}
</div>

    );
}

export default Registro;