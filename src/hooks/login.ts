import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, AuthState } from '../services/auth.service';
import { useFormik, FormikValues } from 'formik';
import { User } from '../models';
import * as yup from 'yup';

interface LoginForm extends FormikValues, User {}

export const useLoginHook = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<Error>({} as Error);
  const formik = useFormik<LoginForm>({
    initialValues: {
      username: '',
      password: '',
      isAdmin: false,
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, 'Min length is 3 characters')
        .max(15, 'Max length is 15 characters')
        .required('Required'),
      password: yup
        .string()
        .min(3, 'Min length is 3 characters')
        .max(15, 'Max length is 15 characters')
        .required('Required'),
    }),
    onSubmit: async ({ username, password, isAdmin }) => {
      const response = await AuthService.login({
        username,
        password,
        isAdmin,
      });

      if (!response.success) {
        setLoginError(new Error(response.data.errors[0]?.message));
        return;
      }

      AuthService.setToken(response.data.user, response.data.sessionToken);
    },
  });

  useEffect(() => {
    const subscription = AuthService.authState$().subscribe(
      (authState: AuthState) => {
        if (authState.isLoggedIn) {
          navigate('/', { replace: false });
        }
      }
    );

    return (): void => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return {
    loginError,
    ...formik,
  };
};
