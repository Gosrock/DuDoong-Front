import CreateHost from '@components/hosts/CreateHost';
import { ListHeader, Spacing } from '@dudoong/ui';

const Hosts = () => {
  return (
    <>
      <Spacing size={42} />
      <ListHeader
        title={'호스트 만들기'}
        size={'listHeader_24'}
        padding={[32, 24, 20, 0]}
      ></ListHeader>
      <Spacing size={20} />
      <CreateHost />
      <Spacing size={74} />
    </>
  );
};
export default Hosts;
