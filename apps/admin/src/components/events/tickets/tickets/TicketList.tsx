import { theme } from '@dudoong/ui';
import styled from '@emotion/styled';
import { TicketDetailResponse } from '@lib/apis/ticket/ticketType';
import TicketItem from './TicketItem';

const TicketList = ({
  ticketItems,
}: {
  ticketItems: TicketDetailResponse[] | null;
}) => {
  return (
    <Wrapper>
      {ticketItems?.map((item: TicketDetailResponse) => (
        <TicketItem
          key={item.ticketItemId}
          text={item.ticketName}
          subText={`${item.price} · ${
            item.approveType === '승인' ? '승인 후 발매' : '선착순'
          } · 1인당 ${item.purchaseLimit}매`}
          quantity={item.quantity}
          stock={item.supplyCount}
          isSold={false}
        />
      ))}
    </Wrapper>
  );
};
export default TicketList;

const Wrapper = styled.div`
  width: 876px;
  height: auto;

  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
