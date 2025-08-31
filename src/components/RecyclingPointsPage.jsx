import React from 'react';

// El componente ahora recibe props para los puntos y las funciones
const RecyclingPointsPage = ({ userPoints, onAddPoints, onRedeemPoints }) => {

  const handleAddPoints = () => {
    // Llama a la función que viene del componente padre
    onAddPoints(20);
  };

  const handleRedeemPoints = () => {
    // Llama a la función que viene del componente padre
    onRedeemPoints(100);
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-100 min-h-screen p-8 text-center">
      <div className="container mx-auto max-w-2xl bg-white p-8 rounded-4xl shadow-xl">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Mis EcoPuntos</h2>
        <p className="text-lg text-gray-600 mb-8">
          ¡Contribuye con el medio ambiente y obtén recompensas por ello!
        </p>

        <div className="bg-yellow-200 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-green-700">
            Total de Puntos Acumulados
          </h3>
          <p className="text-5xl font-extrabold text-green-600 mt-4">{userPoints}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleAddPoints}
            className="bg-green-700 text-white font-bold py-3 px-4 rounded-full text-lg hover:bg-green-400 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Añadir 20 Puntos por Reciclar
          </button>
          <button
            onClick={handleRedeemPoints}
            className="bg-blue-800 text-white font-bold py-3 px-4 rounded-full text-lg hover:bg-blue-400 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Canjear 100 Puntos (S/5.00)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecyclingPointsPage;