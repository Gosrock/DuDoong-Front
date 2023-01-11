import { axiosPrivate, OauthLoginResponse } from '@dudoong/utils';
import { atom } from 'recoil';

export interface AuthStateType {
  isAuthenticated: boolean;
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
  accessToken: '',
  refreshToken: '',
  userProfile: null,
};

const getTokenFromLocalStorage = (): AuthStateType => {
  let refreshToken = '';
  if (typeof window !== 'undefined') {
    refreshToken = localStorage.getItem('refreshToken') || '';
  }
  if (refreshToken) {
    //새로고침할때마다 토큰으로 유저정보(입금자명, 전화번호) 가져오는 과정 필요
    return {
      ...initialState,
      isAuthenticated: true,
      refreshToken,
    };
  } else return { ...initialState, refreshToken };
};

export const authState = atom<AuthStateType>({
  key: 'authState',
  default: getTokenFromLocalStorage(),
});
