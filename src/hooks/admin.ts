import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CandidateService,
  CrateCandidateInterface,
} from '../services/candidate.service';
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import { CandidateData, Period } from '../models';
import { PeriodService } from '../services/period.service';

interface CreateCandidateForm extends FormikValues {
  name: string;
  image: string;
}

export const useCreateCandidateForm = () => {
  const navigate = useNavigate();
  const [createError, setCreateError] = useState<Error>({} as Error);
  const formik = useFormik<CreateCandidateForm>({
    initialValues: {
      name: '',
      image: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().min(5, 'Name is too short').required('Required'),
      image: yup.string().required('Required'),
    }),
    onSubmit: async ({ name, image }) => {
      const requestData: CrateCandidateInterface = {
        full_name: name,
        image_url: image,
      };

      const response = await CandidateService.createCandidate(requestData);

      if (!response.success) {
        setCreateError(new Error(response.data.errors[0].message));
        return;
      }

      navigate('../');
    },
  });

  return {
    createError,
    ...formik,
  };
};

export const useInvalidateCandidateForm = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [createError, setCreateError] = useState<Error>({} as Error);
  const formik = useFormik({
    initialValues: {
      candidate: '',
    },
    validationSchema: yup.object().shape({
      candidate: yup
        .string()
        .min(1, ' select a candidate')
        .required('Required'),
    }),
    onSubmit: async ({ candidate }) => {
      const response = await CandidateService.invalidateCandidate(
        Number(candidate)
      );

      if (!response.success) {
        setCreateError(new Error(response.data.errors[0].message));
        return;
      }

      navigate('../');
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const requestData: CandidateData[] =
        await CandidateService.getCandidates();

      setCandidates(requestData);
    };

    fetchData();
  }, []);

  return {
    candidates,
    createError,
    ...formik,
  };
};

export const useCreatePeriodForm = () => {
  const navigate = useNavigate();
  const [createError, setCreateError] = useState<Error>({} as Error);

  const formik = useFormik<Period>({
    initialValues: {
      name: '',
      initialDate: new Date().toISOString().substring(0, 10),
      finalDate: new Date().toISOString().substring(0, 10),
    },
    validationSchema: yup.object().shape({
      name: yup.string().min(5, 'Name is too short').required('Required'),
      initialDate: yup.string(),
      finalDate: yup.string(),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const initialDate = new Date(values.initialDate);
      const finalDate = new Date(values.finalDate);
      finalDate.setUTCHours(23);
      finalDate.setUTCMinutes(59);
      finalDate.setUTCSeconds(59);
      finalDate.setUTCMilliseconds(999);

      if (finalDate.getTime() < initialDate.getTime()) {
        setFieldError('finalDate', 'Final date is before initial date');
        return;
      }

      const data = {
        ...values,
        initialDate: initialDate.toISOString().split('').slice(0, -1).join(''),
        finalDate: finalDate.toISOString().split('').slice(0, -1).join(''),
      };

      const response = await PeriodService.createPeriod(data);

      if (!response.success) {
        setCreateError(new Error(response.data.errors[0].message));
        return;
      }

      navigate('../');
    },
  });

  return {
    createError,
    ...formik,
  };
};

export const useInvalidatePeriodForm = () => {
  const navigate = useNavigate();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [invalidateError, setInvalidateError] = useState<Error>({} as Error);
  const formik = useFormik({
    initialValues: {
      period: '',
    },
    validationSchema: yup.object().shape({
      period: yup.string().required('Required'),
    }),
    onSubmit: async ({ period }) => {
      const response = await PeriodService.invalidatePeriod(Number(period));

      if (!response.success) {
        setInvalidateError(new Error(response.data.errors[0].message));
        return;
      }

      navigate('../');
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const requestData = await PeriodService.getPeriods();
      setPeriods(requestData);
    };

    fetchData();
  }, []);

  return {
    periods,
    invalidateError,
    ...formik,
  };
};
