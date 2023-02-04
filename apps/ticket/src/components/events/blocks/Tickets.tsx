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
import { useMoneyType } from '@dudoong/utils';
import { css } from '@emotion/react';
import { TicketItemResponse } from '@lib/apis/ticket/ticketType';
import { useEffect, useState } from 'react';

interface TicketsProps {
  items: TicketItemResponse[];
}

const Tickets = ({ items }: TicketsProps) => {
  const { mulMoneyType } = useMoneyType();
  const initialDropdownOption = {
    title: items[0].ticketName,
    id: items[0].ticketItemId,
    description: items[0].price,
    disabled: false,
  };
  const [form, setForm] = useState<{
    ticketItemId: number;
    quantity: number;
  }>({ ticketItemId: items[0].ticketItemId, quantity: 1 });
  const [option, setOption] = useState<DropdownOption>(initialDropdownOption);

  const ticketOptions: DropdownOption[] = items.map((item) => {
    return {
      title: item.ticketName,
      id: item.ticketItemId,
      disabled: item.quantity === 0,
      description: item.price,
    };
  });

  const getSelectedTicket = (itemId: number) => {
    const selectedTicket = items.find((item) => itemId === item.ticketItemId);
    if (selectedTicket) {
      return selectedTicket;
    } else {
      throw new Error('티켓 없음');
    }
  };

  const handleCounter = (key: boolean) => {
    setForm({
      ...form,
      quantity: key ? form.quantity + 1 : form.quantity - 1,
    });
  };

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
            {mulMoneyType(
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
