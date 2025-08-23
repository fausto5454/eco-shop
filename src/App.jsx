// src/App.jsx
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AdComponent from './components/AdComponent';
import PostersPage from './components/PostersPage';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';


const tailwindStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}
`;

import EcoShoppingImage from './assets/EcoShopping.png';
import logoImage from './assets/logo.png';
import jabonImage from './assets/jabon.jpg';
import cepilloImage from './assets/cepillo.jpg';
import bolsaImage from './assets/bolsa.jpg';
import champuImage from './assets/champu.jpg';
import cremaImage from './assets/crema.jpg';
import canastaImage from './assets/canasta.png';
import granolaImage from './assets/granola.png';
import mielImage from './assets/miel.png';
import quinuaImage from './assets/quinua.png';
import jugoImage from './assets/jugo.png';
import teHierbasImage from './assets/teHierbas.png';
import packTeImage from './assets/packTe.png';
import botellaImage from './assets/botella.png';
import croquetasImage from './assets/croquetas.png';
import snacksGatosImage from './assets/snacksGatos.png';
import galletasPerrosImage from './assets/galletasPerros.png';
import compostImage from './assets/compost.png';
import humusImage from './assets/humus.png';
import biofertilizanteImage from './assets/biofertilizante.png';
import kitImage from './assets/kit.png';
import packBolsasImage from './assets/packBolsas.png';

const productsData = {
  "Alimentos Ecológicos": [
    { id: 1, name: 'Granola Orgánica', description: 'Mezcla nutritiva de avena, semillas y frutos secos.', price: 18.00, image: granolaImage },
    { id: 2, name: 'Miel de Abeja Pura', description: 'Miel 100% natural, sin aditivos ni conservantes.', price: 25.00, image: mielImage },
    { id: 3, name: 'Harina Integral de Quinua', description: 'Fuente de proteínas vegetales y fibra natural.', price: 15.00, image: quinuaImage },
  ],
  "Bebidas Naturales": [
    { id: 4, name: 'Jugo Verde', description: 'Bebida natural con espinaca, apio y manzana.', price: 12.00, image: jugoImage },
    { id: 5, name: 'Té de Hierbas Orgánicas', description: 'Infusión relajante con manzanilla y menta.', price: 10.00, image: teHierbasImage },
    { id: 6, name: 'Pack de té de Hierbas Orgánicas', description: 'Infusión relajante de hierba luisa, cedrón, eucalipto, manzanilla y muña.', price: 35.00, image: packTeImage },
  ],
  "Reciclaje y Reutilizables": [
    { id: 7, name: 'Cepillo de Dientes de Bambú', description: 'Biodegradable, con cerdas suaves.', price: 8.50, image: cepilloImage },
    { id: 8, name: 'Bolsa de Algodón Orgánico', description: 'Reutilizable y resistente para tus compras.', price: 15.00, image: bolsaImage },
    { id: 9, name: 'Botella de Acero Inoxidable', description: 'Ideal para mantener bebidas frías o calientes.', price: 20.00, image: botellaImage },
  ],
  "Cuidado Personal y Belleza": [
    { id: 10, name: 'Jabón de Aceite de Coco', description: 'Jabón hecho a mano con ingredientes 100% orgánicos.', price: 15.00, image: jabonImage },
    { id: 11, name: 'Champú Sólido de Manzanilla', description: 'Pastilla sin plástico para cabello graso.', price: 20.00, image: champuImage },
    { id: 12, name: 'Crema Hidratante de Karité', description: 'Nutre y repara la piel seca.', price: 17.00, image: cremaImage },
  ],
  "Alimento para Mascotas": [
    { id: 13, name: 'Croquetas Naturales para Perros', description: 'Elaboradas con ingredientes frescos y sin conservantes.', price: 40.00, image: croquetasImage },
    { id: 14, name: 'Snacks Orgánicos para Gatos', description: 'Galletas con proteínas y sin aditivos.', price: 22.00, image: snacksGatosImage },
    { id: 15, name: 'Galletas Orgánicos para Perros', description: 'Galletas con avena, zanahoria, manzana o mantequilla de maní natural.', price: 15.00, image: galletasPerrosImage },
  ],
  "Abonos y Fertilizantes Orgánicos": [
    { id: 16, name: 'Compost Orgánico', description: 'Fertilizante natural para mejorar la tierra.', price: 30.00, image: compostImage },
    { id: 17, name: 'Humus de Lombriz', description: 'Aporta nutrientes esenciales para plantas.', price: 28.00, image: humusImage },
    { id: 18, name: 'Biofertilizante', description: 'Aporta macronutrientes esenciales, nitrógeno, fósforo, potasio y micronutrientes para las plantas.', price: 30.00, image: biofertilizanteImage },
  ],
  "Kits y Regalos Eco": [
    { id: 19, name: 'Canasta Eco Amigable', description: 'Incluye varios productos ecológicos para regalo.', price: 40.00, image: canastaImage },
    { id: 20, name: 'Kit Zero Waste', description: 'Set de productos reutilizables para un estilo de vida sostenible.', price: 55.00, image: kitImage },
    { id: 21, name: 'Pack de bolsas biodegradables', description: 'Pack de bolsas biodegradables de diferentes medidas por 50 unidades.', price: 15.00, image: packBolsasImage },
  ],
};

const ProductsPage = ({ onAddToCart }) => (
  <div className="bg-gradient-to-r from-green-200 to-yellow-100 min-h-screen p-8">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Nuestros Productos Ecológicos
      </h2>
      {Object.entries(productsData).map(([category, products]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

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
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-green-100 via-green-100 to-white shadow-lg sticky top-0 z-40">
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
          <img src={EcoShoppingImage} alt="Logo de la Empresa" className="h-22 w-22" />
        </div>
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8">
            {navItems.map(item => (
              <li key={item.page}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className="text-gray-700 hover:text-red-500 font-bold text-2xl transition-colors duration-200"
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
                  className="text-gray-700 hover:text-red-500 font-bold text-lg w-full text-left"
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

const Modal = ({ isOpen, message, onClose, onConfirm, isConfirmation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto transform transition-all scale-100 duration-300">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{isConfirmation ? 'Confirmar Acción' : '¡Éxito!'}</h3>
          <p className="text-gray-700 mb-6">{message}</p>
        </div>
        <div className="flex justify-around space-x-4">
          {isConfirmation && (
            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white py-2 rounded-full font-semibold hover:bg-green-400 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={() => (onConfirm ? onConfirm() : onClose())}
            className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-400 transition-colors"
          >
            {isConfirmation ? 'Confirmar' : 'Aceptar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = ({ cartItems, onRemoveFromCart, onCloseCart, isCartOpen, onCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartVisibilityClass = isCartOpen ? 'translate-x-0' : 'translate-x-full';
  const handlePayment = (method) => {
    onCheckout(method);
  };
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${cartVisibilityClass} border-l-4 border-green-600`}
      >
        <div className="flex justify-between items-center p-6 border-b-2">
          <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
          <button onClick={onCloseCart} className="text-gray-500 hover:text-gray-800 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 240px)' }}>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">El carrito está vacío.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b last:border-b-0 py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4 shadow" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Cantidad: {item.quantity} x S/ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
        <div className="absolute bottom-0 w-full p-6 border-t-2 bg-white shadow-inner">
          <div className="flex justify-between items-center text-xl font-bold text-gray-900">
            <span>Total:</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          {cartItems.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-center font-semibold text-gray-700">Elige tu método de pago</h4>
              <button
                onClick={() => handlePayment('Tarjeta')}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition duration-300"
              >
                Pagar con Tarjeta
              </button>
              <button
                onClick={() => handlePayment('Yape')}
                className="w-full bg-yellow-400 text-gray-800 py-3 rounded-full font-bold hover:bg-yellow-500 transition duration-300"
              >
                Pagar con Yape
              </button>
              <button
                onClick={() => handlePayment('Plin')}
                className="w-full bg-purple-600 text-white py-3 rounded-full font-bold hover:bg-purple-700 transition duration-300"
              >
                Pagar con Plin
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white p-6 text-center shadow-inner">
    <p>&copy; 2025 <span className='text-green-400'>Eco</span><span className='text-blue-400'>Shop</span>. Todos los derechos reservados.</p>
  </footer>
);

