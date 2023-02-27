import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { palette } from '../../theme/palette';

const Toast = () => {
  return (
    <CustomToast
      position="top-center" // default : top-right
      autoClose={3500} // default : 5000
      closeButton={false}
      newestOnTop
      limit={5}
      hideProgressBar // 유지 시간 바 비활성화
      toastStyle={{
        borderRadius: '12px',
        backgroundColor: palette.white,
        margin: '6px',
      }}
      bodyStyle={{ color: palette.gray_500, lineHeight: 1 }}
    />
  );
};

export default Toast;

// css custom : https://fkhadra.github.io/react-toastify/how-to-style

const CustomToast = styled(ToastContainer)``;
