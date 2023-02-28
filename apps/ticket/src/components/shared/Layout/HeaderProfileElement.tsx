import { Popup, PopupOptions, Profile } from '@dudoong/ui';
import { palette } from '@dudoong/ui/src/theme/palette';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface HeaderProfileElement {
  name?: string;
  profileOption: PopupOptions[];
  image?: string;
  handleLogin: () => void;
}
const HeaderProfileElement = (props: HeaderProfileElement) => {
  const { name, profileOption, image, handleLogin } = props;
  return (
    <>
      {name ? (
        <Popup
          width={100}
          options={profileOption}
          renderElement={
            <Profile
              size={'small'}
              name={name}
              image={image}
              css={css`
                cursor: pointer;
                border-radius: 8px;
                padding-right: 8px;
                &:hover {
                  background-color: ${palette.gray_100};
                }
              `}
            />
          }
        />
      ) : (
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      )}
    </>
  );
};
const LoginButton = styled.button`
  height: 40px;
  width: 80px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.black};
  ${({ theme }) => theme.typo.Text_16}
  line-height:100%;
`;

export default HeaderProfileElement;
