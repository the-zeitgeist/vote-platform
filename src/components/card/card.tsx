import React from 'react';
import './card.scss';

export const Card: React.FC<React.PropsWithChildren<any>> = ({
  style,
  onClick = () => {},
  children,
}) => (
  <div className='card' onClick={onClick} style={style}>
    {children}
  </div>
);
