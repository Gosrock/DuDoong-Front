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
  // --------------------------------
  // new font
  P_Header_28_B: css`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: ${calcRem(28)};
    line-height: 120%;
  `,
  P_Text_24_Sb: css`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${calcRem(24)};
    line-height: 120%;
  `,
  P_Text_20_B: css`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: ${calcRem(20)};
    line-height: 150%;
  `,
  P_Text_20_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(20)};
    line-height: 150%;
  `,
  P_Text_18_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(18)};
    line-height: 150%;
  `,
  P_Text_16_R: css`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: ${calcRem(16)};
    line-height: 120%;
  `,
  P_Name_14_M: css`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: ${calcRem(14)};
    line-height: 120%;
  `,

  G_Name_24_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(24)};
    line-height: ${calcRem(24)};
  `,
  G_Header_20_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 600;
    font-size: ${calcRem(20)};
    line-height: ${calcRem(20)};
  `,
  G_Name_20_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(20)};
    line-height: ${calcRem(20)};
  `,
  G_Menu_18_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 600;
    font-size: ${calcRem(18)};
    line-height: ${calcRem(18)};
  `,
  G_Menu_18_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(18)};
    line-height: ${calcRem(18)};
  `,

  // --------------------------------
  G_Name_18_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(18)};
    line-height: ${calcRem(18)};
  `,
  G_Header_16_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 600;
    font-size: ${calcRem(16)};
    line-height: ${calcRem(16)};
  `,
  G_Name_15_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(15)};
    line-height: ${calcRem(15)};
  `,
  G_Menu_14_B: css`
    font-family: 'Gmarket Sans';
    font-weight: 600;
    font-size: ${calcRem(14)};
    line-height: ${calcRem(14)};
  `,
  G_Menu_14_M: css`
    font-family: 'Gmarket Sans';
    font-weight: 400;
    font-size: ${calcRem(14)};
    line-height: ${calcRem(14)};
  `,

  P_Text_14_M: css`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: ${calcRem(14)};
    line-height: 150%;
  `,
  P_Text_14_R: css`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: ${calcRem(14)};
    line-height: 120%;
  `,
  P_Name_11_M: css`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: ${calcRem(11)};
    line-height: 120%;
  `,
} as const;
