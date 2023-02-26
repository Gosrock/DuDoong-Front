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
  userProfile: {
    id: 0,
    profileImage: '',
    name: '',
  },
};

/* const getTokenFromCookie = (): AuthStateType => {
  const refreshToken = getCookie('refreshToken') || null;
  if (refreshToken) {
    return {
      ...initialState,
      isAuthenticated: true,
    };
  } else return { ...initialState };
}; */

export const authState = atom<AuthStateType>({
  key: 'authState',
  default: initialState,
});
