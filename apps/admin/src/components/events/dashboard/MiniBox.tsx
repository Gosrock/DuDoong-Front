import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { BorderBox, FlexBox, Spacing, Text } from '@dudoong/ui';

const MiniBox = ({
  icon,
  count,
  children,
}: {
  icon: ReactNode;
  count: number;
  children: ReactNode;
}) => {
  return (
    <BorderBox
      shadow
      padding={[49, 29]}
      css={css`
        width: 171px;
        height: 171px;
      `}
    >
      <FlexBox align={'center'} direction={'column'}>
        {icon}
        <Spacing size={2} />
        <Text typo={'P_Header_20_B'} color={'gray_500'}>
          {count}장
        </Text>
        <Spacing size={4} />
        <Text typo={'P_Text_14_R'} color={'gray_500'}>
          {children}
        </Text>
      </FlexBox>
    </BorderBox>
  );
};

export default MiniBox;
