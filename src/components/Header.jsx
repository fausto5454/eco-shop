// src/components/Header.jsx
import React from 'react';

const Header = ({ cartItemCount, onOpenCart }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-green-700">EcoShop</a>
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300">Inicio</a></li>
            <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300">Nosotros</a></li>
            <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300">Productos</a></li>
            <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300">Pedidos</a></li>
            <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300">Ventas</a></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={onOpenCart} className="relative text-gray-600 hover:text-green-500 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Menú de hamburguesa para móviles */}
          <button className="md:hidden text-gray-600 hover:text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