const HomePage = ({ onNavigate }) => (
  <div className="bg-gradient-to-r from-green-200 to-yellow-100 min-h-screen flex items-center justify-center p-8">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-center p-12 bg-white rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-12">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Un futuro <span className="text-green-600">sostenible</span> a tu alcance
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          En <span className="text-green-600 font-bold">Eco</span><span className="text-blue-600 font-bold">Shop</span>, nos dedicamos a ofrecer productos ecológicos de alta calidad que te ayudan a cuidar el planeta sin sacrificar tu estilo de vida.
        </p>
        <button 
          onClick={() => onNavigate('products')}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition duration-300 transform hover:scale-110 shadow-lg"
        >
          Explora nuestros productos
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src={canastaImage}
          alt="Productos ecológicos en una canasta"
          className="rounded-full shadow-xl w-full max-w-sm"
        />
        </div>
    </div>
    <AdComponent />
  </div>
);

const AboutPage = () => (
  <div className="container mx-auto p-8 text-gray-800 bg-gradient-to-r from-green-200 to-yellow-100">
    <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Nuestra Historia</h2>
    <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
      <p>
        En <span className="text-green-600 font-bold">Eco</span><span className="text-blue-600 font-bold">Shop</span>, creemos firmemente que un consumo consciente puede marcar una gran diferencia. Fundada en 2025, nuestra misión es simple: Hacer que sea fácil para las personas elegir productos que sean buenos para ellos y para el planeta. Nos apasiona la sostenibilidad y trabajamos incansablemente para crear una colección de productos ecológicos que sean de alta calidad, duraderos y hermosos.
      </p>
      <p>
        Cada artículo en nuestra tienda ha sido cuidadosamente seleccionado y probado para asegurar que cumple con nuestros estrictos estándares éticos y ecológicos. Colaboramos con artesanos y pequeños productores locales que comparten nuestros valores, garantizando que cada compra apoya a la comunidad y a prácticas de producción responsables.
      </p>
      <p>
        Gracias por unirte a nosotros en este viaje hacia un futuro más sostenible. Juntos, podemos hacer del mundo un lugar mejor, un producto a la vez.
      </p>
    </div>
    </div>
);

