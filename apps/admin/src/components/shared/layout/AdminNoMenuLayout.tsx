import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import AdminBottomButton from './AdminBottomButton';
import { useLocation } from 'react-router-dom';

const AdminNoMenuLayout = () => {
  const { Toast } = useToastify();
  const isNew = useLocation().pathname.split('/')[1] === 'new';
  return (
    <Wrapper>
      <AdminHeader host="" alliance={false} />
      <BottomWrapper>
        <OutletWrapper>
          <Outlet />
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

const BottomWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  padding-left: 14px;
`;

const OutletWrapper = styled.div`
  width: 876px;
  margin: 0 auto;
`;
