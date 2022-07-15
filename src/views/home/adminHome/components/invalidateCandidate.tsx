import React from 'react';
import { Error } from '../../../../components';
import { CandidateData } from '../../../../models';
import { useInvalidateCandidateForm } from '../../../../hooks';

export const InvalidateCandidate: React.FC = () => {
  const {
    handleSubmit,
    getFieldProps,
    dirty,
    isValid,
    candidates,
    createError,
    errors,
    touched,
  } = useInvalidateCandidateForm();

  return (
    <div className='invalidate-candidate-container'>
      <form className='invalidate-candidate-form' onSubmit={handleSubmit}>
        <h1>Invalidar candidato</h1>
        <select id='candidate' {...getFieldProps('candidate')}>
          <option value='' selected disabled hidden>
            Select a candidate
          </option>
          {candidates.map((candidate: CandidateData, i: number) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.fullName}
            </option>
          ))}
        </select>
        <Error
          hasError={!!errors.candidate && touched.candidate}
          message={errors.candidate}
        />
        <button type='submit' disabled={!isValid}>
          Invalidate
        </button>
        <Error
          hasError={dirty && !!createError.message}
          message={createError.message}
        />
      </form>
    </div>
  );
};
