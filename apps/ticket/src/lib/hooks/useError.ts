import useToastify from '@dudoong/ui/src/lib/useToastify';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';
import { axiosPublic, OauthLoginResponse } from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';
import { getCookie } from 'cookies-next';
import { setCredentials } from '@lib/utils/setCredentials';

export interface TCustomErrorResponse {
  success: boolean;
  status: number;
  code: string;
  reason: string;
  timeStamp: string;
  path: string;
}

const ErrorSort = [
  'Event',
  'USER',
  'HOST',
  'Order',
  'Ticket_Item',
  'Option_Group',
  'Option',
  'Item_Option_Group',
  'IssuedTicket',
  'AUTH',
  'GLOBAL',
  'FILE',
  'AOP',
  'Redisson',
];

const useApiError = () => {
  const { setToast } = useToastify();
  const handleError = useCallback(async (axiosError: any) => {
    const errorResponse = axiosError.response?.data as TCustomErrorResponse;
    const { status, code } = errorResponse;

    switch (status) {
      // authentication error
      case 401:
        handle401();
        break;
      case 403:
        console.log('403');
        break;
      default:
        break;
    }
  }, []);
  return { handleError } as const;
};

const handle401 = async () => {
  const refreshToken = getCookie('refreshToken') as string;
  const { data } = await axiosPublic.post<OauthLoginResponse>(
    `/auth/token/refresh?token=${refreshToken}`,
  );
  setCredentials(data);
};

export default useApiError;
