import { BehaviorSubject, Observable } from 'rxjs';
import { Response, User } from '../models';
import decode from 'jwt-decode';
// import axios from 'axios';

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
    // mock
    try {
      //const data = await axios.get('');
      if (Math.random() > 0.8) {
        const errorMock = {
          errors: [
            {
              reason:
                "EVT0004 - This user doesn't exist in the system, please try again.",
              domain:
                'http://localhost:8093/api/v1/electoral_votes/admin/login',
              code: 'EVT0004',
              message:
                "This user doesn't exist in the system, please try again.",
            },
          ],
        };
        throw errorMock;
      }

      const successMock = {
        user: 'admin',
        sessionToken: loginForm.isAdmin
          ? 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZG1pbkxvZ0luU2Vzc2lvblRva2VuIiwic3ViIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6WyJBRE1JTiJdLCJpYXQiOjE2NTc1ODMyNTAsImV4cCI6MTY1ODAyNzU0Mn0.F74hPyq6s_ak6RpqNz8zFBzoRKrs7OVL3M79i3O54xRzt3Rl8QTo6snfBXMz0-fouCQHfHK5emaR38Q-XS9epQ'
          : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZG1pbkxvZ0luU2Vzc2lvblRva2VuIiwic3ViIjoidXNlciIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImlhdCI6MTY1NzU4MzI1MCwiZXhwIjoxNjU4MDI3NTQyfQ.DuIEGaF2GsRw7ZgOC3IiXv1bLUJWjXw7iYGdQOkSfR4L-jKc3_NI--16kkTE7-xwr1lcZSZxi5OO3H3OAoPkLg',
      };

      return {
        success: true,
        data: successMock,
      };
    } catch (e: any) {
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
