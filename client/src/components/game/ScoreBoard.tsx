import { Card } from '@/components/ui/card';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard = ({ score }: ScoreBoardProps) => {
  return (
    <Card className="bg-white/50 p-4 text-center mb-8">
      <h2 className="text-2xl font-bold text-primary mb-2">Score</h2>
      <p className="text-4xl font-bold">{score}</p>
    </Card>
  );
};

export default ScoreBoard;
