import React, { useState } from 'react';
import EcoShoppingImage from '../assets/EcoShopping.png';
import logoImage from '../assets/logo.png';

const Header = ({ cartItemCount, onOpenCart, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: 'Inicio', page: 'home' },
    { name: 'Nosotros', page: 'about' },
    { name: 'Productos', page: 'products' },
    { name: 'Pedidos', page: 'orders' },
    { name: 'Ventas', page: 'sales' },
    { name: 'Publicidad', page: 'posters' },
    { name: 'Contactos', page: 'contacts' },
    { name: 'Recicla y Gana', page: 'recyclingPoints' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-yellow-200 via-green-400 to-yellow-100 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between p-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
          >
            <div className="hamburger-icon">
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-open' : ''}`}></span>
            </div>
          </button>
          <img src={EcoShoppingImage} alt="Logo de la Empresa" className="h-20 w-35" />
        </div>
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8">
            {navItems.map(item => (
              <li key={item.page}>
                <button
                  onClick={() => onNavigate(item.page)}
                  // Aplica el color verde solo a "Recicla y Gana"
                  className={`${item.name === 'Recicla y Gana' ? 'text-green-600 hover:text-yellow-500' : 'text-gray-700'} hover:text-red-500 font-bold text-2xl transition-colors duration-200`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          <img src={logoImage} alt="Logo Institucional" className="h-18 w-20 mr-10" />
          <button onClick={onOpenCart} className="relative text-gray-700 hover:text-red-500 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-yellow-200 via-yellow-100 to-white shadow-lg p-4">
          <ul className="flex flex-col space-y-4">
            {navItems.map(item => (
              <li key={item.page}>
                <button
                  onClick={() => {
                    onNavigate(item.page);
                    toggleMobileMenu();
                  }}
                  // Aplica el color verde solo a "Recicla y Gana"
                  className={`${item.name === 'Recicla y Gana' ? 'text-green-600 hover:text-yellow-500' : 'text-gray-700'} hover:text-red-500 font-bold text-2xl transition-colors duration-200`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
<li className="nav-item">
  <a href="#" onClick={() => onNavigate('recyclingPoints')}>
    Recicla y Gana
  </a>
</li>
export default Header;