import React from 'react';
import { useLoginHook } from '../../hooks';
import { Card, Error } from '../../components';
import './login.scss';

export const Login: React.FC = () => {
  const {
    loginError,
    handleSubmit,
    values,
    handleChange,
    isValid,
    errors,
    touched,
    dirty,
    getFieldProps,
  } = useLoginHook();

  return (
    <div className='login-container'>
      <Card style={{ backgroundColor: '#fbfbfb' }}>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            id='username'
            type='text'
            placeholder='username'
            {...getFieldProps('username')}
          />
          <Error
            hasError={!!errors.username && touched.username}
            message={errors.username}
          />
          <input
            id='password'
            type='password'
            placeholder='password'
            {...getFieldProps('password')}
          />
          <Error
            hasError={!!errors.password && touched.password}
            message={errors.password}
          />
          <label htmlFor='isAdmin'>
            <input
              id='isAdmin'
              name='isAdmin'
              type='checkbox'
              checked={values.isAdmin}
              onChange={handleChange}
            />
            Is Admin
          </label>
          <button type='submit' disabled={!isValid}>
            Submit
          </button>
          <Error
            hasError={dirty && !!loginError.message}
            message={'Invalid user'}
          />
        </form>
      </Card>
    </div>
  );
};
