// src/App.jsx

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

// Importa todos tus componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Modal from './components/Modal';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProductsPage from './components/ProductsPage';
import OrdersPage from './components/OrdersPage';
import SalesPage from './components/SalesPage';
import ContactsPage from './components/ContactsPage';
import PostersPage from './components/PostersPage';

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

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    setUserOrders(storedOrders);
    const storedSales = JSON.parse(localStorage.getItem("salesData")) || { total: 0, count: 0 };
    setSalesData(storedSales);
  }, []);

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

  const handleCheckout = (method) => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: Math.random().toString(36).substring(2, 9),
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      timestamp: new Date().toISOString(),
      method,
    };

    const currentOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    const currentSales = JSON.parse(localStorage.getItem("salesData")) || { total: 0, count: 0 };
    
    const updatedOrders = [...currentOrders, newOrder];
    const updatedSales = {
      total: currentSales.total + newOrder.total,
      count: currentSales.count + 1,
    };

    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
    localStorage.setItem("salesData", JSON.stringify(updatedSales));

    setUserOrders(updatedOrders);
    setSalesData(updatedSales);
    
    setCartItems([]);
    setIsCartOpen(false);

    setModalMessage(`¡Compra realizada con éxito usando ${method} por un total de S/ ${newOrder.total.toFixed(2)}!`);
    setIsModalOpen(true);
    setIsConfirmationModal(false);

    setTimeout(() => {
      setCurrentPage('orders');
      setIsModalOpen(false);
    }, 2000); 
  };

  const handleClearData = () => {
    setModalMessage("¿Estás seguro de que deseas eliminar el historial?");
    setIsModalOpen(true);
    setIsConfirmationModal(true);
    setModalAction(() => () => {
      localStorage.removeItem("userOrders");
      localStorage.removeItem("salesData");

      setUserOrders([]);
      setSalesData({ total: 0, count: 0 });

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
        {currentPage === "posters" && <PostersPage onNavigate={setCurrentPage} />}
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