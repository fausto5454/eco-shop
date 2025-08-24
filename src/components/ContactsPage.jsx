import React, { useState } from 'react';

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
            className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-500 transition duration-300"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactsPage;