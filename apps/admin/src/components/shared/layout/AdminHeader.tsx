import { Header, Popup, PopupOptions, theme } from '@dudoong/ui';
import { Profile } from '@dudoong/ui';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
// import { useCookies } from 'react-cookie';
import { AuthAPi, axiosPrivate } from '@lib/apis/axios';
import { useMutation } from '@tanstack/react-query';
import { removeCookie } from '@lib/utils/cookie';

interface AdminHeaderProps {
  host: string;
  alliance: boolean;
}

const AdminHeader = ({ host, alliance }: AdminHeaderProps) => {
  const auth = useRecoilValue(authState);
  const resetAuthState = useResetRecoilState(authState);

  const { mutate: logoutMutate } = useMutation(AuthAPi.OAUTH_LOGOUT, {
    onSuccess: () => {
      axiosPrivate.defaults.headers.common['Authorization'] = ``;
      removeCookie('refreshToken');
      resetAuthState();
      window.location.href = '/admin/';
    },
  });
  // const [, , removeCookie] = useCookies(['refreshToken']);

  const profileOption: PopupOptions[] = [
    {
      title: '마이페이지',
      onClick: () => {
        window.location.href = '/mypage';
      },
    },
    {
      title: '로그아웃',
      onClick: logoutMutate,
    },
  ];
  const rightElement = (
    <Popup
      width={100}
      options={profileOption}
      renderElement={
        <Profile
          image={auth.userProfile!.profileImage}
          size={'small'}
          name={auth.userProfile!.name}
          subText={host}
          alliance={alliance}
          css={css`
            padding-right: 8px;
            border-radius: 8px;
            cursor: pointer;
            &:hover {
              background-color: ${theme.palette.gray_100};
            }
          `}
        />
      }
    />
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
