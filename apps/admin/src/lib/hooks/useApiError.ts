import useToastify from '@dudoong/ui/src/lib/useToastify';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorSet, { ErrorSetTypeKey } from '@lib/error/common/ErrorSet';
import { DomainErrorSetTypeKey } from '@lib/error/common/DomainErrorSetType';
import { notificationToAdmin } from '@lib/error/common/commonComment';

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
  const navigate = useNavigate();

  const handleError = useCallback((axiosError: AxiosError) => {
    const errorResponse = axiosError.response?.data as TCustomErrorResponse;
    const { errorSort, status, errorIndex } = codeSpliter(errorResponse);
    console.log(errorSort, status, errorIndex);

    if (ErrorSort.includes(errorSort)) {
      const comments = ErrorSet[errorSort][status as DomainErrorSetTypeKey];
      let comment = notificationToAdmin;
      if (comments) {
        comment = comments[errorIndex];
      }
      switch (status) {
        // BadRequestException | ValidationError
        case 400:
        case 404:
        case 500:
          setToast({ comment: comment });
          break;
        // authentication error
        case 401:
        case 403:
          navigate('/login');
          break;
        default:
          setToast({ comment: comment });
          break;
      }
    } else {
      setToast({
        comment:
          '예상치 못한 서버 오류가 발생했어요. 오류가 반복되면 앱을 종료하고 다시 실행해주세요.',
      });
    }
  }, []);
  return { handleError } as const;
};

export default useApiError;

const codeSpliter = (errorResponse: TCustomErrorResponse) => {
  const { status, code } = errorResponse;
  const codeInfo = code.split('_'); // Event, ... , 400, 1
  const errorSort = codeInfo
    .slice(0, codeInfo.length - 2)
    .join('_') as ErrorSetTypeKey;
  const errorIndex = codeInfo[codeInfo.length - 1];
  return { errorSort, status, errorIndex };
};
