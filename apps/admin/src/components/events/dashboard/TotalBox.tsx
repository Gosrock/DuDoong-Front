import { css } from '@emotion/react';
import { FlexBox, Text } from '@dudoong/ui';
import BorderBox from '@dudoong/ui/src/layout/BorderBox';

const TotalBox = ({ total }: { total: number }) => {
  return (
    <BorderBox
      shadow
      padding={[30, 48]}
      css={css`
        width: 546px;
        height: 86px;
      `}
    >
      <FlexBox align={'center'} justify={'space-between'}>
        <Text typo={'P_Text_14_R'} color={'gray_500'}>
          판매금액
        </Text>
        <Text typo={'P_Header_20_B'} color={'main_500'}>
          {total}원
        </Text>
      </FlexBox>
    </BorderBox>
  );
};

export default TotalBox;
