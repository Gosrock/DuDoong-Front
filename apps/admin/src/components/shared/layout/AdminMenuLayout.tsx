import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumb from './Breadcrumb';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import AdminBottomButton from './AdminBottomButton';
import { Spacing } from '@dudoong/ui';
import { useRecoilValue } from 'recoil';
import { bottomButtonState } from '@store/bottomButton';
import { css } from '@emotion/react';

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
            <Breadcrumb />
            <Outlet />
            {isActive && <Spacing size={55} />}
          </div>
        </OutletWrapper>
        <AdminBottomButton />
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

const OutletWrapper = styled.div<OutletWrapperProps>`
  padding: 0px 6px 0px 20px;
  overflow-y: scroll;
  height: ${({ isButtonActive }) =>
    isButtonActive ? 'calc(100% - 88px)' : '100%'};

  & > div {
    width: ${({ fullWidth }) => (fullWidth ? `100%` : `876px`)};
    margin: 0 auto;

    @keyframes tableGrow {
      from {
        opacity: 0.5;
        width: 876px;
      }
      to {
        opacity: 1;
        width: 100%;
      }
    }
    ${({ fullWidth }) =>
      fullWidth &&
      css`
        animation: 0.4s forwards tableGrow ease-in-out;
      `}
  }

  & > div > div:nth-of-type(2) {
    width: 876px;
    margin: 0 auto;
  }
`;
