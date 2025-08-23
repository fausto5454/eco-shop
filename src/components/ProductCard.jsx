// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;