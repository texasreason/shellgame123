import Cup from './Cup';
import { motion } from 'framer-motion';

interface GameBoardProps {
  cups: boolean[];
  onCupClick: (index: number) => void;
  isRevealed: boolean;
  isShuffling: boolean;
  currentMove: [number, number] | null;
}

const GameBoard = ({ cups, onCupClick, isRevealed, isShuffling, currentMove }: GameBoardProps) => {
  // Calculate positions in a circle
  const radius = 150; // radius of the circle
  const positions = cups.map((_, index) => {
    const angle = (index / cups.length) * 2 * Math.PI - Math.PI / 2; // Start from top
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  });

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center my-12">
      {cups.map((hasBall, index) => {
        const isMoving = currentMove && (index === currentMove[0] || index === currentMove[1]);
        const targetIndex = currentMove && index === currentMove[0] ? currentMove[1] : index;

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ x: positions[index].x, y: positions[index].y }}
            animate={{ 
              x: positions[targetIndex].x,
              y: positions[targetIndex].y,
              scale: isMoving ? 1.1 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <Cup
              index={index}
              hasBall={hasBall}
              isRevealed={isRevealed}
              isShuffling={isShuffling}
              onClick={() => onCupClick(index)}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default GameBoard;