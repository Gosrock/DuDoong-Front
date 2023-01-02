/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export interface PaddingProps {
  children: JSX.Element;
  size: PaddingSize;
}

export type PaddingSize =
  | number
  | [number, number]
  | [number, number, number, number];

export const Padding = ({ children, size }: PaddingProps) => {
  return (
    <div
      css={css`
        padding: ${typeof size === 'number'
          ? `${size}px`
          : size.length === 2
          ? `${size[0]}px ${size[1]}px`
          : `${size[0]}px ${size[1]}px ${size[2]}px ${size[3]}px`};
      `}
    >
      {children}
    </div>
  );
};
