import EventItem from '@components/home/EventItem';
import { PaddingSize } from '@dudoong/ui';
import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { useInfiniteQueries } from '@dudoong/utils';
import { css } from '@emotion/react';
import { EventProfileResponse } from '@lib/apis/event/eventType';
import HostApi from '@lib/apis/host/HostApi';
import { useLocation } from 'react-router-dom';
import NoEventPage from './NoEventPage';

const HostsEvents = () => {
  const hostId = useLocation().pathname.split('/')[2];
  const ADMIN_EVENTS_MAP = {
    padding: [16, 16],
    apiFunction: () => HostApi.GET_HOST_EVENTS(hostId),
    item: EventItem,
  };
  const { infiniteListElement, isEmpty } =
    useInfiniteQueries<EventProfileResponse>(
      'Hostevent',
      ADMIN_EVENTS_MAP.apiFunction,
      ADMIN_EVENTS_MAP.item,
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
          padding={ADMIN_EVENTS_MAP.padding as PaddingSize}
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
