import React from 'react';
import fotoReflexionImage from '../assets/foto_reflexion.png';
import OverlayText from './OverlayText.jsx'; // Importa el componente renombrado

const AboutPage = () => {
    return (
        <div className="container mx-auto p-8 text-gray-800 bg-gradient-to-r from-green-100 to-green-100">
            <h2 className="text-4xl font-bold text-center text-green-800 mb-8">Nuestra Historia</h2>
            
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 max-w-4xl mx-auto">
                {/* Image and Text Container - WIDER COLUMN */}
                <div className="w-full md:w-[35%] flex-shrink-0 relative">
                    <img 
                        src={fotoReflexionImage} 
                        alt="Equipo de EcoShopping" 
                        className="mt-25 w-full h-auto rounded-lg shadow-lg"
                        /> 

                    {/* Render the text components over the image */}
                    <OverlayText 
                        text="Equipo emprendedor"
                        customTop="top-0" // Ajusta este valor para la primera línea
                    />
                    <OverlayText 
                        text="EcoShopping 2025"
                        customTop="top-9" // Ajusta este valor para la segunda línea
                    />
                     <OverlayText 
                        text="I.E. N° 2079-A.R."
                        customTop="top-83" // Ajusta este valor para la segunda línea
                    />
                </div>
                
                {/* The rest of the page content (text, etc.) - NARROWER COLUMN */}
                <div className="w-full md:w-[65%] space-y-6 text-lg leading-relaxed">
                    <p className='text-slate-900 text-justify'>
                        En <span className="text-green-600 font-bold text-2xl">Eco</span><span className="text-blue-600 font-bold text-2xl">Shopping</span>, creemos firmemente que un consumo consciente puede marcar una gran diferencia. Somos un equipo emprendedor de estudiantes raimondinos fundado en 2025, nuestra misión es simple: Hacer que sea fácil para las personas elegir productos que sean buenos para ellos y para el planeta. Nos apasiona la sostenibilidad y trabajamos incansablemente para crear una colección de productos ecológicos que sean de alta calidad, duraderos y hermosos.
                    </p>
                    <p className='text-slate-900 text-justify'>
                        Cada artículo en nuestra tienda ha sido cuidadosamente seleccionado y probado para asegurar que cumple con nuestros estrictos estándares éticos y ecológicos. Colaboramos con artesanos y pequeños productores locales que comparten nuestros valores, garantizando que cada compra apoya a la comunidad y a prácticas de producción responsables.
                    </p>
                    <p className='text-slate-900 text-justify'>
                        Gracias por unirte a nosotros en este viaje hacia un futuro más sostenible. Juntos, podemos hacer del mundo un lugar mejor, un producto a la vez.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;