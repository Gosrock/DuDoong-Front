import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumb from './Breadcrumb';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import AdminBottomButton from './AdminBottomButton';
import { FlexBox } from '@dudoong/ui';

export const AdminMenuLayout = () => {
  return (
    <>
      <AdminHeader />
      <BottomWrapper align={'top'}>
        <AdminMenu />
        <OutletWrapper>
          <Breadcrumb />
          <Outlet />
          <AdminBottomButton />
        </OutletWrapper>
      </BottomWrapper>
    </>
  );
};

const BottomWrapper = styled(FlexBox)`
  position: fixed;
  top: 80px;
  left: 0px;
  width: 100%;
  height: calc(100% - 80px);
  border-top: solid 1px ${({ theme }) => theme.palette.gray_200};
  background-color: ${({ theme }) => theme.palette.gray_100};
`;

const OutletWrapper = styled.div`
  width: 876px;
  margin: 0 auto;
`;
