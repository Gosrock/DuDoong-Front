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
import { Text, theme } from '@dudoong/ui';
import styled from '@emotion/styled';

const DudoongTicketForm = ({ register, control }: TicketFormProps) => {
  return (
    <FlexBox direction="column" align="flex-start" justify="flex-start">
      <RefundNotice>
        <Text typo="P_Text_16_M" color="gray_500">
          환불 의무 안내
        </Text>
        <Spacing size={8} />
        <Text typo="P_Text_14_M" color="gray_400">
          두둥티켓 대금은 호스트 계좌로 직접 받으며 두둥은 대금과 수수료를 받지
          않습니다. 구매자가 공연 시작 전에 취소하거나, 호스트가 주문을
          거절·취소하거나, 공연이 취소되면 호스트는 구매자에게 지체 없이
          환불해야 합니다. 환불 의무를 지키지 않으면 두둥티켓 판매가 제한될 수
          있습니다.
        </Text>
        <Spacing size={12} />
        <label className="agree">
          <input
            type="checkbox"
            {...register('refundAgree', {
              required: true,
            })}
          />
          <Text typo="P_Text_14_M" color="gray_500">
            위 내용을 확인했고 환불 의무를 지키는 데 동의합니다
          </Text>
        </label>
      </RefundNotice>
      <Spacing size={32} />
      <FlexBox direction="column" align="flex-start" style={{ width: '100%' }}>
        <ListHeader
          required={true}
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

const RefundNotice = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 24px;
  border-radius: 12px;
  background-color: ${theme.palette.gray_100};
  border: 1px solid ${theme.palette.gray_200};

  .agree {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
`;
