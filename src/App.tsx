import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, AdminHome, Login, Results } from './views';
import { useAxiosToken } from './hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const App: React.FC = () => {
  useAxiosToken();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/*' element={<AdminHome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/results' element={<Results />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
