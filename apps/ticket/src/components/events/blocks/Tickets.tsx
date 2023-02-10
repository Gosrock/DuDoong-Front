import { Divider, ListRow, Tag } from '@dudoong/ui';
import styled from '@emotion/styled';
import { GetEventTicketItemsResponse } from '@lib/apis/ticket/ticketType';
import { HTMLAttributes } from 'react';

interface TicketsProps extends HTMLAttributes<HTMLDivElement> {
  tickets: GetEventTicketItemsResponse;
}

const Tickets = ({ tickets, ...props }: TicketsProps) => {
  console.log(tickets);
  return (
    <Wrapper>
      {tickets.ticketItems.map((item) => (
        <>
          <ListRow
            padding={[12, 0]}
            key={item.ticketItemId}
            text={item.ticketName}
            subText={`${item.price} ∙ ${item.type} ∙ 인당 ${item.purchaseLimit}매 제한`}
            textGap={0}
            rightElement={
              <Tag
                size="md"
                text={`${item.quantity}/${item.supplyCount}`}
                color="main"
              />
            }
          />
          <Divider line className="divider" />
        </>
      ))}
    </Wrapper>
  );
};
export default Tickets;

const Wrapper = styled.div`
  .divider:last-of-type {
    display: none;
  }
`;
