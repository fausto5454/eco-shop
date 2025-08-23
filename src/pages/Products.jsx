// src/pages/Products.jsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const productsData = [
  { id: 1, name: 'Jabón Artesanal', description: 'Jabón hecho a mano con ingredientes naturales.', price: 5.00, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Cepillo de Bambú', description: 'Cepillo de dientes de bambú biodegradable.', price: 3.50, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Bolsa de Tela Orgánica', description: 'Bolsa reutilizable de algodón orgánico.', price: 12.00, image: 'https://via.placeholder.com/150' },
];

const Products = ({ onAddToCart }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestros Productos Ecológicos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsData.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Products;