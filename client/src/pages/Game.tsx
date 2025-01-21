import { useState, useEffect } from 'react';
import GameBoard from '@/components/game/GameBoard';
import ScoreBoard from '@/components/game/ScoreBoard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateInitialState, shuffleCups } from '@/lib/game';

const Game = () => {
  const [gameState, setGameState] = useState(generateInitialState());
  const [score, setScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const { toast } = useToast();

  const handleCupClick = (index: number) => {
    if (isRevealed) return;
    
    setIsRevealed(true);
    if (gameState[index]) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "You found a ball!",
        variant: "default",
      });
    } else {
      toast({
        title: "Wrong!",
        description: "No ball under this cup",
        variant: "destructive",
      });
    }
  };

  const startNewRound = () => {
    const newState = generateInitialState();
    setGameState(newState);
    setIsRevealed(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState(shuffleCups(gameState));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-yellow-500 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/90 rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Carnival Shell Game</h1>
        
        <ScoreBoard score={score} />
        
        <GameBoard 
          cups={gameState}
          onCupClick={handleCupClick}
          isRevealed={isRevealed}
        />

        <div className="mt-8 flex justify-center">
          <Button
            onClick={startNewRound}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
          >
            {isRevealed ? "Play Again" : "Reset Game"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
