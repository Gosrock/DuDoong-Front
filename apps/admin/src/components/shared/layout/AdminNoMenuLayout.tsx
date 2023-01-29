import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminNoMenuLayout = () => {
  return (
    <Wrapper>
      <AdminHeader />
      <BottomWrapper>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

export default AdminNoMenuLayout;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray_100};
  width: 100vw;
  height: 100vh;
`;

const BottomWrapper = styled.div`
  position: fixed;
  top: 60px;
  left: 0px;
  width: 100%;
`;

const OutletWrapper = styled.div`
  width: 956px;
  margin: 0 auto;
`;
