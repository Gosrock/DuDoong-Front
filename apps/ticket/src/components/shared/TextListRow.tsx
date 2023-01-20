import { ListRow, Text } from '@dudoong/ui';

const TextListRow = ({ left, right }: { left: string; right: string }) => {
  return (
    <ListRow
      text={left}
      rightElement={<Text typo="Text_16_SB">{right}</Text>}
    />
  );
};

export default TextListRow;
