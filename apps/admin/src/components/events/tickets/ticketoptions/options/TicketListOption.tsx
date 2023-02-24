import { ListHeader, Spacing, theme, Text, Divider } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TicketDetailResponse } from '@lib/apis/ticket/ticketType';
import TicketItem from '../../tickets/TicketItem';

const TicketListOption = ({
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
          {ticketItems?.map((item: TicketDetailResponse) => (
            <>
              <Wrapper>
                <Text typo={'P_Header_16_SB'}>{item.ticketName}</Text>
                <Divider line={true} />
              </Wrapper>
              <Spacing size={16} />
            </>
            //   <TicketItem
            //     key={item.ticketItemId}
            //     text={item.ticketName}
            //     subText={`${item.price} · ${
            //       item.approveType === '승인' ? '승인 후 발매' : '선착순'
            //     } · 1인당 ${item.purchaseLimit}매`}
            //     quantity={item.supplyCount}
            //     stock={item.quantity}
            //     isSold={item.quantity !== item.supplyCount}
            //     ticketItemId={item.ticketItemId}
            //   />
          ))}
        </div>
      </div>
    );
  }
};
export default TicketListOption;

const Wrapper = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
