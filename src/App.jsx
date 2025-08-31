// src/App.jsx

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import RecyclingPointsPage from './components/RecyclingPointsPage';
import ProductsPage from './components/ProductsPage';

// Importa todos tus componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Modal from './components/Modal';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
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
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    setUserOrders(storedOrders);
    const storedSales = JSON.parse(localStorage.getItem("salesData")) || { total: 0, count: 0 };
    setSalesData(storedSales);
    const storedPoints = JSON.parse(localStorage.getItem("userPoints")) || 0;
    setUserPoints(storedPoints);
  }, []);

  useEffect(() => {
    localStorage.setItem("userPoints", JSON.stringify(userPoints));
  }, [userPoints]);

  const handleAddToCart = (product) => {
    // Lógica para añadir el producto al carrito
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  
    // Lógica para añadir ecopuntos si el producto es ecológico
    if (product.isEcoProduct) {
      setUserPoints(prevPoints => prevPoints + 10);
      alert(`¡Felicidades! Ganaste 10 EcoPuntos por tu compra ecológica.`);
    }

    // ELIMINA la línea "setIsCartOpen(true)" de aquí
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Nueva función para incrementar la cantidad de un producto
  const handleIncrementQuantity = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return prevItems;
    });
  };

  const handleDecrementQuantity = (product) => {
  setCartItems((prevItems) => {
    // Si la cantidad es 1, lo elimina del carrito
    if (product.quantity === 1) {
      return prevItems.filter((item) => item.id !== product.id);
    } 
    // Si la cantidad es mayor que 1, la disminuye en 1
    else {
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
   });
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
      localStorage.removeItem("userPoints");

      setUserOrders([]);
      setSalesData({ total: 0, count: 0 });
      setUserPoints(0);

      setIsModalOpen(false);
    });
  };

  const handleAddEcoPoints = (points) => {
    setUserPoints(prevPoints => prevPoints + points);
    setModalMessage(`¡Felicidades! Has añadido ${points} EcoPuntos.`);
    setIsModalOpen(true);
    setIsConfirmationModal(false);
  };

  const handleRedeemEcoPoints = (amount) => {
    if (userPoints >= amount) {
      setUserPoints(prevPoints => prevPoints - amount);
      setModalMessage(`¡Canje exitoso! Se ha aplicado un descuento de S/ ${amount / 20}.00`);
      setIsModalOpen(true);
      setIsConfirmationModal(false);
      return true;
    } else {
      setModalMessage('Puntos insuficientes para canjear.');
      setIsModalOpen(true);
      setIsConfirmationModal(false);
      return false;
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-green-100 bg-no-repeat bg-cover" 
      style={{ backgroundImage: `url('/src/assets/fondo_parallax.png')` }}
    >
      <div className="absolute inset-0 bg-green-500 opacity-60"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onOpenCart={handleOpenCart}
          onNavigate={setCurrentPage}
          userPoints={userPoints}
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
          {currentPage === "recyclingPoints" && (
            <RecyclingPointsPage
              userPoints={userPoints}
              onAddPoints={() => handleAddEcoPoints(20)}
              onRedeemPoints={() => handleRedeemEcoPoints(100)}
            />
          )}
        </main>

        <Footer />

        <Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onCloseCart={handleCloseCart}
          isCartOpen={isCartOpen}
          onCheckout={handleCheckout}
          onIncrementQuantity={handleIncrementQuantity} // Aquí pasas la nueva función
          onDecrementQuantity={handleDecrementQuantity}
        />

        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
          onConfirm={modalAction}
          isConfirmation={isConfirmationModal}
        />
      </div>
    </div>
  );
}

export default App;