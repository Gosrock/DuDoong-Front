import { FlexBox, Tag } from '@dudoong/ui';
import TicketToggle from './TicketToggle';

export const Approval = () => {
  return (
    <TicketToggle
      title={
        <FlexBox align="center" justify="space-between" gap={16}>
          <div>관리자 승인 여부</div>
          <Tag text="관리자 승인이란?" color="red" size="md" />
        </FlexBox>
      }
      description="관리자가 승인해야 티켓이 발급돼요."
    />
  );
};
