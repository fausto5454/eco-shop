// src/components/Cart.jsx
import React from 'react';

// Este componente muestra el contenido del carrito de compras en una barra lateral.
const Cart = ({ cartItems, onRemoveFromCart, onCloseCart, isCartOpen, onCheckout }) => {
  // Calcula el precio total de todos los artículos en el carrito.
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Clase CSS para controlar la visibilidad del carrito usando una transición.
  const cartVisibilityClass = isCartOpen ? 'translate-x-0' : 'translate-x-full';

  // Función para simular el pago y finalizar la compra.
  const handlePayment = (method) => {
    alert(`Simulando pago con ${method}... ¡Pago exitoso!`);
    onCheckout();
  };

  return (
    // Contenedor principal del carrito. Se posiciona fijo a la derecha.
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${cartVisibilityClass}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Tu Carrito</h2>
        {/* Botón para cerrar la barra del carrito. */}
        <button onClick={onCloseCart} className="text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contenedor de la lista de productos, con scroll si hay muchos artículos. */}
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 240px)' }}>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">El carrito está vacío.</p>
        ) : (
          cartItems.map(item => (
            // Tarjeta de cada producto en el carrito.
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500">
                    Cantidad: {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              {/* Botón para eliminar un producto del carrito. */}
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sección del total y los botones de pago. */}
      <div className="absolute bottom-0 w-full p-4 border-t bg-white">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-center font-semibold text-gray-700">Elige tu método de pago</h4>
            <button
              onClick={() => handlePayment('Tarjeta')}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition duration-300"
            >
              Pagar con Tarjeta
            </button>
            <button
              onClick={() => handlePayment('Yape')}
              className="w-full bg-yellow-400 text-gray-800 py-3 rounded-full font-bold hover:bg-yellow-500 transition duration-300"
            >
              Pagar con Yape
            </button>
            <button
              onClick={() => handlePayment('Plin')}
              className="w-full bg-purple-600 text-white py-3 rounded-full font-bold hover:bg-purple-700 transition duration-300"
            >
              Pagar con Plin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;