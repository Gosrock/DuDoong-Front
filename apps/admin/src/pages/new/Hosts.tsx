import CreateHost from '@components/hosts/CreateHost';
import AdminNoMenuLayout from '@components/shared/layout/AdminNoMenuLayout';
import { ListHeader, Spacing } from '@dudoong/ui';

const Hosts = () => {
  return (
    <>
      <AdminNoMenuLayout />
      <ListHeader
        title={'호스트 만들기'}
        size={'listHeader_24'}
        padding={[32, 24, 20, 0]}
      ></ListHeader>
      <Spacing size={20} />
      <CreateHost></CreateHost>
      <Spacing size={74} />
    </>
  );
};
export default Hosts;
