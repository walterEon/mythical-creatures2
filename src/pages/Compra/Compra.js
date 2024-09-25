import './Compra.css';
import { useState } from 'react';

function Compra() {

    const [entrega, setEntrega] = useState('domicilio');

    return(
        <div className='compra-page'>
            <header>
            <h1>FINALIZAR COMPRA</h1>
            </header>
            <div className='cuerpo-compra'>

                <div className='pasos-compra'>
                    <div className='pasos-superior'>
                        <div className='paso-id'>
                            
                            <div className='form-identificacion'>
            <h3 className='form-title'>
                <span className='icon'>👤</span> Identificación
            </h3>
            <p>Solicitamos únicamente la información esencial para la finalización de la compra.</p>
            
            <form className='identificacion-form'>
                <div className='form-group'>
                    <label htmlFor='email'>Correo*</label>
                    <input type='email' id='email' name='email' defaultValue='walterfernando1201@gmail.com' />
                </div>
                
                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor='nombre'>Nombre*</label>
                        <input type='text' id='nombre' name='nombre' defaultValue='fegefg' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='apellidos'>Apellidos*</label>
                        <input type='text' id='apellidos' name='apellidos' defaultValue='fgfegwrerg' />
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor='tipo-doc'>Tipo de documento</label>
                        <select id='tipo-doc' name='tipo-doc'>
                            <option value='DNI'>DNI</option>
                            <option value='Pasaporte'>Pasaporte</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='documento'>Documento*</label>
                        <input type='text' id='documento' name='documento' defaultValue='43523452' />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='telefono'>Teléfono / Móvil*</label>
                    <input type='text' id='telefono' name='telefono' defaultValue='932202786' />
                </div>

                <button className='factura-btn'>Quiero factura</button>

                <a href='#' className='metodo-entrega-link'>IR A MÉTODO DE ENTREGA</a>
            </form>
        </div>
                        </div>

                        <div className='paso-dir'>
                            
                            <div className='form-entrega'>
            <h3 className='form-title'>
                <span className='icon'>🏠</span> Dirección de envío
            </h3>
            <p>
                Nuestros productos se encuentran en diferentes centros de distribución. Por ello, hemos separado las fechas de envío para que puedan llegar lo más pronto posible a tu domicilio.
            </p>
            <p>Por favor, para continuar selecciona una de las opciones que se listan</p>
            
            <div className='opciones-entrega'>
                <button 
                    className={`entrega-btn ${entrega === 'domicilio' ? 'active' : ''}`} 
                    onClick={() => setEntrega('domicilio')}
                >
                    Despacho a domicilio
                </button>
                <button 
                    className={`entrega-btn ${entrega === 'tienda' ? 'active' : ''}`} 
                    onClick={() => setEntrega('tienda')}
                >
                    Recojo en tienda
                </button>
            </div>

            {entrega === 'domicilio' && (
                <div className='direccion'>
                    <label htmlFor='direccion'>Dirección</label>
                    <input 
                        type='text' 
                        id='direccion' 
                        placeholder='Ej.: Av. José Pardo, 850, Miraflores, Lima' 
                    />
                </div>
            )}
        </div>
                        </div>
                    </div>

                    <div className='pasos-inferior'>
                        <div className='paso-dir'>
                            <h3>Método de pago</h3>
                        </div>
                    </div>
                </div>

                <div className='resumen-compra'>
                    <h3>Resumen de compra</h3>
                </div>

            </div>
            
            
                
        </div>
    )
}

export default Compra;