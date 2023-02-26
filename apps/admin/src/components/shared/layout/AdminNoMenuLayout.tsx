import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import AdminBottomButton from './AdminBottomButton';
import { useLocation } from 'react-router-dom';
import { keyframes, css } from '@emotion/react';
import { Spacing } from '@dudoong/ui';

const AdminNoMenuLayout = () => {
  const { Toast } = useToastify();
  const isNew = useLocation().pathname.split('/')[1] === 'new';
  return (
    <Wrapper>
      <AdminHeader host="" alliance={false} />
      <BottomWrapper isButtonActive={isNew}>
        <OutletWrapper>
          <Outlet />
          {isNew && <Spacing size={55} />}
        </OutletWrapper>
        {isNew && <AdminBottomButton fullwidth={1} />}
        <Toast />
      </BottomWrapper>
    </Wrapper>
  );
};

export default AdminNoMenuLayout;

const Wrapper = styled.div`
  height: calc(100vh - 64px);
  padding-top: 64px;

  background-color: ${({ theme }) => theme.palette.gray_100};
`;

interface BottomWrapperProps {
  isButtonActive: boolean;
}

const wrapperSize = keyframes`
  0% {
    height: 100%;
  }
  100% {
    height: calc(100% - 88px);
  }
`;

const BottomWrapper = styled.div<BottomWrapperProps>`
  overflow-y: scroll;
  height: ${({ isButtonActive }) =>
    isButtonActive ? 'calc(100% - 88px)' : '100%'};
  ${({ isButtonActive }) =>
    isButtonActive &&
    css`
      animation: ${wrapperSize} 0.4s ease-out;
    `}
  padding-left: 14px;
`;

const OutletWrapper = styled.div`
  width: 876px;
  margin: 0 auto;
`;
