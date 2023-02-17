import EventItem from '@components/home/EventItem';
import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { useInfiniteQueries } from '@dudoong/utils';
import { css } from '@emotion/react';
import { EventProfileResponse } from '@lib/apis/event/eventType';
import HostApi from '@lib/apis/host/HostApi';
import { useLocation } from 'react-router-dom';
import NoEventPage from './NoEventPage';

const HostsEvents = () => {
  const hostId = useLocation().pathname.split('/')[2];
  const { infiniteListElement, isEmpty } =
    useInfiniteQueries<EventProfileResponse>(
      'Hostevent',
      () => HostApi.GET_HOST_EVENTS(hostId),
      EventItem,
    );

  if (isEmpty) {
    return (
      <>
        <NoEventPage />
      </>
    );
  } else {
    return (
      <>
        <BorderBox
          padding={[16, 16]}
          css={css`
            & > div > .host-divider:nth-last-of-type(2) {
              display: none;
            }
          `}
        >
          {infiniteListElement}
        </BorderBox>
      </>
    );
  }
};

export default HostsEvents;
