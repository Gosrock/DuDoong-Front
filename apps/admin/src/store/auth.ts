import { axiosPrivate } from '@dudoong/utils';
import { atom } from 'recoil';
export interface IAuthType {
  isAuthenticated: boolean;
  registerToken: string | null;
  phoneNumber: string | null;
  inProcess: boolean;
}

const initialState = {
  isAuthenticated: false,
  registerToken: null,
  phoneNumber: null,
  inProcess: false,
};

const getTokenFromLocalStorage = (): IAuthType => {
  const accessToken = localStorage.getItem('accessToken');
  const registerToken = localStorage.getItem('registerToken');
  if (accessToken) {
    // 어세스토큰이 있으면 axios 인스턴스에 커먼 헤더로 집어넣음
    axiosPrivate.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;

    //새로고침할때마다 토큰으로 유저정보(입금자명, 전화번호) 가져오는 과정 필요
    return {
      ...initialState,
      isAuthenticated: true,
      registerToken,
    };
  } else return { ...initialState, registerToken };
};

export const authState = atom<IAuthType>({
  key: 'auth',
  default: getTokenFromLocalStorage(),
});
