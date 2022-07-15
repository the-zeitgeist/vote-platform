import React from 'react';
import { Error } from '../../../../components';
import { useCreatePeriodForm } from '../../../../hooks';

export const CreatePeriod: React.FC = () => {
  const {
    handleSubmit,
    getFieldProps,
    createError,
    dirty,
    errors,
    touched,
    isValid,
  } = useCreatePeriodForm();

  return (
    <div className='create-period-container'>
      <form className='create-period-form' onSubmit={handleSubmit}>
        <h1>Crear periodo electoral</h1>
        <input
          id='name'
          type='text'
          placeholder='Name'
          {...getFieldProps('name')}
        />
        <Error hasError={!!errors.name && touched.name} message={errors.name} />
        <input id='initialDate' type='date' {...getFieldProps('initialDate')} />
        <Error hasError={!!errors.initialDate && touched.initialDate} />
        <input id='finalDate' type='date' {...getFieldProps('finalDate')} />
        <Error
          hasError={!!errors.finalDate && touched.finalDate}
          message={errors.finalDate}
        />
        <button type='submit' disabled={!isValid}>
          Create
        </button>
        <Error
          hasError={dirty && !!createError.message}
          message={createError.message}
        />
      </form>
    </div>
  );
};
