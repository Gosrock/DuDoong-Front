import { ListHeader, Spacing, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { TicketDetailResponse } from '@lib/apis/ticket/ticketType';
import TicketItem from './TicketItem';

const TicketList = ({
  ticketItems,
}: {
  ticketItems: TicketDetailResponse[] | null;
}) => {
  if (!ticketItems?.length) {
    return <div></div>;
  } else {
    return (
      <div>
        <ListHeader padding={0} size="listHeader_18" title="티켓 목록" />
        <Spacing size={42} />
        <div
          css={css`
            & > div > .host-divider:nth-last-of-type(1) {
              display: none;
            }
          `}
        >
          <Wrapper>
            {ticketItems?.map((item: TicketDetailResponse) => (
              <TicketItem
                key={item.ticketItemId}
                text={item.ticketName}
                subText={`${item.price} · ${
                  item.approveType === '승인' ? '승인 후 발매' : '선착순'
                } · 1인당 ${item.purchaseLimit}매`}
                quantity={item.supplyCount}
                stock={item.quantity}
                isSold={item.quantity !== item.supplyCount}
                ticketItemId={item.ticketItemId}
              />
            ))}
          </Wrapper>
        </div>
      </div>
    );
  }
};
export default TicketList;

const Wrapper = styled.div`
  width: 876px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
