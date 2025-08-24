import React from 'react';

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

export default Modal;