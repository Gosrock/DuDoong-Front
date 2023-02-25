import { ListHeader, Spacing, theme, Text, Divider } from '@dudoong/ui';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import OptionDropArea from './OptionDropArea';
import OptionApi from '@lib/apis/option/OptionApi';

const TicketListOption = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const { data, isSuccess } = useQuery(['AppliedTicket', eventId], () =>
    OptionApi.GET_EVENTS_APPLIEDOPTIONGROUPS(eventId),
  );

  return (
    <Wrapper>
      {isSuccess && (
        <>
          <Spacing size={36} />
          <ListHeader padding={0} size="listHeader_18" title="티켓 목록" />
          <Spacing size={42} />

          {data.appliedOptionGroups?.map((item) => (
            <div key={item?.ticketItemId}>
              <TicketItem key={item.ticketItemId}>
                <Text typo={'P_Header_16_SB'}>{item.ticketName}</Text>
                <Divider line={true} />
                <OptionDropArea
                  ticketItemId={item.ticketItemId}
                  optionGroups={item.optionGroups}
                />
              </TicketItem>
              <Spacing size={16} />
            </div>
          ))}
        </>
      )}
    </Wrapper>
  );
};
export default TicketListOption;

const Wrapper = styled.div``;

const TicketItem = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
