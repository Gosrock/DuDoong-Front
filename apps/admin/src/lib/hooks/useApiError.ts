import useToastify from '@dudoong/ui/src/lib/useToastify';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

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
