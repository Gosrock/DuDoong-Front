import { FlexBox, ListHeader, Text, ToggleButton } from '@dudoong/ui';

export interface TicketToggleProps {
  title: string | JSX.Element;
  description: string;
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
