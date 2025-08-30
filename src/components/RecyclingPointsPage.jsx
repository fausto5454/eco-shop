// src/components/RecyclingPointsPage.jsx

import React, { useState, useEffect } from 'react';
import { getPoints, addPoints, redeemPoints } from '../utils/pointsManager';

const Page = () => {
  // ... otras condiciones
  if (currentPage === 'recyclingPoints') {
    return <RecyclingPointsPage />;
  }
  // ...
};
const RecyclingPointsPage = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Carga los puntos al iniciar el componente
    setPoints(getPoints());
  }, []);

  const handleAddPoints = () => {
    // Añade 50 puntos por cada "reciclaje"
    const newPoints = addPoints(50);
    setPoints(newPoints);
    alert('¡Felicidades! Has añadido 50 EcoPuntos por reciclar.');
  };

  const handleRedeemPoints = () => {
    // Canjea 100 puntos por un descuento, por ejemplo
    const success = redeemPoints(100);
    if (success) {
      setPoints(getPoints()); // Actualiza los puntos
      alert('¡Canje exitoso! Se ha aplicado un descuento de S/1.00');
    } else {
      alert('Puntos insuficientes para canjear.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-200 to-green-200 min-h-screen p-8 text-center">
      <div className="container mx-auto max-w-2xl bg-white p-8 rounded-4xl shadow-xl">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Mis EcoPuntos</h2>
        <p className="text-lg text-gray-600 mb-8">
          ¡Contribuye con el medio ambiente y obtén recompensas por ello!
        </p>

        <div className="bg-yellow-200 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-green-600">
            Total de Puntos Acumulados
          </h3>
          <p className="text-5xl font-extrabold text-green-600 mt-4">{points}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleAddPoints}
            className="bg-green-700 text-white font-bold py-3 px-4 rounded-full text-lg hover:bg-green-400 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Añadir 50 Puntos por Reciclar
          </button>
          <button
            onClick={handleRedeemPoints}
            className="bg-blue-800 text-white font-bold py-3 px-4 rounded-full text-lg hover:bg-blue-400 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Canjear 100 Puntos (S/1.00)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecyclingPointsPage;