import React from 'react';
import { useGuard } from '../../hooks';
import { UserHome } from './userHome/userHome';

export const Home: React.FC = () => {
  useGuard();

  return <UserHome />;
};
