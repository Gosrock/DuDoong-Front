import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumb from './Breadcrumb';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';

export const AdminMenuLayout = () => {
  return (
    <>
      <AdminHeader />
      <BottomWrapper>
        <AdminMenu />
        <OutletWrapper>
          <Breadcrumb />
          <Outlet />
        </OutletWrapper>
      </BottomWrapper>
    </>
  );
};

const BottomWrapper = styled.div`
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
