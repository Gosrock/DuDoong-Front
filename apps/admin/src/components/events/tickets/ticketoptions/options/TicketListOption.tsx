import {
  ListHeader,
  Spacing,
  theme,
  Text,
  Divider,
  RoundBlock,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TicketDetailResponse } from '@lib/apis/ticket/ticketType';
import TicketItem from '../../tickets/TicketItem';
import TicketApi from '@lib/apis/ticket/TicketApi';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const TicketListOption = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const { data } = useQuery(['ticketDetail', eventId], () =>
    TicketApi.GET_TICKET_DETAIL(eventId),
  );
  const ticketItems = data ? data.ticketItems : null;

  if (!ticketItems?.length) {
    return <div></div>;
  } else {
    return (
      <div>
        <ListHeader padding={0} size="listHeader_18" title="티켓 목록" />
        <Spacing size={42} />

        {ticketItems?.map((item: TicketDetailResponse) => (
          <>
            <Wrapper key={item.ticketItemId}>
              <Text typo={'P_Header_16_SB'}>{item.ticketName}</Text>
              <Divider line={true} />
              <RoundBlock background="gray_200" padding={10} radius={15}>
                Drag
              </RoundBlock>
            </Wrapper>
            <Spacing size={16} />
          </>
        ))}
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
