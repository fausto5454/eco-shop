// src/components/Carousel.jsx

import React from "react";
import Slider from "react-slick";

// Asegúrate de que las imágenes estén en tu carpeta 'assets'
import aficheOrganicoImage from "../assets/afiche_organico.png";
import afichePersonalImage from "../assets/afiche_cuidado_personal.png";
import aficheReciclajeImage from "../assets/afiche_reciclaje.png";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true, // Muestra flechas de navegación
  };

  const images = [
    aficheOrganicoImage,
    afichePersonalImage,
    aficheReciclajeImage
  ];

  return (
    // Contenedor del carrusel con ancho máximo y centrado
    <div className="container mx-auto mt-8 max-w-4xl overflow-hidden"> {/* Modificado aquí */}
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img 
              src={img} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-auto mx-auto object-cover rounded-lg shadow-lg" // Modificado aquí
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;