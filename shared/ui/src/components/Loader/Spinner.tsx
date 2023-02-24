/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentProps } from 'react';
import Loading from '../../assets/icons/Loading';

export interface LoaderProps extends ComponentProps<'div'> {
  size?: number;
}

export const Spinner = ({ size = 18, ...props }: LoaderProps) => {
  return (
    <div
      css={{ width: `${size}px`, height: `${size}px`, margin: '0 auto' }}
      {...props}
    >
      <Loading
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
        `}
      />
    </div>
  );
};
