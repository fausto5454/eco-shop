// src/utils/pointsManager.js

const KEY = "ecoShoppingPoints";

export const getPoints = () => {
  const points = localStorage.getItem(KEY);
  return points ? parseInt(points, 10) : 0;
};

export const addPoints = (amount) => {
  const currentPoints = getPoints();
  const newPoints = currentPoints + amount;
  localStorage.setItem(KEY, newPoints.toString());
  return newPoints;
};

export const redeemPoints = (amount) => {
  const currentPoints = getPoints();
  if (currentPoints >= amount) {
    const newPoints = currentPoints - amount;
    localStorage.setItem(KEY, newPoints.toString());
    return { success: true, newPoints };
  }
  return { success: false, newPoints: currentPoints };
};