import { Divider, ListRow, Tag } from '@dudoong/ui';
import styled from '@emotion/styled';
import type { GetEventTicketItemsResponse } from '@lib/apis/ticket/ticketType';
import { HTMLAttributes } from 'react';

interface TicketsProps extends HTMLAttributes<HTMLDivElement> {
  tickets: GetEventTicketItemsResponse;
}

const Tickets = ({ tickets, ...props }: TicketsProps) => {
  return (
    <Wrapper>
      {tickets.ticketItems.map((item) => (
        <div key={item.ticketItemId}>
          <ListRow
            padding={[12, 0]}
            text={item.ticketName}
            subText={`${item.price} ∙ ${item.payType} ∙ 인당 ${item.purchaseLimit}매 제한`}
            textGap={0}
            rightElement={
              item.isQuantityLeft ? (
                item.isQuantityPublic && (
                  <Tag
                    size="md"
                    text={`${item.quantity}매 남음`}
                    color="main"
                  />
                )
              ) : (
                <Tag size="md" text={`매진`} color="mono" />
              )
            }
          />
          <Divider line className="divider" />
        </div>
      ))}
    </Wrapper>
  );
};
export default Tickets;

const Wrapper = styled.div`
  div:last-of-type {
    .divider {
      display: none;
    }
  }
`;
