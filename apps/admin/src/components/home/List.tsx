import BorderBox from '@components/shared/layout/BorderBox';
import { useInfiniteQueries } from '@dudoong/utils';
import { css } from '@emotion/react';
import { HostApi } from '@lib/apis/host/HostApi';
import { PageType } from '@pages/common/Home';
import EventItem from './EventItem';
import HostItem from './HostItem';

interface ListProps {
  page: PageType;
}

const List = ({ page }: ListProps) => {
  const ItemList = useInfiniteQueries(
    'hosts',
    HostApi.GET_HOSTS,
    page === 'event' ? EventItem : HostItem,
  );
  return (
    <BorderBox
      padding={[36, 44]}
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
