import { RoundBlock, Text } from '@dudoong/ui';
import { GetEventTicketItemsResponse } from '@lib/apis/ticket/ticketType';
import { HTMLAttributes } from 'react';

interface TicketsProps extends HTMLAttributes<HTMLDivElement> {
  tickets: GetEventTicketItemsResponse;
}

const Tickets = ({ tickets, ...props }: TicketsProps) => {
  console.log(tickets);
  return <></>;
};
export default Tickets;
