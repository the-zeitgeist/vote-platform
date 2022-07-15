import React from 'react';
import './error.scss';

type ErrorProps = {
  message?: string;
  hasError?: boolean;
};

export const Error: React.FC<ErrorProps> = ({
  hasError = false,
  message = 'error',
}) => <>{hasError && <div className='error-block'>{message}</div>}</>;
