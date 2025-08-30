import React from 'react';
import canastaImage from '../assets/canasta.png';
import AdComponent from './AdComponent';
import Carousel from './Carousel'; // <-- ¡Asegúrate de importar tu componente de carrusel aquí!

const HomePage = ({ onNavigate }) => (
  <div className="bg-gradient-to-r from-green-200 to-green-200 min-h-screen flex flex-col items-center p-8">
    <Carousel /> {/* <-- ¡Añadido aquí! */}

    <div className="container mx-auto flex flex-col md:flex-row items-center justify-center p-12 bg-white rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-12">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Un futuro <span className="text-green-600">sostenible</span> a tu alcance
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          En <span className="text-green-600 font-bold">Eco</span><span className="text-blue-600 font-bold">Shopping</span>, nos dedicamos a ofrecer productos ecológicos de alta calidad que te ayudan a cuidar el planeta sin sacrificar tu estilo de vida.
        </p>
        <button 
          onClick={() => onNavigate('products')}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition duration-300 transform hover:scale-110 shadow-lg"
        >
          Explora nuestros productos
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src={canastaImage}
          alt="Productos ecológicos en una canasta"
          className="rounded-full shadow-xl w-full max-w-sm"
        />
      </div>
    </div>
  </div>
);

export default HomePage;