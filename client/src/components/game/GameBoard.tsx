import Cup from './Cup';
import { motion } from 'framer-motion';

interface GameBoardProps {
  cups: boolean[];
  onCupClick: (index: number) => void;
  isRevealed: boolean;
  isShuffling: boolean;
}

const GameBoard = ({ cups, onCupClick, isRevealed, isShuffling }: GameBoardProps) => {
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
      {cups.map((hasBall, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ x: positions[index].x, y: positions[index].y }}
          animate={{ 
            x: positions[isShuffling ? (index + 2) % cups.length : index].x,
            y: positions[isShuffling ? (index + 2) % cups.length : index].y
          }}
          transition={{
            duration: 0.5,
            repeat: isShuffling ? Infinity : 0,
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
      ))}
    </div>
  );
};

export default GameBoard;