import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import useToastify from '@dudoong/ui/src/lib/useToastify';

const AdminNoMenuLayout = () => {
  const { Toast } = useToastify();

  return (
    <Wrapper>
      <AdminHeader host="" alliance={false} />
      <BottomWrapper>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
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

const BottomWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  padding-left: 14px;
`;

const OutletWrapper = styled.div`
  width: 876px;
  margin: 0 auto;
`;
