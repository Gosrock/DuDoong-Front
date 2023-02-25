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
import OptionDropArea from '../form/OptionDropArea';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  AllOptionResponse,
  AppliedOptionGroupResponse,
} from '@lib/apis/option/optionType';
import { useState } from 'react';
import OptionApi from '@lib/apis/option/OptionApi';

const TicketListOption = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const { data } = useQuery(['AppliedTicket', eventId], () =>
    OptionApi.GET_TICKET_OPTION_EACH(eventId),
  );

  const ticketItems = data ? data.appliedOptionGroups : null;

  console.log(ticketItems);
  console.log(data);
  if (!ticketItems?.length) {
    return <div></div>;
  } else {
    return (
      <div>
        <ListHeader padding={0} size="listHeader_18" title="티켓 목록" />
        <Spacing size={42} />

        {ticketItems?.map((item: AppliedOptionGroupResponse) => (
          <div key={item?.ticketItemId}>
            <Wrapper key={item.ticketItemId}>
              <Text typo={'P_Header_16_SB'}>{item.ticketName}</Text>
              <Divider line={true} />
              <OptionDropArea ticketItemId={item.ticketItemId} />
            </Wrapper>
            <Spacing size={16} />
          </div>
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
