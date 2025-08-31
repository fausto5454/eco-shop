// src/context/PointsContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. Crea el contexto
const PointsContext = createContext();

// 2. Crea un "hook" personalizado para usarlo fácilmente
export const usePoints = () => useContext(PointsContext);

// 3. Crea el proveedor que envuelve tu aplicación
export const PointsProvider = ({ children }) => {
    const [userPoints, setUserPoints] = useState(0);

    const addPoints = (amount) => {
        setUserPoints(prevPoints => prevPoints + amount);
    };

    const redeemPoints = (amount) => {
        if (userPoints >= amount) {
            setUserPoints(prevPoints => prevPoints - amount);
            return true;
        }
        return false;
    };

    const value = { userPoints, addPoints, redeemPoints };

    return (
        <PointsContext.Provider value={value}>
            {children}
        </PointsContext.Provider>
    );
};