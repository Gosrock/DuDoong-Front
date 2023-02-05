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
import { TicketItemResponse } from '@lib/apis/ticket/ticketType';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTicketSelect from '../utils/useTicketSelect';

interface TicketsProps {
  items: TicketItemResponse[];
  eventName: string;
}

export type TicketSelectState = {
  eventName: string;
  ticketName: string;
  ticketId: number;
  quantity: number;
};

const Tickets = ({ items, eventName }: TicketsProps) => {
  const {
    form,
    selectedTicket,
    ticketOptions,
    option,
    setOption,
    handleCounter,
  } = useTicketSelect(items);

  const data: TicketSelectState = {
    eventName: eventName,
    ticketName: selectedTicket.ticketName,
    ticketId: form.ticketItemId,
    quantity: form.quantity,
  };

  return (
    <div
      css={css`
        position: relative;
      `}
    >
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
              onClickPlus={() => handleCounter(true)}
              onClickMinus={() => handleCounter(false)}
            />
          )
        }
      />
      <ButtonSet padding={[20, 24]}>
        <Link
          href={{
            pathname: '/book/option',
            query: { selectTicketState: JSON.stringify(data) },
          }}
          as={`/book/option`}
        >
          <Button fullWidth>예매하기</Button>
        </Link>
      </ButtonSet>
    </div>
  );
};

export default Tickets;
