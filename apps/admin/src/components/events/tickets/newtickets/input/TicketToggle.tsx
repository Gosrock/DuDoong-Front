import { FlexBox, ListHeader, Text, ToggleButton } from '@dudoong/ui';
import { Control, FieldValues } from 'react-hook-form';

export interface TicketToggleProps {
  title: string | JSX.Element;
  description: string;
  control: Control<FieldValues, any>;
}

const TicketToggle = ({ title, description }: TicketToggleProps) => {
  return (
    <FlexBox align="center" justify="space-between" style={{ width: '100%' }}>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title={title}
        description={
          <Text typo="P_Text_16_M" color="gray_400">
            {description}
          </Text>
        }
      />
      <ToggleButton toggle={false} onToggleClick={() => console.log('hi')} />
    </FlexBox>
  );
};
export default TicketToggle;
