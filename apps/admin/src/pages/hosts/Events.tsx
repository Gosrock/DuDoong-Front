import HostsEvents from '@components/hosts/HostsEvents';
import { ListHeader, Spacing } from '@dudoong/ui';

const Events = () => {
  return (
    <>
      <ListHeader
        padding={[32, 0, 16, 0]}
        size={'listHeader_24'}
        title={'등록한 공연 한눈에 보기'}
      />
      <Spacing size={20} />
      <HostsEvents />
    </>
  );
};
export default Events;
