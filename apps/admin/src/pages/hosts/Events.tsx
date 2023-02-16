import EventItem from '@components/home/EventItem';
import NoEventPage from '@components/hosts/NoEventPage';
import TempSButtonSet from '@components/hosts/slack/TempSButtonSet';
import HostItem from '@components/shared/component/HostItem';
import { ListHeader, Padding, Spacing } from '@dudoong/ui';
import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { EventProfileResponse } from '@lib/apis/event/eventType';
import HostApi from '@lib/apis/host/HostApi';
import { HostEventResponse } from '@lib/apis/host/hostType';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Events = () => {
  const hostId = useLocation().pathname.split('/')[2];
  const [events, setEvent] = useState<any>();

  const { data } = useQuery(
    ['hostEventDetail'],
    () => HostApi.GET_HOST_EVENTS(hostId),
    {
      onSuccess: (data: HostEventResponse) => {
        return data.content;
      },
    },
  );

  useEffect(() => {
    console.log(data?.content);
    setEvent(data?.content);
  }, [data]);

  console.log(data);
  console.log(events);
  return (
    <>
      <ListHeader
        padding={[32, 0, 16, 0]}
        size={'listHeader_24'}
        title={'등록한 공연 한눈에 보기'}
      />
      <Spacing size={20} />
      {data?.size !== 0 && events !== undefined ? (
        <BorderBox>
          <Padding size={[24, 80, 8, 22]}>
            {events.map((event: EventProfileResponse) => (
              <>
                <EventItem {...event} />
              </>
            ))}
          </Padding>
        </BorderBox>
      ) : (
        <NoEventPage />
      )}
      {/* <BorderBox>
        <Padding size={[24, 80, 8, 22]}>
          {events ? (
            events.map((event: EventProfileResponse) => (
              <>
                <EventItem {...event} />
              </>
            ))
          ) : (
            <NoEventPage />
          )}
        </Padding>
      </BorderBox> */}
    </>
  );
};
export default Events;
