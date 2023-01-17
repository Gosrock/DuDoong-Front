import { Header } from '@dudoong/ui';
import { Outlet } from 'react-router-dom';
import { Profile } from '@dudoong/ui';
import styled from '@emotion/styled';

export const AdminLayout = () => {
  // 헤더 유저 정보, 공연 정보

  const tempRightElement = <Profile size={'small'} name={'한규진'} />;
  return (
    <>
      <Header
        rightElement={tempRightElement}
        title={'고스락 23번째 정기공연'}
      />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </>
  );
};

const OutletWrapper = styled.div`
  position: fixed;
  top: 72px;
  left: 0px;
  width: 100%;
  height: calc(100% - 72px);
`;
