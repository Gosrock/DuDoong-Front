import useToastify from '@dudoong/ui/src/lib/useToastify';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useRefresh from './auth/useRefresh';
import { getCookie } from '@lib/utils/cookie';
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';

export interface TCustomErrorResponse {
  success: boolean;
  status: number;
  code: string;
  reason: string;
  timeStamp: string;
  path: string;
}

const useApiError = () => {
  const { setToast } = useToastify();
  const navigate = useNavigate();
  const { refreshMutate } = useRefresh();
  const [cookies, ,] = useCookies();
  const queryClient = useQueryClient();

  const authenticationErrorHandler = () => {
    const refreshToken = cookies.refreshToken;
    if (refreshToken) {
      refreshMutate(refreshToken, {
        onSuccess: () => {
          queryClient.invalidateQueries(['host']);
          navigate('/');
        },
        onError: () => {
          setToast({ comment: '다시 로그인 해주세요!' });
          navigate('/login');
        },
      });
    } else {
      navigate('/login');
    }
  };

  const handleError = useCallback((axiosError: AxiosError) => {
    const errorResponse = axiosError.response?.data as TCustomErrorResponse;
    const { status, reason } = errorResponse;
    switch (status) {
      // BadRequestException | ValidationError
      case 400:
      case 404:
      case 500:
        setToast({ comment: reason });
        break;
      // authentication error
      case 401:
      case 403:
        console.log(status);
        authenticationErrorHandler();
        break;
      default:
        setToast({ comment: reason });
        break;
    }
  }, []);
  return { handleError } as const;
};

export default useApiError;
