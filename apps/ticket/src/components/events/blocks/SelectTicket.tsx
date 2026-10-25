import {
  Button,
  ButtonSet,
  Counter,
  Dropdown,
  ListHeader,
  ListRow,
  Text,
} from '@dudoong/ui';
import { calcMoneyType } from '@dudoong/utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { TicketItemResponse } from '@lib/apis/ticket/ticketType';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTicketSelect from '../utils/useTicketSelect';

interface TicketsProps {
  items: TicketItemResponse[];
  eventName: string;
}

export type SelectedTicketState = {
  eventName: string;
  eventId: string;
  ticketName: string;
  itemId: number;
  quantity: number;
};

const SelectTicket = ({ items, eventName }: TicketsProps) => {
  const {
    form,
    selectedTicket,
    ticketOptions,
    option,
    setOption,
    handleCounter,
  } = useTicketSelect(items);
  const { query } = useRouter();

  const data: SelectedTicketState = {
    eventId: query.eventId as string,
    eventName: eventName,
    ticketName: selectedTicket.ticketName,
    itemId: form.ticketItemId,
    quantity: form.quantity,
  };

  return (
    <>
      <ListHeader title="티켓 선택하기" size="listHeader_18" />
      <Dropdown
        options={ticketOptions}
        selectedOption={option}
        setSelectedOption={setOption}
      />
      <ListHeader title="매수 선택하기" size="listHeader_18" />
      <ListRow
        text={
          <Text typo="P_Text_16_M" color="main_500">
            {calcMoneyType.mul(selectedTicket.price, form.quantity)}
          </Text>
        }
        rightElement={
          selectedTicket.purchaseLimit === 1 ? (
            <Text typo="P_Text_16_M" color="gray_400">
              1인 1매 (매수 선택 불가)
            </Text>
          ) : (
            <Counter
              count={form.quantity}
              limit={selectedTicket.purchaseLimit}
              onClickPlus={() => handleCounter(true)}
              onClickMinus={() => handleCounter(false)}
            />
          )
        }
      />
      {selectedTicket.payType === '두둥티켓' && (
        <DudoongTicketNotice>
          <li>호스트 계좌로 입금하면, 호스트가 확인한 뒤 티켓이 발급돼요.</li>
          <li>
            예매를 취소해도 자동으로 환불되지 않아요. 호스트에게 연락해
            환불받아야 해요.
          </li>
          <li>
            호스트 연락처는 공연 상세의 &apos;호스트&apos;에서 볼 수 있어요.
          </li>
        </DudoongTicketNotice>
      )}
      <ButtonSet padding={[20, 24]}>
        <Link
          css={css`
            width: 100%;
          `}
          href={{
            pathname: `/events/${query.eventId}/book/option`,
            query: { selectedTicketState: JSON.stringify(data) },
          }}
          as={`/events/${query.eventId}/book/option`}
        >
          <Button fullWidth>예매하기</Button>
        </Link>
      </ButtonSet>
    </>
  );
};

export default SelectTicket;

const DudoongTicketNotice = styled.ul`
  margin: 8px 24px 0;
  padding: 12px 16px 12px 32px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.gray_100};
  list-style: disc;
  ${({ theme }) => theme.typo.P_Text_14_M}
  color: ${({ theme }) => theme.palette.gray_500};
`;
