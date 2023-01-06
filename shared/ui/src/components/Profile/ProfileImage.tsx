/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export interface ProfileImageProps {
  size: number;
  imageUrl?: string;
}

export const ProfileImage = ({ size, imageUrl }: ProfileImageProps) => {
  return (
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
  );
};
