export const getRandomRGB = () => {
  const r = Math.floor(Math.random() * 156) + 100; 
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r}, ${g}, ${b})`;
};
