import { DropdownOption } from '@dudoong/ui';
import { TicketItemResponse } from '@lib/apis/ticket/ticketType';
import { useEffect, useState } from 'react';
import getTicketItemObjects from './getTicketItemObjects';

const useTicketSelect = (items: TicketItemResponse[]) => {
  const { initialDropdownOption, ticketOptions, getSelectedTicket } =
    getTicketItemObjects(items);

  const [form, setForm] = useState<{
    ticketItemId: number;
    quantity: number;
  }>({ ticketItemId: items[0].ticketItemId, quantity: 1 });

  const [option, setOption] = useState<DropdownOption>(initialDropdownOption);
  useEffect(() => {
    setForm({ ...form, ticketItemId: option.id as number });
  }, [option]);

  const handleCounter = (key: boolean) => {
    setForm({
      ...form,
      quantity: key ? form.quantity + 1 : form.quantity - 1,
    });
  };

  const selectedTicket = getSelectedTicket(form.ticketItemId);

  return {
    form,
    selectedTicket,
    ticketOptions,
    option,
    setOption,
    handleCounter,
  };
};
export default useTicketSelect;
