import React from 'react';

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-5 flex flex-col justify-between h-56">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-2xl font-bold text-green-700">S/ {product.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;