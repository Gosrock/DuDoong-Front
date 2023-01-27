import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const AdminNoMenuLayout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default AdminNoMenuLayout;

const Wrapper = styled.div`
  width: 954px;
  margin: 0 auto;
`;
