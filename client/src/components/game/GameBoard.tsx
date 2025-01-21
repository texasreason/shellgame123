import Cup from './Cup';
import { motion } from 'framer-motion';

interface GameBoardProps {
  cups: boolean[];
  onCupClick: (index: number) => void;
  isRevealed: boolean;
  isShuffling: boolean;
}

const GameBoard = ({ cups, onCupClick, isRevealed, isShuffling }: GameBoardProps) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-8 my-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cups.map((hasBall, index) => (
        <Cup
          key={index}
          index={index}
          hasBall={hasBall}
          isRevealed={isRevealed}
          isShuffling={isShuffling}
          onClick={() => onCupClick(index)}
        />
      ))}
    </motion.div>
  );
};

export default GameBoard;