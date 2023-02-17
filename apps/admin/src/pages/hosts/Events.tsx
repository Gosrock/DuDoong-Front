import EventItem from '@components/home/EventItem';
import NoEventPage from '@components/hosts/NoEventPage';
import { ListHeader, Padding, Spacing } from '@dudoong/ui';
import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { css } from '@emotion/react';
import { EventProfileResponse } from '@lib/apis/event/eventType';
import HostApi from '@lib/apis/host/HostApi';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const Events = () => {
  const hostId = useLocation().pathname.split('/')[2];

  const { data } = useQuery(
    ['hostEventDetail'],
    () => HostApi.GET_HOST_EVENTS(hostId),
    {
      onSuccess: () => {
        console.log('success');
      },
    },
  );

  return (
    <>
      <ListHeader
        padding={[32, 0, 16, 0]}
        size={'listHeader_24'}
        title={'등록한 공연 한눈에 보기'}
      />
      <Spacing size={20} />
      {data?.size !== 0 && data?.content !== undefined ? (
        <BorderBox
          css={css`
            & .host-divider:last-of-type {
              display: none;
            }
          `}
        >
          <Padding size={[24, 80, 8, 22]}>
            {data?.content.map((event: EventProfileResponse) => (
              <>
                <EventItem {...event} />
              </>
            ))}
          </Padding>
        </BorderBox>
      ) : (
        <NoEventPage />
      )}
    </>
  );
};
export default Events;
