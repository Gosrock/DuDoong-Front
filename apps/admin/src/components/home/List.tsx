import { BorderBox, FlexBox, PaddingSize, Spacing, Text } from '@dudoong/ui';
import { useInfiniteQueries } from '@dudoong/utils';
import { css } from '@emotion/react';
import EventApi from '@lib/apis/event/EventApi';
import type { EventProfileResponse } from '@lib/apis/event/eventType';
import HostApi from '@lib/apis/host/HostApi';
import { PageType } from '@pages/common/Home';
import EventItem from './EventItem';
import HostLink from './HostLink';
import { ReactComponent as DoongDoong } from '@assets/teduri.svg';
import { ComponentProps } from 'react';
import HostList from './HostList';

interface ListProps {
  page: PageType;
}

const ADMIN_HOME_MAP: Record<
  PageType,
  {
    padding: PaddingSize;
    apiFunction: (args: any) => Promise<any>;
    item: (props: ComponentProps<any>) => JSX.Element;
  }
> = {
  event: {
    padding: [16, 16],
    apiFunction: EventApi.GET_EVENTS,
    item: EventItem,
  },
  host: {
    padding: [36, 44],
    apiFunction: HostApi.GET_HOSTS,
    item: HostLink,
  },
};

const List = ({ page }: ListProps) => {
  const { infiniteListElement, isEmpty } =
    useInfiniteQueries<EventProfileResponse>(
      ['event'],
      ADMIN_HOME_MAP['event'].apiFunction,
      ADMIN_HOME_MAP['event'].item,
    );

  if (page === 'event' && !isEmpty) {
    return (
      <>
        <BorderBox
          padding={ADMIN_HOME_MAP[page].padding as PaddingSize}
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
  } else if (page === 'host') {
    return <HostList page="host"></HostList>;
  } else {
    return (
      <>
        <Spacing size={70} />
        <FlexBox direction={'column'} align="center" gap={48}>
          <DoongDoong />
          <Text typo="P_Text_16_M" color="gray_500">
            두둥! 아무것도 없어요.
          </Text>
        </FlexBox>
      </>
    );
  }
};
export default List;
