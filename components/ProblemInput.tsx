import React from 'react';

interface ProblemInputProps {
  problem: string;
  onProblemChange: (problem: string) => void;
  onSolve: () => void;
  isLoading: boolean;
}

export const ProblemInput: React.FC<ProblemInputProps> = ({ problem, onProblemChange, onSolve, isLoading }) => {
  return (
    <div className="flex flex-col space-y-4">
      <textarea
        className="w-full p-4 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 text-gray-200 placeholder-gray-500"
        rows={4}
        placeholder="e.g., A 2kg ball is thrown upwards with an initial velocity of 20 m/s. What is the maximum height it reaches?"
        value={problem}
        onChange={(e) => onProblemChange(e.target.value)}
        disabled={isLoading}
        aria-label="Physics Problem Input"
      />
      <button
        onClick={onSolve}
        disabled={isLoading || !problem.trim()}
        className="w-full sm:w-auto self-center px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
        aria-live="polite"
      >
        {isLoading ? 'Solving...' : 'Solve Problem'}
      </button>
    </div>
  );
};
