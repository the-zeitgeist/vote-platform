import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, AdminHome, Login, Results } from './views';
import './App.scss';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin/*' element={<AdminHome />} />
      <Route path='/login' element={<Login />} />
      <Route path='/results' element={<Results />} />
    </Routes>
  );
};

export default App;
