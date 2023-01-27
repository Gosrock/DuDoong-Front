import { FlexBox, Header } from '@dudoong/ui';
import { Outlet } from 'react-router-dom';
import { Profile } from '@dudoong/ui';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';

export const AdminLayout = () => {
  const auth = useRecoilValue(authState);

  const rightElement = (
    <Profile
      image={auth.userProfile!.profileImage}
      size={'small'}
      name={auth.userProfile!.name}
    />
  );
  return (
    <>
      <Header rightElement={rightElement} title={'고스락 23번째 정기공연'} />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </>
  );
};

const OutletWrapper = styled.div`
  position: fixed;
  border-top: solid 1px ${({ theme }) => theme.palette.gray_200};
  top: 80px;
  left: 0px;
  width: 100%;
  height: calc(100% - 80px);
`;
