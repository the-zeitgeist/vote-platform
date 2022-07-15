import React from 'react';
import { CandidateCard, Error } from '../../../components';
import { CandidateData } from '../../../models';
import { useVote } from '../../../hooks';
import './userHome.scss';

export const UserHome: React.FC = () => {
  const { candidates, voteError, onVoteCandidate } = useVote();

  return (
    <div className='vote-container'>
      <div className='candidates'>
        {candidates.map(
          ({ fullName, id, imageUrl }: CandidateData, i: number) => (
            <CandidateCard
              key={`${id}-${i}`}
              name={fullName}
              imageUrl={imageUrl}
              onClick={() => onVoteCandidate(id)}
            />
          )
        )}
      </div>
      <Error
        hasError={Boolean(voteError.message)}
        message={voteError.message}
      />
    </div>
  );
};
