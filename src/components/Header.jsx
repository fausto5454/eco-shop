import React, { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes, FaRecycle } from 'react-icons/fa';
import EcoShoppingImage from '../assets/EcoShopping.png';
import logoImage from '../assets/logo.png';

const Header = ({ cartItemCount, onOpenCart, onNavigate, userPoints }) => {
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

    const handleNavigate = (page) => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-gradient-to-r from-yellow-200 via-green-500 to-yellow-200 shadow-lg sticky top-0 z-40">
            <div className="container mx-auto flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-blue-400"
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </button>
                    {/* Logo de EcoShopping siempre visible */}
                    <img src={EcoShoppingImage} alt="Logo de la Empresa" className="h-18 w-auto" />
                </div>

                <nav className="hidden md:flex flex-grow justify-center">
                    <ul className="flex space-x-8">
                        {navItems.map((item) => (
                            <li key={item.page}>
                                <button
                                    onClick={() => handleNavigate(item.page)}
                                    className={`${item.name === 'Recicla y Gana' ? 'text-green-700' : 'text-gray-700'} hover:text-red-500 font-bold text-lg transition-colors duration-200`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center space-x-4">
                    {/* Logo Institucional para escritorio */}
                    <img src={logoImage} alt="Logo Institucional" className="h-18 w-20 mr-4 hidden md:block" /> 
                    
                    {/* Logo Institucional para móvil */}
                    <img src={logoImage} alt="Logo Institucional" className="h-12 w-auto md:hidden" />
                    
                    <div className="hidden md:flex items-center space-x-1 text-sm font-bold text-gray-700">
                        <span>EcoPuntos:</span>
                        <span className="text-green-700">{userPoints}</span>
                    </div>
                    
                    <button onClick={onOpenCart} className="relative text-gray-700 hover:text-red-500 transition-colors duration-300">
                        <FaShoppingCart className="h-7 w-7" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-green-100 shadow-lg p-4">
                    <ul className="flex flex-col space-y-4">
                        <li className="py-2 text-green-700 font-bold text-2xl flex items-center justify-center">
                            <FaRecycle className="h-6 w-6 mr-2 text-green-500" />
                            EcoPuntos: {userPoints}
                        </li>
                        {navItems.map((item) => (
                            <li key={item.page}>
                                <button
                                    onClick={() => handleNavigate(item.page)}
                                    className={`${item.name === 'Recicla y Gana' ? 'text-green-700' : 'text-gray-700'} hover:text-red-500 font-bold text-lg transition-colors duration-200`}
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

export default Header;