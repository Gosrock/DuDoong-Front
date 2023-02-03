import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumb from './Breadcrumb';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import AdminBottomButton from './AdminBottomButton';
import { FlexBox } from '@dudoong/ui';

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
  return (
    <LayoutWrapper>
      <AdminHeader host={host} alliance={alliance} />
      <BottomWrapper align={'top'}>
        <AdminMenu title={title} />
        <OutletWrapper>
          <Breadcrumb />
          <Outlet />
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

const BottomWrapper = styled(FlexBox)`
  width: calc(100vw - 252px);
  overflow-x: hidden;
  height: 100%;
  padding-left: 252px;
`;

const OutletWrapper = styled.div`
  margin: 0 auto;
  padding: 0 24px;
  width: 876px;

  overflow-x: hidden;
`;
