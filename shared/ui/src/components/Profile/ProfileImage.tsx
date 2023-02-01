/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactComponent as MiniStar } from '../../assets/icons/miniStar.svg';

export interface ProfileImageProps {
  size: number;
  alliance: boolean;
  imageUrl?: string;
}

export const ProfileImage = ({
  size,
  alliance,
  imageUrl,
}: ProfileImageProps) => {
  return (
    <Wrapper size={size} alliance={alliance}>
      <div
        css={css`
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background-color: gray;
          ${imageUrl &&
          css`
            background-image: url(${imageUrl});
          `}
        `}
      />
      {alliance && <MiniStar />}
    </Wrapper>
  );
};

interface SelectedProps {
  size: number;
  alliance: boolean;
}

const Wrapper = styled.div<SelectedProps>`
  width: ${({ size }) => `${size + 8}px`};
  height: ${({ size }) => `${size + 8}px`};
  border-radius: 50%;
  ${({ theme, alliance }) =>
    alliance
      ? css`
          border: 2px ${theme.palette.main_500} solid;
          padding: 2px;
        `
      : css`
          padding: 4px;
        `}
  box-sizing: border-box;

  & > svg {
    position: relative;
    bottom: 50px;
    left: 27px;
  }
`;
