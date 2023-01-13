/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ArrowClockwise } from 'react-bootstrap-icons';

export interface LoaderProps {
  color: string;
  size?: number;
}

export const Spinner = ({ color, size = 20 }: LoaderProps) => {
  return (
    <div css={{ width: `${size}px`, height: `${size}px`, margin: '0 auto' }}>
      <ArrowClockwise
        css={css`
          width: ${size}px;
          height: ${size}px;
          @keyframes rotate {
            from {
              -webkit-transform: rotate(0deg);
              -o-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            to {
              -webkit-transform: rotate(360deg);
              -o-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          animation: rotate 1s linear infinite;
          stroke: ${color};
          opacity: 0.8;
        `}
      />
    </div>
  );
};
