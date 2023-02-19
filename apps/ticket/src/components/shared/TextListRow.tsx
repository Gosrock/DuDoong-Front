import { ListRow, Text } from '@dudoong/ui';
import { ComponentProps } from 'react';

interface TextListRowProps extends ComponentProps<'div'> {
  left: string;
  right: string | JSX.Element;
}

const TextListRow = ({ left, right, ...props }: TextListRowProps) => {
  return (
    <ListRow
      text={left}
      textTypo={'P_Text_16_R'}
      rightElement={
        isString(right) ? (
          <Text color="gray_500" typo="P_Text_16_R">
            {right}
          </Text>
        ) : (
          <>{right}</>
        )
      }
      {...props}
    />
  );
};
const isString = (text: any): text is string => {
  return typeof text === 'string'; // T of F
};

export default TextListRow;
