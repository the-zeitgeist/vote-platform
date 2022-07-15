import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAdminGuard } from '../../../hooks';
import {
  Options,
  CreateCandidate,
  InvalidateCandidate,
  CreatePeriod,
  InvalidatePeriod,
} from './components';
import './adminHome.scss';

export const AdminHome: React.FC = () => {
  useAdminGuard();

  return (
    <Routes>
      <Route path='/' element={<Options />} />
      <Route path='/create-candidate' element={<CreateCandidate />} />
      <Route path='/invalidate-candidate' element={<InvalidateCandidate />} />
      <Route path='/create-period' element={<CreatePeriod />} />
      <Route path='/invalidate-period' element={<InvalidatePeriod />} />
    </Routes>
  );
};
