import TicketInput from '@components/events/tickets/newtickets/input/TicketInput';
import { FlexBox, Spacing } from '@dudoong/ui';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Approval } from '../input/Approval';
import { PurchaseLimit } from '../input/PurchaseLimit';
import { StockInfo } from '../input/StockInfo';

export interface DudoongFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const DudoongTicketForm = ({ register, ...props }: DudoongFormProps) => {
  return (
    <FlexBox direction="column" align="flex-start" justify="flex-start">
      <TicketInput
        title="계좌번호 입력"
        description="은행과 계좌번호를 적어주세요 (ex. 우리 123456789)"
        placeholder="최대 14글자까지 쓸 수 있어요"
        {...register('account', {
          required: true,
          maxLength: {
            value: 14,
            message: '*14글자를 초과하였습니다.',
          },
        })}
      />
      <Spacing size={32} />
      <FlexBox align="flex-start" gap={18}>
        <TicketInput
          title="티켓 가격"
          description="송금 받을 티켓 가격을 써주세요"
          descriptionTypo="P_Text_14_M"
          placeholder="0"
        />
        <TicketInput
          title="발행매수"
          description="최대 1000장까지 발행 가능해요"
          descriptionTypo="P_Text_14_M"
          placeholder="0"
        />
      </FlexBox>
      <Spacing size={72} />
      <Approval />
      <Spacing size={44} />
      <StockInfo />
      <Spacing size={44} />
      <PurchaseLimit />
    </FlexBox>
  );
};

export default DudoongTicketForm;
