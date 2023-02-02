import BorderBox from '@components/shared/layout/BorderBox';
import { PaddingSize } from '@dudoong/ui';
import { useInfiniteQueries } from '@dudoong/utils';
import { css } from '@emotion/react';
import EventApi from '@lib/apis/event/EventApi';
import { EventProfileResponse } from '@lib/apis/event/eventType';
import HostApi from '@lib/apis/host/HostApi';
import { HostProfileResponse } from '@lib/apis/host/hostType';
import { PageType } from '@pages/common/Home';
import EventItem from './EventItem';
import HostItem from './HostItem';

interface ListProps {
  page: PageType;
}

const ADMIN_HOME_MAP = {
  event: {
    padding: [16, 16],
    apiFunction: EventApi.GET_EVENTS,
    item: EventItem,
  },
  host: {
    padding: [36, 44],
    apiFunction: HostApi.GET_HOSTS,
    item: HostItem,
  },
};

const List = ({ page }: ListProps) => {
  const ItemList = useInfiniteQueries<
    EventProfileResponse | HostProfileResponse
  >(page, ADMIN_HOME_MAP[page].apiFunction, ADMIN_HOME_MAP[page].item);
  return (
    <BorderBox
      padding={ADMIN_HOME_MAP[page].padding as PaddingSize}
      css={css`
        & > div > .host-divider:nth-last-of-type(2) {
          display: none;
        }
      `}
    >
      {ItemList}
    </BorderBox>
  );
};
export default List;
