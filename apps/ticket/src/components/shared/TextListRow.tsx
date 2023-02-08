import { ListRow, Text } from '@dudoong/ui';

const TextListRow = ({ left, right }: { left: string; right: string }) => {
  return (
    <ListRow
      text={left}
      textTypo={'P_Text_16_R'}
      rightElement={
        <Text color="gray_500" typo="P_Text_16_R">
          {right}
        </Text>
      }
    />
  );
};

export default TextListRow;
