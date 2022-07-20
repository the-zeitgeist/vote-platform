import React from 'react';
import { CandidateResult } from '../../models';
import { useResults } from '../../hooks';
import './results.scss';

export const Results: React.FC = () => {
  const { results, totalVotes } = useResults();

  return (
    <div className='results-container'>
      {results.map((result: CandidateResult, i: number) => (
        <div className='result' key={i}>
          <img src={result.imageUrl} alt={result.fullName} />
          <div className='data-container'>
            <h2 className='percentil'>{(result.total / totalVotes * 100).toFixed(2)}%</h2>
            <h3 className='votes'>({result.total})</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
