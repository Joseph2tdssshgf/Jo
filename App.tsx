import React, { useState } from 'react';
import { ProblemInput } from './components/ProblemInput';
import { SolutionDisplay } from './components/SolutionDisplay';
import { LoadingState } from './components/LoadingState';
import { PhysicsIcon } from './components/icons/PhysicsIcon';
import { getPhysicsSolution } from './services/geminiService';
import type { SolutionData } from './types';

const App: React.FC = () => {
  const [problem, setProblem] = useState<string>('');
  const [solutionData, setSolutionData] = useState<SolutionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async () => {
    if (!problem.trim()) {
      setError('Please enter a physics problem.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSolutionData(null);

    try {
      const result = await getPhysicsSolution(problem, setLoadingMessage);
      setSolutionData(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-center space-x-4 mb-8">
          <PhysicsIcon className="h-12 w-12 text-cyan-400" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Physics Problem Solver
          </h1>
        </header>

        <main>
          <div className="bg-gray-800/50 rounded-lg shadow-2xl p-6 border border-gray-700">
            <p className="text-center text-gray-400 mb-6">
              Enter a physics problem below. The AI will provide a step-by-step solution and explain the core concepts with real-life examples and generated images.
            </p>
            <ProblemInput
              problem={problem}
              onProblemChange={setProblem}
              onSolve={handleSolve}
              isLoading={isLoading}
            />
          </div>

          {isLoading && <LoadingState message={loadingMessage} />}

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg shadow-lg">
              <p className="font-semibold">An error occurred:</p>
              <p>{error}</p>
            </div>
          )}
          
          {solutionData && !isLoading && (
            <SolutionDisplay data={solutionData} />
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
