export const generateInitialState = (): boolean[] => {
  const cups = new Array(5).fill(false);
  let ballsPlaced = 0;
  
  while (ballsPlaced < 2) {
    const randomIndex = Math.floor(Math.random() * 5);
    if (!cups[randomIndex]) {
      cups[randomIndex] = true;
      ballsPlaced++;
    }
  }
  
  return cups;
};

export const shuffleCups = (cups: boolean[]): boolean[] => {
  const shuffled = [...cups];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
