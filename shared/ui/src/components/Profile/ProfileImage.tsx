/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
    </Wrapper>
  );
};

interface SelectedProps {
  size: number;
  alliance: boolean;
}

const Wrapper = styled.div<SelectedProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ size }) => `${size + 8}px`};
  height: ${({ size }) => `${size + 8}px`};
  border-radius: 50%;
  ${({ theme, alliance }) =>
    alliance
      ? css`
          border: 2px solid ${theme.palette.main_500};
        `
      : css`
          padding: 4px;
        `}
  box-sizing: border-box;
`;
