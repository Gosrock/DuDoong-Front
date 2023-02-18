import TicketInput from '@components/events/tickets/newtickets/input/TicketInput';
import { Counter, FlexBox, ListHeader, Spacing, Tag } from '@dudoong/ui';
import { Approval } from '../input/Approval';
import { PurchaseLimit } from '../input/PurchaseLimit';
import { StockInfo } from '../input/StockInfo';
import TicketToggle from '../input/TicketToggle';

const FreeTicketForm = () => {
  return (
    <FlexBox direction="column" align="flex-start" justify="flex-start">
      <TicketInput
        title="발행매수"
        description="최대 1000장까지 발행 가능해요"
        placeholder="0"
      />
      <Spacing size={72} />
      <Approval />
      <Spacing size={44} />
      <StockInfo />
      <Spacing size={44} />
      <PurchaseLimit />
    </FlexBox>
  );
};

export default FreeTicketForm;
