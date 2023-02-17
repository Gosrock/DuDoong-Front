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
  const router = useRouter();

  const data: SelectedTicketState = {
    eventId: router.query.eventId as string,
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
              onClickPlus={() => handleCounter(true)}
              onClickMinus={() => handleCounter(false)}
            />
          )
        }
      />
      <ButtonSet padding={[20, 24]}>
        <Link
          css={css`
            width: 100%;
          `}
          href={{
            pathname: `${router.asPath}/book/option`,
            query: { selectedTicketState: JSON.stringify(data) },
          }}
          as={`${router.asPath}/book/option`}
        >
          <Button fullWidth>예매하기</Button>
        </Link>
      </ButtonSet>
    </>
  );
};

export default SelectTicket;
