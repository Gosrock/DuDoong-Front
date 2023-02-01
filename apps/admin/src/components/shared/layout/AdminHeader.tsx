import { Header } from '@dudoong/ui';
import { Profile } from '@dudoong/ui';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const AdminHeader = () => {
  const auth = useRecoilValue(authState);

  const rightElement = (
    <div
      css={css`
        width: 154px;
      `}
    >
      <Profile
        image={auth.userProfile!.profileImage}
        size={'small'}
        name={auth.userProfile!.name}
      />
    </div>
  );
  return (
    <HeaderWrapper>
      <Header rightElement={rightElement} />
    </HeaderWrapper>
  );
};

export default AdminHeader;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 1;
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray_200};
  background-color: ${({ theme }) => theme.palette.white};
`;
