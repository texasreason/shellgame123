import { motion } from "framer-motion";

interface CupProps {
  isRevealed: boolean;
  hasBall: boolean;
  onClick: () => void;
  index: number;
}

const Cup = ({ isRevealed, hasBall, onClick, index }: CupProps) => {
  return (
    <motion.div
      className="relative cursor-pointer w-32 h-40"
      initial={{ rotateX: 0 }}
      animate={{ rotateX: isRevealed ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      whileHover={{ scale: isRevealed ? 1 : 1.05 }}
    >
      <div className="absolute w-full h-full">
        {/* Cup Body */}
        <div className="absolute bottom-0 w-full h-4/5 bg-red-600 rounded-t-lg transform-gpu perspective-1000">
          <div className="absolute top-0 left-0 w-full h-full bg-red-700 rounded-t-lg transform-gpu skew-x-6"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-red-500 rounded-t-lg transform-gpu -skew-x-6"></div>
        </div>
        
        {/* Cup Rim */}
        <div className="absolute bottom-0 w-full h-4 bg-red-800 rounded-full"></div>
        
        {/* Ball */}
        {isRevealed && hasBall && (
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Cup;
