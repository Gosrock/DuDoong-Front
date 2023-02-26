import {
  BorderBox,
  FlexBox,
  ListHeader,
  PaddingSize,
  Spacing,
  Text,
  Divider,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import EventApi from '@lib/apis/event/EventApi';
import HostApi from '@lib/apis/host/HostApi';
import type { HostProfileResponse } from '@lib/apis/host/hostType';
import { PageType } from '@pages/common/Home';
import EventItem from './EventItem';
import HostLink from './HostLink';
import { ReactComponent as DoongDoong } from '@assets/teduri.svg';
import { ComponentProps } from 'react';
import { useQuery } from '@tanstack/react-query';
import HostItem from '@components/shared/component/HostItem';

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

const HostList = ({ page }: ListProps) => {
  const { data } = useQuery(['hostList'], HostApi.GET_HOSTS);
  const hostList = data?.content;

  const realList = hostList?.filter(
    (invite: HostProfileResponse) => invite.active !== false,
  );
  const newInvite = hostList?.filter(
    (invite: HostProfileResponse) => invite.active === false,
  );

  if (hostList?.length === 0 && newInvite?.length === 0) {
    return (
      <>
        <Spacing size={70} />
        <FlexBox direction={'column'} align="center" gap={48}>
          <DoongDoong />
          <Text typo="P_Text_16_M" color="gray_500">
            두둥! 아무것도 없어요. aa
          </Text>
        </FlexBox>
      </>
    );
  } else {
    return (
      <>
        {realList && (
          <BorderBox
            padding={ADMIN_HOME_MAP[page].padding as PaddingSize}
            css={css`
              & > div > .host-divider:nth-last-of-type(1) {
                display: none;
              }
            `}
          >
            {realList.map((invite: HostProfileResponse) => (
              <HostLink {...invite} key={invite.hostId}></HostLink>
            ))}
          </BorderBox>
        )}
        <Spacing size={48} />
        {newInvite?.length !== 0 && (
          <BorderBox padding={ADMIN_HOME_MAP[page].padding as PaddingSize}>
            <ListHeader
              title={'새로 들어온 초대'}
              size={'listHeader_18'}
              padding={[0, 0, 0, 0]}
            />
            <Divider line={true} />
            {newInvite?.map((invite: HostProfileResponse) => (
              <>
                <HostItem
                  {...invite}
                  isNew={true}
                  key={invite.hostId}
                  disabled={true}
                ></HostItem>
                <Divider
                  line={true}
                  css={css`
                    :last-of-type {
                      display: none;
                    }
                  `}
                />
              </>
            ))}
          </BorderBox>
        )}

        <Spacing size={38} />
      </>
    );
  }
};
export default HostList;
