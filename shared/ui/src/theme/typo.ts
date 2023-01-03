import { css } from '@emotion/react';

export const calcRem = (px: number) => `${px / 16}rem`;

export const typo = {
  Header_28: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(28)};
    line-height: 150%;
    font-weight: 700;
  `,
  Header_24: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(24)};
    line-height: 150%;
    font-weight: 700;
  `,
  Header_20: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(20)};
    line-height: 150%;
    font-weight: 700;
  `,
  Text_18: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(18)};
    line-height: 150%;
    font-weight: 500;
  `,
  Text_18_SB: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(18)};
    line-height: 150%;
    font-weight: 600;
  `,
  Text_16: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(16)};
    line-height: 150%;
    font-weight: 500;
  `,
  Text_16_SB: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(16)};
    line-height: 150%;
    font-weight: 600;
  `,
  Text_14: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(14)};
    line-height: 150%;
    font-weight: 500;
  `,
  Text_14_SB: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(14)};
    line-height: 150%;
    font-weight: 600;
  `,
  Text_12: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(12)};
    line-height: 150%;
    font-weight: 500;
  `,
  Text_12_SB: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(12)};
    line-height: 150%;
    font-weight: 600;
  `,
  Text_10: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(10)};
    line-height: 150%;
    font-weight: 500;
  `,
} as const;
