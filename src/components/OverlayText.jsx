import React from 'react';

const OverlayText = ({ text, customTop }) => { // Añadimos 'customTop' como prop
    return (
        <div 
            className={`absolute ${customTop} left-1/2 -translate-x-1/2 text-center`} // Usamos customTop aquí
            style={{ 
                color: 'white', 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                textShadow: '2px 4px 4px rgba(0, 0, 0, 1)',
                whiteSpace: 'nowrap'
            }}
        >
            {text}
        </div>
    );
};

export default OverlayText;