import DoongDoong from '@assets/doongdoong.svg';
import { FlexBox, Spacing, Text } from '@dudoong/ui';
import { useScreenHeight } from '@dudoong/utils';

const NoData = ({ text }: { text: string }) => {
  useScreenHeight();

  return (
    <FlexBox direction="column">
      <DoongDoong />
      <Spacing size={32} />
      <Text typo="P_Text_16_M" color="gray_500">
        {text}
      </Text>
    </FlexBox>
  );
};

export default NoData;
