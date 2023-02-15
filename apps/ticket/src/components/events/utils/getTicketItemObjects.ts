import { DropdownOption } from '@dudoong/ui';
import { TicketItemResponse } from '@lib/apis/ticket/ticketType';

const getTicketItemObjects = (items: TicketItemResponse[]) => {
  const initialDropdownOption = {
    title: items[0].ticketName,
    id: items[0].ticketItemId,
    description: items[0].price,
    disabled: false,
  };
  const ticketOptions: DropdownOption[] = items.map((item) => {
    return {
      title: item.ticketName,
      id: item.ticketItemId,
      disabled: item.quantity === 0,
      description: `${item.price}${
        item.approveType === '승인' ? ' (승인 후 발매)' : ''
      }`,
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

  return { initialDropdownOption, ticketOptions, getSelectedTicket };
};

export default getTicketItemObjects;
