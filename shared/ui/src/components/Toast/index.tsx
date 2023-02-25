import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <CustomToast
      position="bottom-center" // default : top-right
      autoClose={2000} // default : 5000
      closeButton={true}
      newestOnTop
      limit={5}
      hideProgressBar // 유지 시간 바 비활성화
    />
  );
};

export default Toast;

// css custom : https://fkhadra.github.io/react-toastify/how-to-style

const CustomToast = styled(ToastContainer)``;
