import TicketInput from '@components/events/tickets/newtickets/input/TicketInput';
import { FlexBox, Spacing } from '@dudoong/ui';
import { Approval } from '../input/Approval';
import { PurchaseLimit } from '../input/PurchaseLimit';
import { StockInfo } from '../input/StockInfo';
import { TicketFormProps } from './TicketForm';

const FreeTicketForm = ({ register, control }: TicketFormProps) => {
  return (
    <FlexBox direction="column" align="flex-start" justify="flex-start">
      <TicketInput
        type="number"
        max="1000"
        title="발행매수"
        description="최대 1000장까지 발행 가능해요"
        placeholder="0"
        {...register('supplyCount', {
          required: true,
          max: 1000,
        })}
      />
      <Spacing size={72} />
      <Approval control={control} disabled={false} />
      <Spacing size={44} />
      <StockInfo control={control} />
      <Spacing size={44} />
      <PurchaseLimit control={control} />
    </FlexBox>
  );
};

export default FreeTicketForm;
