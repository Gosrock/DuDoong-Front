import TicketInput from '@components/events/tickets/newtickets/input/TicketInput';
import { FlexBox, Spacing } from '@dudoong/ui';
import { PurchaseLimit } from '../input/PurchaseLimit';
import { StockInfo } from '../input/StockInfo';
import { TicketFormProps } from './TicketForm';

const PaidTicketForm = ({ register, control }: TicketFormProps) => {
  return (
    <FlexBox direction="column" align="flex-start" justify="flex-start">
      <FlexBox align="flex-start" gap={18}>
        <TicketInput
          type="number"
          min="1000"
          title="티켓 가격"
          description="1000원 이상부터 가능해요"
          descriptionTypo="P_Text_14_M"
          placeholder="0"
          {...register('price', {
            required: true,
            min: 1000,
          })}
        />
        <TicketInput
          type="number"
          max="1000"
          title="발행매수"
          description="최대 1000장까지 발행 가능해요"
          descriptionTypo="P_Text_14_M"
          placeholder="0"
          {...register('issuance', {
            required: true,
            max: 1000,
          })}
        />
      </FlexBox>
      <Spacing size={72} />
      <StockInfo control={control} />
      <Spacing size={44} />
      <PurchaseLimit control={control} />
    </FlexBox>
  );
};

export default PaidTicketForm;
