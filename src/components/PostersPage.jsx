import React from 'react';

// Importa las imágenes locales desde la carpeta 'assets'
import aficheOrganico from '../assets/afiche_organico.png';
import aficheReciclaje from '../assets/afiche_reciclaje.png';
import afichePersonal from '../assets/afiche_cuidado_personal.png';

const PostersPage = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen p-8 text-center">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-4">Descubre Nuestras Promociones</h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          En <span className="text-green-600 font-bold">Eco</span><span className="text-blue-600 font-bold">Shopping</span>, nuestro compromiso es contigo y con el planeta. Explora nuestros afiches y descubre cómo juntos podemos construir un futuro más sostenible.
        </p>

        {/* Afiche 1: Productos de la tierra */}
        <div className="bg-gray-100 rounded-3xl shadow-xl p-6 mb-12 transform transition-all duration-300 hover:scale-105">
          <img 
            src={aficheOrganico} 
            alt="Afiche de productos orgánicos y locales" 
            className="w-full h-150 rounded-2xl mb-4"
          />
          <p className="text-center text-gray-700 font-semibold text-lg">
            ¡Del campo a tu mesa! Disfruta de la frescura y el sabor de productos orgánicos cultivados localmente, apoyando a nuestros agricultores y cuidando tu salud.
          </p>
        </div>

        {/* Afiche 2: Cuidado personal y ofertas */}
        <div className="bg-gray-100 rounded-3xl shadow-xl p-6 mb-12 transform transition-all duration-300 hover:scale-105">
          <img 
            src={afichePersonal}
            alt="Afiche de productos de cuidado personal" 
            className="w-full h-150 rounded-2xl mb-4"
          />
          <p className="text-center text-gray-700 font-semibold text-lg">
            Cuida tu cuerpo y el planeta con nuestra línea de productos de cuidado personal. ¡Calidad, sostenibilidad y precios que te encantarán!
          </p>
        </div>

        {/* Afiche 3: Promociones y mensaje de marca */}
        <div className="bg-gray-100 rounded-3xl shadow-xl p-6 mb-12 transform transition-all duration-300 hover:scale-105">
          <img 
            src={aficheReciclaje} 
            alt="Afiche de promociones y reciclaje" 
            className="w-full h-150 rounded-2xl mb-4"
          />
          <p className="text-center text-gray-700 font-semibold text-lg">
            ¡Recicla, Recompensa, Rejuvenece! Te ofrecemos las mejores ofertas en productos ecológicos. Somos los únicos en la región con un compromiso real por la calidad y el medio ambiente.
          </p>
        </div>

        <p className="text-center text-2xl font-bold text-green-700 mt-16">
          "Cada pequeña elección sostenible hace una gran diferencia."
        </p>

        {/* Correct placement of the button */}
        <button 
          onClick={() => onNavigate('products')} 
          className="mt-8 py-2 px-4 text-lg bg-green-600 text-white font-bold rounded-2xl cursor-pointer hover:bg-green-400 transition-colors duration-300">
          Ver Productos
        </button>

      </div>
    </div>
  );
};

export default PostersPage;