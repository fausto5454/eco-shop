import React from 'react';

const OrdersPage = ({ orders }) => {
  const methodClass = (m) => {
    if (m === 'Tarjeta') return 'text-blue-600 font-semibold';
    if (m === 'Yape') return 'text-orange-400 font-semibold';
    if (m === 'Plin') return 'text-green-600 font-semibold';
    return 'text-gray-700 font-semibold';
  };
  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-green-200 to-yellow-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Mis Pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Aún no has realizado ningún pedido.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <span className="font-bold text-gray-900">Pedido #{order.id.slice(0, 8)}</span>
                <span className="text-sm text-gray-500">
                  {order.timestamp && new Date(order.timestamp).toLocaleString()}
                </span>
              </div>

              {order.method && (
                <p className="mb-3 text-gray-700">
                  Método de pago: <span className={methodClass(order.method)}>{order.method}</span>
                </p>
              )}

              <ul className="space-y-3">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">{item.name} (x{item.quantity})</span>
                    <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-green-200">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-green-700">S/ {order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;