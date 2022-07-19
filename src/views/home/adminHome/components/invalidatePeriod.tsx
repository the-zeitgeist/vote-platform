import React from 'react';
import { Error } from '../../../../components';
import { useInvalidatePeriodForm } from '../../../../hooks';

export const InvalidatePeriod: React.FC = () => {
  const {
    handleSubmit,
    getFieldProps,
    dirty,
    isValid,
    periods,
    invalidateError,
    errors,
    touched,
  } = useInvalidatePeriodForm();

  return (
    <div className='invalidate-period-container'>
      <form className='invalidate-period-form' onSubmit={handleSubmit}>
        <h1>Invalidar periodo electoral</h1>
        <select id='period' {...getFieldProps('period')}>
          <option value='' hidden disabled selected>
            Select a period
          </option>
          {periods.map((period: any, i: number) => (
            <option
              key={period.id}
              value={period.id}
            >{`${period.initialDate.substring(
              0,
              10
            )} - ${period.finalDate.substring(0, 10)}`}</option>
          ))}
        </select>
        <Error
          hasError={!!errors.period && touched.period}
          message={errors.period}
        />
        <button type='submit' disabled={!isValid}>
          Invalidar
        </button>
        <Error
          hasError={dirty && !!invalidateError.message}
          message={invalidateError.message}
        />
      </form>
    </div>
  );
};
