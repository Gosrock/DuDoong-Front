import { Header } from '@dudoong/ui';
import { Profile } from '@dudoong/ui';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';
import styled from '@emotion/styled';

const AdminHeader = () => {
  const auth = useRecoilValue(authState);

  const rightElement = (
    <Profile
      image={auth.userProfile!.profileImage}
      size={'small'}
      name={auth.userProfile!.name}
    />
  );
  return (
    <HeaderWrapper>
      <Header rightElement={rightElement} title={'고스락 23번째 정기공연'} />
    </HeaderWrapper>
  );
};

export default AdminHeader;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
`;
