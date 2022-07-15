import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, AuthState } from '../services/auth.service';

export const useGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      navigate('./login', { replace: true });
      return;
    }

    const subscription = AuthService.authState$().subscribe((as: AuthState) => {
      if (!as.isLoggedIn) {
        navigate('./login', { replace: true });
        return;
      }

      if (as.userType === 'admin') {
        navigate('./admin', { replace: true });
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};

export const useAdminGuard = () => {
  const navigate = useNavigate();
  const timer = useRef<any>(null);

  useEffect(() => {
    const subscription = AuthService.authState$().subscribe((as: AuthState) => {
      const date = new Date(0);
      date.setUTCSeconds(as.exp);

      timer.current = setTimeout(() => {
        AuthService.revokeToken();
        navigate('/');
      }, date.getTime() - new Date().getTime());

      if (!as.isLoggedIn) {
        clearTimeout(timer.current);
        navigate('/', { replace: false });
      }
    });

    return (): void => {
      clearTimeout(timer.current);
      subscription.unsubscribe();
    };
  }, [navigate]);
};
