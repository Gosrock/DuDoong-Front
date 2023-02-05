import {
  Button,
  ButtonSet,
  Counter,
  Dropdown,
  DropdownOption,
  ListHeader,
  ListRow,
  Text,
} from '@dudoong/ui';
import { calcMoneyType } from '@dudoong/utils';
import { css } from '@emotion/react';
import { TicketItemResponse } from '@lib/apis/ticket/ticketType';
import { useEffect, useState } from 'react';
import getTicketItemObjects from './getTicketItemObjects';

interface TicketsProps {
  items: TicketItemResponse[];
}

const Tickets = ({ items }: TicketsProps) => {
  const { initialDropdownOption, ticketOptions, getSelectedTicket } =
    getTicketItemObjects(items);

  const [form, setForm] = useState<{
    ticketItemId: number;
    quantity: number;
  }>({ ticketItemId: items[0].ticketItemId, quantity: 1 });

  const handleCounter = (key: boolean) => {
    setForm({
      ...form,
      quantity: key ? form.quantity + 1 : form.quantity - 1,
    });
  };

  const [option, setOption] = useState<DropdownOption>(initialDropdownOption);
  useEffect(() => {
    setForm({ ...form, ticketItemId: option.id as number });
  }, [option]);

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
            {calcMoneyType.mul(
              getSelectedTicket(form.ticketItemId)!.price,
              form.quantity,
            )}
          </Text>
        }
        rightElement={
          getSelectedTicket(form.ticketItemId).purchaseLimit === 1 ? (
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
        <Button fullWidth>예매하기</Button>
      </ButtonSet>
    </div>
  );
};

export default Tickets;
