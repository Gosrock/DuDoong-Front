import { getCookie } from 'cookies-next';
import { atom } from 'recoil';

export interface AuthStateType {
  isAuthenticated: boolean;
  callbackUrl: string;
  accessToken: string;
  refreshToken: string;
  userProfile: {
    id: number;
    profileImage: string;
    name: string;
  } | null;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
  callbackUrl: (getCookie('redirectUrl') as string) || '/',
  accessToken: '',
  refreshToken: '',
  userProfile: null,
};

export const authState = atom<AuthStateType>({
  key: 'authState',
  default: initialState,
});
