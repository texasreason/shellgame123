import { motion } from "framer-motion";

interface CupProps {
  isRevealed: boolean;
  isShuffling: boolean;
  hasBall: boolean;
  onClick: () => void;
  index: number;
}

const Cup = ({ isRevealed, isShuffling, hasBall, onClick, index }: CupProps) => {
  return (
    <motion.div
      className="relative cursor-pointer w-32 h-40"
      initial={{ rotateX: 0 }}
      animate={{ rotateX: isRevealed ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      whileHover={{ scale: isRevealed || isShuffling ? 1 : 1.05 }}
    >
      <div className="absolute w-full h-full">
        {/* Shell Body */}
        <div className="absolute bottom-0 w-full h-4/5 bg-gradient-to-br from-red-700 to-red-500 rounded-t-[100px] transform-gpu perspective-1000 shadow-lg">
          {/* Shell Ridges */}
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-2 bg-red-600/30"
                style={{ top: `${(i + 1) * 20}%` }}
              />
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-red-800/20 rounded-t-[100px] transform-gpu skew-x-6"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-red-400/20 rounded-t-[100px] transform-gpu -skew-x-6"></div>
        </div>

        {/* Shell Base */}
        <div className="absolute bottom-0 w-full">
          <div className="h-4 bg-gradient-to-b from-red-900 to-red-800 rounded-full shadow-md"></div>
          <div className="h-2 bg-red-950 rounded-full -mt-1 opacity-50"></div>
        </div>

        {/* Ball */}
        {isRevealed && hasBall && (
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Ball highlight */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-200 rounded-full opacity-80"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Cup;