import React from 'react';

const SalesPage = ({ salesData, onClearData }) => {
    const hasData = salesData.count > 0;
    return (
      <div className="container mx-auto p-8 text-center bg-gradient-to-r from-green-100 to-green-100 min-h-screen">
        <h2 className="text-4xl font-bold text-green-800 mb-8">Resumen de Ventas</h2>
        <div className="max-w-xl mx-auto bg-white text-gray-600 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Total de Ventas Globales</h3>
          <p className="text-5xl font-extrabold">S/ {salesData.total.toFixed(2)}</p>
          <p className="text-lg mt-4">Pedidos procesados: {salesData.count}</p>
        </div>
        <button
          onClick={onClearData}
          disabled={!hasData}
          className={`mt-8 text-white font-bold py-3 px-6 rounded-full transition duration-300
            ${hasData ? 'bg-slate-700 hover:bg-red-400' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Eliminar Historial de Ventas y Pedidos
        </button>
      </div>
    );
};

export default SalesPage;