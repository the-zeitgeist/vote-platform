import React from 'react';
import { Error } from '../../../../components';
import { useCreateCandidateForm } from '../../../../hooks';

export const CreateCandidate: React.FC = () => {
  const {
    handleSubmit,
    getFieldProps,
    dirty,
    errors,
    touched,
    isValid,
    createError,
  } = useCreateCandidateForm();

  return (
    <div className='create-candidate-container'>
      <form className='create-candidate-form' onSubmit={handleSubmit}>
        <h1>Crear candidato</h1>
        <input
          id='name'
          type='text'
          placeholder='nombre'
          {...getFieldProps('name')}
        />
        <Error hasError={!!errors.name && touched.name} />
        <input
          id='image'
          type='text'
          placeholder='image url'
          {...getFieldProps('image')}
        />
        <Error hasError={!!errors.image && touched.image} />
        <button type='submit' disabled={!isValid}>
          Crear
        </button>
        <Error
          hasError={dirty && !!createError.message}
          message={createError.message}
        />
      </form>
    </div>
  );
};
