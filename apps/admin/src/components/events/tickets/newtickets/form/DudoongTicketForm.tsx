import TicketInput from '@components/events/tickets/newtickets/input/TicketInput';
import {
  FlexBox,
  Input,
  ListHeader,
  Popup,
  PopupDropdown,
  Spacing,
} from '@dudoong/ui';
import { Approval } from '../input/Approval';
import { PurchaseLimit } from '../input/PurchaseLimit';
import { StockInfo } from '../input/StockInfo';
import { TicketFormProps } from './TicketForm';
import { Text } from '@dudoong/ui';

const DudoongTicketForm = ({ register, control }: TicketFormProps) => {
  return (
    <FlexBox direction="column" align="flex-start" justify="flex-start">
      <FlexBox direction="column" align="flex-start" style={{ width: '100%' }}>
        <ListHeader
          padding={0}
          size={'listHeader_18'}
          title={'계좌번호 입력'}
          description={
            <Text typo={'P_Text_16_M'} color="gray_400">
              {'계좌정보를 적어주세요. (ex. 신한 김두둥 110-1234-5678)'}
            </Text>
          }
        />
        <Spacing size={12} />
        <FlexBox align="flex-start" gap={18}>
          {/* <BankDropdown /> */}
          <Input
            placeholder="은행명"
            {...register('bankName', {
              required: true,
            })}
          />
          <Input
            placeholder="예금주"
            {...register('accountHolder', {
              required: true,
            })}
          />
        </FlexBox>
        <Spacing size={12} />
        <Input
          placeholder="계좌번호"
          {...register('accountNumber', {
            required: true,
          })}
        />
      </FlexBox>

      <Spacing size={32} />
      <FlexBox align="flex-start" gap={18}>
        <TicketInput
          type="number"
          title="티켓 가격"
          description="송금 받을 티켓 가격을 써주세요."
          descriptionTypo="P_Text_14_M"
          rightIcon={
            <Text typo="P_Text_16_M" color="gray_400">
              원
            </Text>
          }
          placeholder="0"
          {...register('price', {
            required: true,
          })}
        />
        <TicketInput
          type="number"
          max="1000"
          title="발행매수"
          description="최대 1000장까지 발행 가능해요."
          descriptionTypo="P_Text_14_M"
          rightIcon={
            <Text typo="P_Text_16_M" color="gray_400">
              장
            </Text>
          }
          placeholder="0"
          {...register('supplyCount', {
            required: true,
            max: 1000,
          })}
        />
      </FlexBox>
      <Spacing size={72} />
      <Approval control={control} disabled={true} />
      <Spacing size={44} />
      <StockInfo control={control} />
      <Spacing size={44} />
      <PurchaseLimit control={control} />
    </FlexBox>
  );
};

export default DudoongTicketForm;
