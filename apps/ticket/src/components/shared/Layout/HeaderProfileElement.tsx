import {
  Popup,
  PopupOptions,
  Profile,
  ThemeType,
  useHeaderColorContext,
} from '@dudoong/ui';
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
  const { theme } = useHeaderColorContext();

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
        <LoginButton onClick={handleLogin} colortheme={theme}>
          로그인
        </LoginButton>
      )}
    </>
  );
};
const LoginButton = styled.button<{ colortheme?: ThemeType }>`
  height: 40px;
  width: 80px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, colortheme }) =>
      colortheme === 'black' ? theme.palette.white : theme.palette.black};
  ${({ theme }) => theme.typo.Text_16}
  color: ${({ theme, colortheme }) =>
    colortheme === 'black' ? theme.palette.white : theme.palette.black};
  line-height: 100%;
`;

export default HeaderProfileElement;
