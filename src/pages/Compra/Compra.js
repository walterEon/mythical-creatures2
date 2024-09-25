import './Compra.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Compra() {

    const [entrega, setEntrega] = useState('domicilio');
    const [metodoPago, setMetodoPago] = useState('tarjeta');
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
      }, []);

      // Generar un ID único para el pedido
  const generateOrderId = () => {
    return 'order-' + Math.random().toString(36).substr(2, 9);
  };

      const finishOrder = () => {
        // Generar ID de pedido y crear el objeto del pedido
    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      entrega,
      metodoPago,
      fecha: new Date().toISOString(),
    };

    // Obtener la lista de pedidos almacenados en localStorage, si existe
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Añadir el nuevo pedido a la lista de pedidos
    storedOrders.push(newOrder);

    // Guardar la lista de pedidos actualizada en localStorage
    localStorage.setItem('orders', JSON.stringify(storedOrders));

    // Vaciar el carrito
    localStorage.removeItem('cart');
    setCartItems([]);

    // Redirigir a la página de "Pedido en proceso"
    navigate('/procesando-pedido');
    };

    
    

      const backCarrito = () => {
        navigate('/carrito');
      }

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

                
            </form>
        </div>
                        </div>

                        <div className='paso-dir'>
                            
                            <div className='form-entrega'>
            <h3 className='form-title'>
                <span className='icon'>🏠</span> Dirección de envío
            </h3>
            
            
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
                        <div className='paso-pago'>
                            

                            <div className='form-pago'>
            <h3 className='form-title'>
                <span className='icon'>💳</span> Método de pago
            </h3>

            <div className='opciones-pago'>
                <button 
                    className={`pago-btn ${metodoPago === 'tarjeta' ? 'active' : ''}`} 
                    onClick={() => setMetodoPago('tarjeta')}
                >
                    Tarjeta de crédito
                    <span className='icon'>💳</span>
                </button>
                <button 
                    className={`pago-btn ${metodoPago === 'contraentrega' ? 'active' : ''}`} 
                    onClick={() => setMetodoPago('contraentrega')}
                >
                    Pago contra entrega
                    <span className='icon'>📦</span>
                </button>
            </div>

            {metodoPago === 'tarjeta' && (
                <div className='detalles-tarjeta'>
                    <label htmlFor='numero'>Número</label>
                    <input type='text' id='numero' placeholder='Número de tarjeta' />

                    

                    <label htmlFor='cuotas'>¿En cuántas cuotas deseas pagar?</label>
                    <select id='cuotas'>
                        <option value='1'>1 cuota</option>
                        <option value='3'>3 cuotas</option>
                        <option value='6'>6 cuotas</option>
                    </select>

                    <label htmlFor='nombre'>Nombre y Apellido como figura en la tarjeta</label>
                    <input type='text' id='nombre' placeholder='Nombre en la tarjeta' />

                    <div className='vencimiento-seguridad'>
                        <div>
                            <label htmlFor='mes'>Fecha de Vencimiento</label>
                            <div className='fecha-vencimiento'>
                                <select id='mes'>
                                    <option value=''>MM</option>
                                    <option value='01'>01</option>
                                    <option value='02'>02</option>
                                    <option value='03'>03</option>
                                    {/* Agrega más meses */}
                                </select>
                                <select id='año'>
                                    <option value=''>AA</option>
                                    <option value='23'>23</option>
                                    <option value='24'>24</option>
                                    {/* Agrega más años */}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='codigo'>Código de Seguridad</label>
                            <input type='text' id='codigo' placeholder='CVV' />
                        </div>
                    </div>
                </div>
            )}

            <h4>Dirección de facturación</h4>

            <div className='direccion-facturacion'>
                <label htmlFor='calle'>Calle *</label>
                <input type='text' id='calle' placeholder='Calle' />

                <div className='numero-piso'>
                    <label htmlFor='numero'>Número</label>
                    <input type='text' id='numero' placeholder='Número' />
                    <label htmlFor='piso'>Piso o Departamento (ej: 2A)</label>
                    <input type='text' id='piso' placeholder='Opcional' />
                </div>

                <label htmlFor='departamento'>Departamento *</label>
                <select id='departamento'>
                    <option value=''>Seleccione</option>
                    <option value='Lima'>Lima</option>
                    <option value='Cusco'>Cusco</option>
                    {/* Agrega más departamentos */}
                </select>

                <label htmlFor='provincia'>Provincia *</label>
                <select id='provincia'>
                    <option value=''>Seleccione</option>
                    <option value='Lima'>Lima</option>
                    {/* Agrega más provincias */}
                </select>

                <label htmlFor='distrito'>Distrito *</label>
                <select id='distrito'>
                    <option value=''>Seleccione</option>
                    <option value='Miraflores'>Miraflores</option>
                    {/* Agrega más distritos */}
                </select>
            </div>
        </div>
                        </div>
                    </div>
                </div>

                <div className='resumen-compra'>
                    <h3>Resumen de compra</h3>
                    <div className="cart-items">
              {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <div className="item-quantity">
                        
                        <span>{item.quantity} </span>
                        
                      </div>
                      <p>S/ {item.price * item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="cart-summary">
                <p>Subtotal: S/ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                <p>Costo de entrega: GRATIS</p>
                <h4>Total: S/ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
                <button className="view-cart-btn" onClick={finishOrder}>FINALIZAR PEDIDO</button>
                <button className="view-cart-btn" onClick={backCarrito}>VOLVER A CARRITO</button>
              </div>
            )}
                </div>

            </div>
            
            
                
        </div>
    )
}

export default Compra;