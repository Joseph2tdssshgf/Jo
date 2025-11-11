import React from 'react';
import type { SolutionData } from '../types';

interface SolutionDisplayProps {
  data: SolutionData;
}

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ data }) => {
  return (
    <div className="mt-8 bg-gray-800/50 rounded-lg shadow-2xl p-6 border border-gray-700 animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b-2 border-gray-700 pb-2">Solution</h2>
      <div className="text-gray-300 space-y-4 whitespace-pre-wrap">{data.solution}</div>
      
      <h3 className="text-xl font-semibold text-cyan-400 mt-6 mb-4 border-b-2 border-gray-700 pb-2">Core Concepts & Real-Life Example</h3>
      <div className="text-gray-300 space-y-4 whitespace-pre-wrap">{data.explanation}</div>

      {data.imageUrl && (
        <div className="mt-6">
           <h4 className="text-lg font-semibold text-cyan-400 mb-4">Visual Example</h4>
          <img 
            src={data.imageUrl} 
            alt="AI generated image illustrating the physics concept" 
            className="rounded-lg shadow-lg mx-auto max-w-full h-auto border-4 border-gray-700"
          />
        </div>
      )}
    </div>
  );
};
