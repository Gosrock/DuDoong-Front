export const calcRem = (px: number) => `${px / 16}rem`;

export const typo = {
  Header: {
    Header_28: `font-family: 'Pretendard';font-size: ${calcRem(
      28,
    )};line-height: 150%;font-weight: 700;`,
    Header_24: `font-family: 'Pretendard';font-size: ${calcRem(
      24,
    )};line-height: 150%;font-weight: 700;`,
    Header_20: `font-family: 'Pretendard';font-size: ${calcRem(
      20,
    )};line-height: 150%;font-weight: 700;`,
  },
  Text: {
    Text_18: `font-family: 'Pretendard';font-size: ${calcRem(
      18,
    )};line-height: 150%;font-weight: 700;`,
    Text_18_SB: `font-family: 'Pretendard';font-size: ${calcRem(
      18,
    )};line-height: 150%;font-weight: 600;`,
    Text_16: `font-family: 'Pretendard';font-size: ${calcRem(
      16,
    )};line-height: 150%;font-weight: 700;`,
    Text_16_SB: `font-family: 'Pretendard';font-size: ${calcRem(
      16,
    )};line-height: 150%;font-weight: 600;`,
    Text_14: `font-family: 'Pretendard';font-size: ${calcRem(
      14,
    )};line-height: 150%;font-weight: 700;`,
    Text_14_SB: `font-family: 'Pretendard';font-size: ${calcRem(
      14,
    )};line-height: 150%;font-weight: 600;`,
    Text_12: `font-family: 'Pretendard';font-size: ${calcRem(
      12,
    )};line-height: 150%;font-weight: 700;`,
    Text_12_SB: `font-family: 'Pretendard';font-size: ${calcRem(
      12,
    )};line-height: 150%;font-weight: 600;`,
    Text_10: `font-family: 'Pretendard';font-size: ${calcRem(
      10,
    )};line-height: 150%;font-weight: 700;`,
  },
} as const;
