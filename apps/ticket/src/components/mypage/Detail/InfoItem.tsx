import { KeyOfPalette, KeyOfTypo, ListRow, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';

interface InfoItem {
  item: string;
  value?: string;
  color?: KeyOfPalette;
  typo?: KeyOfTypo;
}

const InfoItem = ({
  item,
  value,
  color = 'gray_500',
  typo = 'P_Text_16_R',
}: InfoItem) => {
  return (
    <ListRow
      text={item}
      textColor={color}
      textTypo={typo}
      rightElement={
        <Text typo={typo} color={value === '승인 대기중' ? 'gray_400' : color}>
          {value}
        </Text>
      }
      css={
        value
          ? css`
              padding: 12px 24px 12px 24px;
            `
          : css`
              border-bottom: 1px solid ${theme.palette.gray_200};
            `
      }
    />
  );
};

export default InfoItem;
