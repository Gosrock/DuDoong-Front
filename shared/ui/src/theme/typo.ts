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
  Navbar_17: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(17)};
    line-height: 150%;
    font-weight: 500;
  `,
  // ------------------------------- new font -------------------------------
  // Header
  G_Header_36_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-size: ${calcRem(36)};
    line-height: 120%;
  `,
  G_Header_45_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-size: ${calcRem(45)};
    line-height: 120%;
  `,
  G_Header_28_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-size: ${calcRem(28)};
    line-height: 120%;
  `,
  P_Header_28_B: css`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: ${calcRem(28)};
    line-height: 120%;
  `,
  G_Header_24_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-size: ${calcRem(24)};
    line-height: 120%;
  `,
  P_Header_24_B: css`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: ${calcRem(24)};
    line-height: 120%;
  `,
  G_Header_20_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-size: ${calcRem(20)};
    line-height: 100%;
  `,
  G_Header_18_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(18)};
    line-height: 150%;
  `,
  P_Header_20_B: css`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: ${calcRem(20)};
    line-height: 120%;
  `,
  P_Header_18_SB: css`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${calcRem(18)};
    line-height: 120%;
  `,
  P_Header_16_SB: css`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${calcRem(16)};
    line-height: 120%;
  `,
  // Text
  G_Text_22_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 500;
    font-size: ${calcRem(22)};
    line-height: 150%;
  `,
  G_Text_18_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 500;
    font-size: ${calcRem(18)};
    line-height: 150%;
  `,
  P_Text_22_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(22)};
    line-height: 150%;
  `,
  P_Text_18_SB: css`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${calcRem(18)};
    line-height: 150%;
  `,
  P_Text_18_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(18)};
    line-height: 150%;
  `,
  P_Text_16_SB: css`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${calcRem(16)};
    line-height: 150%;
  `,
  P_Text_16_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(16)};
    line-height: 150%;
  `,
  P_Text_16_R: css`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: ${calcRem(16)};
    line-height: 150%;
  `,
  P_Text_15_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(15)};
    line-height: 150%;
  `,
  P_Text_14_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(14)};
    line-height: 150%;
  `,
  P_Text_14_R: css`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: ${calcRem(14)};
    line-height: 150%;
  `,
  P_Text_12_SB: css`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${calcRem(12)};
    line-height: 150%;
  `,
  P_Text_12_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(12)};
    line-height: 150%;
  `,
  P_Text_12_R: css`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: ${calcRem(12)};
    line-height: 150%;
  `,
  P_Text_10_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(10)};
    line-height: 150%;
  `,
  P_Text_10_R: css`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: ${calcRem(10)};
    line-height: 150%;
  `,
  // Button
  P_Button_16_SB: css`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${calcRem(16)};
    line-height: 120%;
  `,
  // Side
  G_Side_15_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(15)};
    line-height: 150%;
  `,
  G_Side_14_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-size: ${calcRem(14)};
    line-height: 100%;
  `,
  G_Side_14_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 500;
    font-size: ${calcRem(14)};
    line-height: 100%;
  `,
} as const;
