import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart, onCloseCart, isCartOpen, onCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const cartVisibilityClass = isCartOpen ? 'translate-x-0' : 'translate-x-full';

  const handlePayment = (method) => {
    onCheckout(method);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${cartVisibilityClass} border-l-4 border-green-600`}
      >
        <div className="flex justify-between items-center p-6 border-b-2">
          <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
          <button onClick={onCloseCart} className="text-gray-500 hover:text-gray-800 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 240px)' }}>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">El carrito está vacío.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b last:border-b-0 py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4 shadow" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Cantidad: {item.quantity} x S/ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
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
        <div className="absolute bottom-0 w-full p-6 border-t-2 bg-white shadow-inner">
          <div className="flex justify-between items-center text-xl font-bold text-gray-900">
            <span>Total:</span>
            <span>S/ {total.toFixed(2)}</span>
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
    </>
  );
};

export default Cart;