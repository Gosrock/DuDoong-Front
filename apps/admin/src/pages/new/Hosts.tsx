import CreateHost from '@components/hosts/CreateHost';
import { ListHeader, Spacing } from '@dudoong/ui';

const Hosts = () => {
  return (
    <>
      <Spacing size={42} />
      <ListHeader
        title={'호스트를 새로 만들어볼까요?'}
        size={'listHeader_24'}
        padding={[32, 24, 20, 0]}
      ></ListHeader>
      <Spacing size={20} />
      <CreateHost />
      <Spacing size={72} />
    </>
  );
};
export default Hosts;
