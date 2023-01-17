import { atom } from 'recoil';

export interface AuthStateType {
  isAuthenticated: boolean;
  callbackUrl: string;
  accessToken: string;
  userProfile: {
    id: number;
    profileImage: string;
    name: string;
  } | null;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
  callbackUrl: '/',
  accessToken: '',
  userProfile: null,
};

const getTokenFromLocalStorage = (): AuthStateType => {
  const refreshToken = localStorage.getItem('refreshToken') || '';
  if (refreshToken) {
    return {
      ...initialState,
      isAuthenticated: true,
    };
  } else return { ...initialState };
};

export const authState = atom<AuthStateType>({
  key: 'authState',
  default: getTokenFromLocalStorage(),
});
