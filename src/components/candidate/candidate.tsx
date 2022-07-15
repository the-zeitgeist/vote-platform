import React from 'react';
import { Card } from '../card/card';

type CandidateCardProps = {
  key: string;
  name: string;
  imageUrl: string;
  onClick: () => void;
};

export const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  imageUrl,
  onClick,
}) => (
  <Card onClick={onClick}>
    <img src={imageUrl} alt={name} />
    <h2>{name}</h2>
  </Card>
);
