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

export const generateMoveSequence = (numMoves: number): Array<[number, number]> => {
  const sequence: Array<[number, number]> = [];
  for (let i = 0; i < numMoves; i++) {
    const from = Math.floor(Math.random() * 5);
    let to = Math.floor(Math.random() * 4);
    if (to >= from) to += 1; // Avoid same position
    sequence.push([from, to]);
  }
  return sequence;
};

export const shuffleCups = (cups: boolean[], fromIndex: number, toIndex: number): boolean[] => {
  const shuffled = [...cups];
  const temp = shuffled[fromIndex];
  shuffled[fromIndex] = shuffled[toIndex];
  shuffled[toIndex] = temp;
  return shuffled;
};