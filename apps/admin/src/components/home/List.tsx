import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { FlexBox, PaddingSize, Spacing, Text } from '@dudoong/ui';
import { useInfiniteQueries } from '@dudoong/utils';
import { css } from '@emotion/react';
import EventApi from '@lib/apis/event/EventApi';
import type { EventProfileResponse } from '@lib/apis/event/eventType';
import HostApi from '@lib/apis/host/HostApi';
import type { HostProfileResponse } from '@lib/apis/host/hostType';
import { PageType } from '@pages/common/Home';
import EventItem from './EventItem';
import HostLink from './HostLink';
import { ReactComponent as DoongDoong } from '@assets/teduri.svg';

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
    item: HostLink,
  },
};

const List = ({ page }: ListProps) => {
  const { infiniteListElement, isEmpty } = useInfiniteQueries<
    EventProfileResponse | HostProfileResponse
  >([page], ADMIN_HOME_MAP[page].apiFunction, ADMIN_HOME_MAP[page].item);

  if (isEmpty) {
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
  } else {
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
        <Spacing size={38} />
      </>
    );
  }
};
export default List;
