// src/components/ProductsPage.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard'; 
import jabonImage from '../assets/jabon.jpg';
import cepilloImage from '../assets/cepillo.jpg';
import bolsaImage from '../assets/bolsa.jpg';
import champuImage from '../assets/champu.jpg';
import cremaImage from '../assets/crema.jpg';
import canastaImage from '../assets/canasta.png';
import granolaImage from '../assets/granola.png';
import mielImage from '../assets/miel.png';
import quinuaImage from '../assets/quinua.png';
import jugoImage from '../assets/jugo.png';
import teHierbasImage from '../assets/teHierbas.png';
import packTeImage from '../assets/packTe.png';
import botellaImage from '../assets/botella.png';
import croquetasImage from '../assets/croquetas.png';
import snacksGatosImage from '../assets/snacksGatos.png';
import galletasPerrosImage from '../assets/galletasPerros.png';
import compostImage from '../assets/compost.png';
import humusImage from '../assets/humus.png';
import biofertilizanteImage from '../assets/biofertilizante.png';
import kitImage from '../assets/kit.png';
import packBolsasImage from '../assets/packBolsas.png';

const productsData = {
  "Alimentos Ecológicos": [
    { id: 1, name: 'Granola Orgánica', description: 'Mezcla nutritiva de avena, semillas y frutos secos.', price: 18.00, image: granolaImage, isEcoProduct: true },
    { id: 2, name: 'Miel de Abeja Pura', description: 'Miel 100% natural, sin aditivos ni conservantes.', price: 25.00, image: mielImage, isEcoProduct: true },
    { id: 3, name: 'Harina Integral de Quinua', description: 'Fuente de proteínas vegetales y fibra natural.', price: 15.00, image: quinuaImage, isEcoProduct: true },
  ],
  "Bebidas Naturales": [
    { id: 4, name: 'Jugo Verde', description: 'Bebida natural con espinaca, apio y manzana.', price: 12.00, image: jugoImage, isEcoProduct: false },
    { id: 5, name: 'Té de Hierbas Orgánicas', description: 'Infusión relajante con manzanilla y menta.', price: 10.00, image: teHierbasImage, isEcoProduct: true },
    { id: 6, name: 'Pack de té de Hierbas Orgánicas', description: 'Infusión relajante de hierba luisa, cedrón, eucalipto, manzanilla y muña.', price: 35.00, image: packTeImage, isEcoProduct: true },
  ],
  "Reciclaje y Reutilizables": [
    { id: 7, name: 'Cepillo de Dientes de Bambú', description: 'Biodegradable, con cerdas suaves.', price: 8.50, image: cepilloImage, isEcoProduct: true },
    { id: 8, name: 'Bolsa de Algodón Orgánico', description: 'Reutilizable y resistente para tus compras.', price: 15.00, image: bolsaImage, isEcoProduct: true },
    { id: 9, name: 'Botella de Acero Inoxidable', description: 'Ideal para mantener bebidas frías o calientes.', price: 20.00, image: botellaImage, isEcoProduct: true },
  ],
  "Cuidado Personal y Belleza": [
    { id: 10, name: 'Jabón de Aceite de Coco', description: 'Jabón hecho a mano con ingredientes 100% orgánicos.', price: 15.00, image: jabonImage, isEcoProduct: true },
    { id: 11, name: 'Champú Sólido de Manzanilla', description: 'Pastilla sin plástico para cabello graso.', price: 20.00, image: champuImage, isEcoProduct: true },
    { id: 12, name: 'Crema Hidratante de Karité', description: 'Nutre y repara la piel seca.', price: 17.00, image: cremaImage, isEcoProduct: false },
  ],
  "Alimento para Mascotas": [
    { id: 13, name: 'Croquetas Naturales para Perros', description: 'Elaboradas con ingredientes frescos y sin conservantes.', price: 40.00, image: croquetasImage, isEcoProduct: false },
    { id: 14, name: 'Snacks Orgánicos para Gatos', description: 'Galletas con proteínas y sin aditivos.', price: 22.00, image: snacksGatosImage, isEcoProduct: true },
    { id: 15, name: 'Galletas Orgánicos para Perros', description: 'Galletas con avena, zanahoria, manzana o mantequilla de maní natural.', price: 15.00, image: galletasPerrosImage, isEcoProduct: true },
  ],
  "Abonos y Fertilizantes Orgánicos": [
    { id: 16, name: 'Compost Orgánico', description: 'Fertilizante natural para mejorar la tierra.', price: 30.00, image: compostImage, isEcoProduct: true },
    { id: 17, name: 'Humus de Lombriz', description: 'Aporta nutrientes esenciales para plantas.', price: 28.00, image: humusImage, isEcoProduct: true },
    { id: 18, name: 'Biofertilizante', description: 'Aporta macronutrientes esenciales, nitrógeno, fósforo, potasio y micronutrientes para las plantas.', price: 30.00, image: biofertilizanteImage, isEcoProduct: true },
  ],
  "Kits y Regalos Eco": [
    { id: 19, name: 'Canasta Eco Amigable', description: 'Incluye varios productos ecológicos para regalo.', price: 40.00, image: canastaImage, isEcoProduct: true },
    { id: 20, name: 'Kit Zero Waste', description: 'Set de productos reutilizables para un estilo de vida sostenible.', price: 55.00, image: kitImage, isEcoProduct: true },
    { id: 21, name: 'Pack de bolsas biodegradables', description: 'Pack de bolsas biodegradables de diferentes medidas por 50 unidades.', price: 15.00, image: packBolsasImage, isEcoProduct: true },
  ],
};

const ProductsPage = ({ onAddToCart }) => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-10">
          Nuestros Productos Ecológicos
        </h2>
        {Object.entries(productsData).map(([category, products]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;