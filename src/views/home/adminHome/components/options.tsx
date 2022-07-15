import React from 'react';
import { Card } from '../../../../components';
import { useNavigate } from 'react-router-dom';

export const Options = () => {
  const navigate = useNavigate();

  return (
    <div className='admin-container'>
      <div className='options-container'>
        <Card
          onClick={() => navigate('./create-candidate', { replace: false })}
        >
          <div className='option'>Cear candidato</div>
        </Card>
        <Card
          onClick={() => navigate('./invalidate-candidate', { replace: false })}
        >
          <div className='option'>Inhabilitar candidato</div>
        </Card>
        <Card onClick={() => navigate('./create-period', { replace: false })}>
          <div className='option'>Crear periodo electoral</div>
        </Card>
        <Card
          onClick={() => navigate('./invalidate-period', { replace: false })}
        >
          <div className='option'>Inhabilitar periodo electoral</div>
        </Card>
      </div>
    </div>
  );
};
