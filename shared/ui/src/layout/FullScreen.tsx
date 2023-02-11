/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { useResponsive } from '../lib/useResponsive';

interface FullScreenProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  verticalCenter?: boolean;
}

export const FullScreen = ({
  children,
  verticalCenter,
  ...props
}: FullScreenProps) => {
  const [height, setHeight] = useState(0);
  const { isPC } = useResponsive();

  useEffect(() => {
    setHeight(isPC ? window.innerHeight : window.innerHeight - 73);
  }, []);

  return (
    <div
      css={css`
        height: ${height}px;
        width: 100%;
        overflow: hidden;
        ${verticalCenter &&
        css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