const OrdersPage = ({ orders }) => {
  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-green-200 to-yellow-100">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Mis Pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Aún no has realizado ningún pedido.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <span className="font-bold text-gray-900">Pedido #{order.id.slice(0, 8)}</span>
                <span className="text-sm text-gray-500">
                  {order.timestamp && new Date(order.timestamp).toLocaleString()}
                </span>
              </div>
              <ul className="space-y-3">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">{item.name} (x{item.quantity})</span>
                    <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-green-200">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-green-700">S/ {order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SalesPage = ({ salesData, onClearData }) => {
    const hasData = salesData.count > 0;
    return (
      <div className="container mx-auto p-8 text-center bg-gradient-to-r from-green-200 to-yellow-100 min-h-screen">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Resumen de Ventas</h2>
        <div className="max-w-xl mx-auto bg-white text-gray-600 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Total de Ventas Globales</h3>
          <p className="text-5xl font-extrabold">S/ {salesData.total.toFixed(2)}</p>
          <p className="text-lg mt-4">Pedidos procesados: {salesData.count}</p>
        </div>
        <button
          onClick={onClearData}
          disabled={!hasData}
          className={`mt-8 text-white font-bold py-3 px-6 rounded-full transition duration-300
            ${hasData ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Eliminar Historial de Ventas y Pedidos
        </button>
      </div>
    );
};

const ContactsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado:', formData);
    alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-r from-green-200 to-yellow-100 min-h-screen p-8">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Contáctanos</h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          ¿Tienes alguna pregunta o comentario? Rellena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-4xl shadow-lg space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-500 transition duration-300"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [salesData, setSalesData] = useState({ total: 0, count: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);

  // 1. useEffect para leer del localStorage al cargar
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    setUserOrders(storedOrders);
    const storedSales = JSON.parse(localStorage.getItem("salesData")) || { total: 0, count: 0 };
    setSalesData(storedSales);
  }, []);

  // 2. Nuevo useEffect para escribir en el localStorage cada vez que los estados cambian
  useEffect(() => {
    localStorage.setItem("userOrders", JSON.stringify(userOrders));
    localStorage.setItem("salesData", JSON.stringify(salesData));
  }, [userOrders, salesData]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  // 3. Modificación en la función de checkout: solo actualiza el estado, no el localStorage
  const handleCheckout = (method) => {
    if (cartItems.length === 0) return;

    const newOrder = {
        id: Math.random().toString(36).substring(2, 9),
        items: cartItems,
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        timestamp: new Date().toISOString(),
    };

    const updatedOrders = [...userOrders, newOrder];
    const updatedSales = {
        total: salesData.total + newOrder.total,
        count: salesData.count + 1,
    };

    setUserOrders(updatedOrders);
    setSalesData(updatedSales);
    
    // Las siguientes líneas se eliminan porque el nuevo useEffect las maneja:
    // localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
    // localStorage.setItem("salesData", JSON.stringify(updatedSales));

    setCartItems([]);
    setIsCartOpen(false);
    setCurrentPage('orders');

    setModalMessage(`¡Compra realizada con éxito usando ${method} por un total de S/ ${newOrder.total.toFixed(2)}!`);
    setIsModalOpen(true);
    setIsConfirmationModal(false);
};

  // 4. Modificación en la función de borrado: solo actualiza el estado, no el localStorage
  const handleClearData = () => {
    setModalMessage("¿Estás seguro de que deseas eliminar el historial?");
    setIsModalOpen(true);
    setIsConfirmationModal(true);
    setModalAction(() => () => {
      setUserOrders([]);
      setSalesData({ total: 0, count: 0 });
      // Las siguientes líneas se eliminan porque el nuevo useEffect las maneja:
      // localStorage.removeItem("userOrders");
      // localStorage.removeItem("salesData");
      setIsModalOpen(false);
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={handleOpenCart}
        onNavigate={setCurrentPage}
      />

      <main className="flex-grow">
        {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "products" && <ProductsPage onAddToCart={handleAddToCart} />}
        {currentPage === "orders" && <OrdersPage orders={userOrders} />}
        {currentPage === "sales" && (
          <SalesPage salesData={salesData} onClearData={handleClearData} />
        )}
        {currentPage === "contacts" && <ContactsPage />}
        {currentPage === "posters" && <PostersPage />}
      </main>

      <Footer />

      <Cart
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onCloseCart={handleCloseCart}
        isCartOpen={isCartOpen}
        onCheckout={handleCheckout}
      />

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalAction}
        isConfirmation={isConfirmationModal}
      />
    </div>
  );
}

export default App;