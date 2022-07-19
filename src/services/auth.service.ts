import { BehaviorSubject, Observable } from 'rxjs';
import { Response, User } from '../models';
import { axiosInstance as axios } from '../axios';
import decode from 'jwt-decode';

export type AuthState = {
  isLoggedIn: boolean;
  userType: string;
  token: string;
  exp: number;
  user: string;
};

type AuthServiceInterface = {
  login: (loginForm: User) => Promise<LoginResponse>;
  isLoggedIn: () => boolean;
  setToken: (username: string, token: string) => void;
  revokeToken: () => void;
  authState$: () => Observable<AuthState>;
};

type LoginResponse = Response<any>;

const initialAuthState: AuthState = {
  isLoggedIn: false,
  userType: '',
  token: '',
  exp: 0,
  user: '',
};

const authService: () => AuthServiceInterface = () => {
  const authState = new BehaviorSubject<AuthState>(initialAuthState);

  const isLoggedIn: () => boolean = () => {
    return authState.value.isLoggedIn;
  };

  const setToken: (username: string, token: string) => void = (
    username,
    token
  ) => {
    const user: { sub: string; exp: number; [key: string]: any } =
      decode(token);

    authState.next({
      isLoggedIn: true,
      userType: user.sub,
      exp: user.exp,
      user: username,
      token,
    });
  };

  const revokeToken: () => void = () => {
    authState.next(initialAuthState);
  };

  const login: (loginForm: User) => Promise<LoginResponse> = async (
    loginForm
  ) => {
    try {
      const requestEndpoint = loginForm.isAdmin ? 'admin' : 'user';
      const { data } = await axios.get(`/${requestEndpoint}/login`);

      return {
        success: true,
        data,
      };
    } catch (e: any) {
      // TODO: delete when connected
      if (Math.random() > 0.1) {
        return {
          success: true,
          data: {
            user: 'admin',
            sessionToken: loginForm.isAdmin
              ? 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZG1pbkxvZ0luU2Vzc2lvblRva2VuIiwic3ViIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6WyJBRE1JTiJdLCJpYXQiOjE2NTc1ODMyNTAsImV4cCI6MTY1ODI5NDA4M30.4lWvJhVjAwKAYXnrRhFApOSlsn3fUAWdnxuSxOzNZETIc_-QU2aqISiVfu5mZ7jSVui7LYCR1SCuJ9luhVTCwA'
              : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZG1pbkxvZ0luU2Vzc2lvblRva2VuIiwic3ViIjoidXNlciIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImlhdCI6MTY1NzU4MzI1MCwiZXhwIjoxNjU4MDI3NTQyfQ.DuIEGaF2GsRw7ZgOC3IiXv1bLUJWjXw7iYGdQOkSfR4L-jKc3_NI--16kkTE7-xwr1lcZSZxi5OO3H3OAoPkLg',
          },
        };
      }

      return {
        success: false,
        data: e,
      };
    }
  };

  const authState$: () => Observable<AuthState> = () =>
    authState.asObservable();

  return {
    login,
    isLoggedIn,
    setToken,
    revokeToken,
    authState$,
  };
};

export const AuthService: AuthServiceInterface = authService();
