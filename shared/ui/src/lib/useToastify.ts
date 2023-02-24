import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../components/Toast';

type ToastType = 'info' | 'success' | 'warning' | 'error';

const useToastify = () => {
  const setToast = ({
    type = 'error',
    comment,
    ...props
  }: {
    type?: ToastType;
    comment: string;
  }) => {
    toast(comment, { type: type, ...props });
  };

  return { Toast, setToast };
};

export default useToastify;
