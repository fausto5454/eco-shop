import React from 'react';

const AboutPage = () => (
  <div className="container mx-auto p-8 text-gray-800 bg-gradient-to-r from-green-200 to-green-200">
    <h2 className="text-4xl font-bold text-center text-slate-900 mb-8">Nuestra Historia</h2>
    <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
      <p className='text-slate-900'>
        En <span className="text-green-600 font-bold underline">Eco</span><span className="text-blue-600 font-bold underline">Shopping</span>, creemos firmemente que un consumo consciente puede marcar una gran diferencia. Fundada en 2025, nuestra misión es simple: Hacer que sea fácil para las personas elegir productos que sean buenos para ellos y para el planeta. Nos apasiona la sostenibilidad y trabajamos incansablemente para crear una colección de productos ecológicos que sean de alta calidad, duraderos y hermosos.
      </p>
      <p className='text-slate-900'>
        Cada artículo en nuestra tienda ha sido cuidadosamente seleccionado y probado para asegurar que cumple con nuestros estrictos estándares éticos y ecológicos. Colaboramos con artesanos y pequeños productores locales que comparten nuestros valores, garantizando que cada compra apoya a la comunidad y a prácticas de producción responsables.
      </p>
      <p className='text-slate-900'>
        Gracias por unirte a nosotros en este viaje hacia un futuro más sostenible. Juntos, podemos hacer del mundo un lugar mejor, un producto a la vez.
      </p>
    </div>
  </div>
);

export default AboutPage;