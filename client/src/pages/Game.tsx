import { useState, useEffect, useRef } from 'react';
import GameBoard from '@/components/game/GameBoard';
import ScoreBoard from '@/components/game/ScoreBoard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateInitialState, shuffleCups, generateMoveSequence } from '@/lib/game';

const REVEAL_DURATION = 2000; // 2 seconds to show initial balls
const MOVE_DURATION = 500; // 0.5 seconds per move

const Game = () => {
  const [gameState, setGameState] = useState(generateInitialState());
  const [score, setScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentMove, setCurrentMove] = useState<[number, number] | null>(null);
  const moveSequenceRef = useRef<Array<[number, number]>>([]);
  const moveIndexRef = useRef(0);
  const { toast } = useToast();

  const handleCupClick = (index: number) => {
    if (isRevealed || isShuffling) return;

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

  const performNextMove = () => {
    if (moveIndexRef.current >= moveSequenceRef.current.length) {
      setIsShuffling(false);
      setCurrentMove(null);
      moveIndexRef.current = 0;
      return;
    }

    const move = moveSequenceRef.current[moveIndexRef.current];
    setCurrentMove(move);
    setGameState(prevState => shuffleCups(prevState, move[0], move[1]));

    moveIndexRef.current++;
    setTimeout(performNextMove, MOVE_DURATION);
  };

  const startNewRound = () => {
    const newState = generateInitialState();
    setGameState(newState);
    setIsRevealed(true);
    setIsShuffling(false);
    setCurrentMove(null);
    moveIndexRef.current = 0;

    // Generate a new sequence of moves
    moveSequenceRef.current = generateMoveSequence(8); // 8 moves per round

    // Show balls initially, then start shuffling
    setTimeout(() => {
      setIsShuffling(true);
      setIsRevealed(false);
      performNextMove();
    }, REVEAL_DURATION);
  };

  // Start first round
  useEffect(() => {
    startNewRound();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-yellow-500 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/90 rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Carnival Shell Game</h1>

        <ScoreBoard score={score} />

        <div className="text-center mb-4">
          {isRevealed && !isShuffling && (
            <p className="text-lg font-semibold text-primary">Watch carefully where the balls are!</p>
          )}
          {isShuffling && (
            <p className="text-lg font-semibold text-primary animate-pulse">Shuffling cups...</p>
          )}
          {!isRevealed && !isShuffling && (
            <p className="text-lg font-semibold text-primary">Find the balls!</p>
          )}
        </div>

        <GameBoard 
          cups={gameState}
          onCupClick={handleCupClick}
          isRevealed={isRevealed}
          isShuffling={isShuffling}
          currentMove={currentMove}
        />

        <div className="mt-8 flex justify-center">
          <Button
            onClick={startNewRound}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
            disabled={isShuffling}
          >
            {isRevealed ? "Start New Round" : "Reset Game"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;