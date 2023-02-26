import useToastify from '@dudoong/ui/src/lib/useToastify';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useRefresh from './auth/useRefresh';
import { getCookie, removeCookie } from '@lib/utils/cookie';
// import { useCookies } from 'react-cookie';
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
  // const [cookies, ,] = useCookies();
  const queryClient = useQueryClient();

  const authenticationErrorHandler = () => {
    // const refreshToken = cookies.refreshToken;
    const refreshToken = getCookie('refreshToken');
    if (refreshToken) {
      refreshMutate(refreshToken, {
        onSuccess: () => {
          queryClient.invalidateQueries(['host']);
          navigate('/');
        },
        onError: () => {
          // setToast({ comment: '다시 로그인 해주세요!' });
          // removeCookie('refreshToken');
          // removeCookie('accessToken');
          // navigate('/login');
        },
      });
    } else {
      navigate('/login');
    }
  };

  const handleError = useCallback((axiosError: AxiosError) => {
    const errorResponse = axiosError.response?.data as TCustomErrorResponse;
    const { status, reason, code } = errorResponse;
    // if (code === 'AUTH_403_1') {
    //   console.log();
    //   removeCookie('refreshToken');
    //   removeCookie('accessToken');
    //   console.log(
    //     '세팅확인',
    //     getCookie('accessToken'),
    //     getCookie('refreshToken'),
    //   );
    //   setToast({ comment: '다시 로그인 해주세요!' });
    // } else {
    //   switch (status) {
    //     // BadRequestException | ValidationError
    //     case 400:
    //     case 404:
    //     case 500:
    //       setToast({ comment: reason });
    //       break;
    //     // authentication error
    //     case 401:
    //     case 403:
    //       authenticationErrorHandler();
    //       break;
    //     default:
    //       setToast({ comment: reason });
    //       break;
    //   }
    // }
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
        navigate('/login');
        break;
      default:
        setToast({ comment: reason });
        break;
    }
  }, []);
  return { handleError } as const;
};

export default useApiError;
