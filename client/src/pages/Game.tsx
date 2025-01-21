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
  const [revealedCups, setRevealedCups] = useState<boolean[]>(new Array(5).fill(true));
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentMove, setCurrentMove] = useState<[number, number] | null>(null);
  const [roundComplete, setRoundComplete] = useState(false);
  const moveSequenceRef = useRef<Array<[number, number]>>([]);
  const moveIndexRef = useRef(0);
  const { toast } = useToast();

  const handleCupClick = (index: number) => {
    if (isShuffling || revealedCups[index] || roundComplete) return;

    const newRevealedCups = [...revealedCups];
    newRevealedCups[index] = true;
    setRevealedCups(newRevealedCups);

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

    // Check if all balls have been found or if two guesses have been made
    const guessesUsed = newRevealedCups.filter(revealed => revealed).length;
    const ballsFound = gameState.reduce((count, hasBall, i) => 
      count + (hasBall && newRevealedCups[i] ? 1 : 0), 0);

    if (ballsFound === 2 || guessesUsed >= 2) {
      setRoundComplete(true);
      // Reveal all cups at the end of the round
      setRevealedCups(new Array(5).fill(true));
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

    // Update game state after move completion
    setTimeout(() => {
      setGameState(prevState => shuffleCups(prevState, move[0], move[1]));
      moveIndexRef.current++;
      setTimeout(performNextMove, 100); // Small delay between moves
    }, MOVE_DURATION);
  };

  const startNewRound = () => {
    // Reset game state
    const newState = generateInitialState();
    setGameState(newState);
    setRevealedCups(new Array(5).fill(true)); // Show all cups initially
    setIsShuffling(false);
    setCurrentMove(null);
    setRoundComplete(false);
    moveIndexRef.current = 0;

    // Generate new sequence of moves
    moveSequenceRef.current = generateMoveSequence(8);

    // After reveal duration, hide cups and start shuffling
    setTimeout(() => {
      setRevealedCups(new Array(5).fill(false));
      setIsShuffling(true);
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
          {revealedCups.every(revealed => revealed) && !isShuffling && (
            <p className="text-lg font-semibold text-primary">Watch carefully where the balls are!</p>
          )}
          {isShuffling && (
            <p className="text-lg font-semibold text-primary animate-pulse">Shuffling cups...</p>
          )}
          {!isShuffling && !revealedCups.every(revealed => revealed) && (
            <p className="text-lg font-semibold text-primary">
              {roundComplete ? "Round Complete!" : "Find the balls! (2 guesses max)"}
            </p>
          )}
        </div>

        <GameBoard 
          cups={gameState}
          onCupClick={handleCupClick}
          revealedCups={revealedCups}
          isShuffling={isShuffling}
          currentMove={currentMove}
        />

        <div className="mt-8 flex justify-center">
          <Button
            onClick={startNewRound}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
            disabled={isShuffling || (!roundComplete && !revealedCups.every(revealed => revealed))}
          >
            {roundComplete ? "Start New Round" : "Watch Carefully"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;