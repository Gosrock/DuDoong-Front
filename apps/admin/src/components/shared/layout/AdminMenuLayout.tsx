import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumb from './Breadcrumb';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import AdminBottomButton from './AdminBottomButton';
import { FlexBox, Spacing } from '@dudoong/ui';
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
  return (
    <LayoutWrapper>
      <AdminHeader host={host} alliance={alliance} />
      <BottomWrapper>
        <AdminMenu title={title} />
        <OutletWrapper isButtonActive={isActive}>
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
}

const OutletWrapper = styled.div<OutletWrapperProps>`
  padding: 0px 6px 0px 20px;
  overflow-y: scroll;
  ${({ isButtonActive }) =>
    isButtonActive &&
    css`
      height: calc(100% - 96px);
    `}

  overflow-x: hidden;
  & > div {
    width: 876px;
    margin: 0 auto;
  }
`;
