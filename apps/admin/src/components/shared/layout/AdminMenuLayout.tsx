import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumb from './Breadcrumb';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import AdminBottomButton from './AdminBottomButton';
import { Spacing } from '@dudoong/ui';
import { useRecoilValue } from 'recoil';
import { bottomButtonState } from '@store/bottomButton';
import { keyframes, css } from '@emotion/react';
import useToastify from '@dudoong/ui/src/lib/useToastify';

interface AdminMenuLayoutProps {
  title: string;
  host: string;
  alliance: boolean;
}

export const AdminMenuLayout = ({
  title,
  host,
  alliance,
}: AdminMenuLayoutProps) => {
  const { Toast } = useToastify();
  const { isActive } = useRecoilValue(bottomButtonState);
  const fullWidth = useLocation().pathname.split('/')[3] === 'guests';
  console.log(fullWidth);
  return (
    <LayoutWrapper>
      <AdminHeader host={host} alliance={alliance} />
      <BottomWrapper>
        <AdminMenu title={title} />
        <OutletWrapper isButtonActive={isActive} fullWidth={fullWidth}>
          <div>
            <Breadcrumb name={title} />
            <Outlet />
            {isActive && <Spacing size={55} />}
          </div>
        </OutletWrapper>
        <AdminBottomButton />
        <Toast />
      </BottomWrapper>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  height: calc(100vh - 64px);
  padding-top: 64px;

  background-color: ${({ theme }) => theme.palette.gray_100};
`;

const BottomWrapper = styled.div`
  height: 100%;
  padding-left: 252px;
`;

interface OutletWrapperProps {
  isButtonActive: boolean;
  fullWidth: boolean;
}

const wrapperSize = keyframes`
  0% {
    height: 100%;
  }
  100% {
    height: calc(100% - 88px);
  }
`;

const OutletWrapper = styled.div<OutletWrapperProps>`
  padding: 0px 6px 0px 20px;
  overflow-y: scroll;
  height: ${({ isButtonActive }) =>
    isButtonActive ? 'calc(100% - 88px)' : '100%'};
  ${({ isButtonActive }) =>
    isButtonActive &&
    css`
      animation: ${wrapperSize} 0.4s ease-out;
    `}
  & > div {
    width: 876px;
    margin: 0 auto;

    @keyframes tableGrow {
      from {
        width: 876px;
      }
      to {
        width: 100%;
        max-width: 1200px;
        min-width: 876px;
      }
    }
    ${({ fullWidth }) =>
      fullWidth &&
      css`
        width: 100%;
        max-width: 1200px;
        min-width: 876px;
        animation: 0.4s forwards tableGrow ease-in-out;
      `}
  }

  & > div > div:nth-of-type(2) {
    width: 876px;
    margin: 0 auto;
  }
`;
