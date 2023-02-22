import { Divider } from '@dudoong/ui';
import { HostUser, HostDetailResponse } from '@lib/apis/host/hostType';
import { useLocation } from 'react-router-dom';
import { queryClient } from '../../../main';
import HostMember from './HostMember';

const HostMembers = () => {
  const hostId = useLocation().pathname.split('/')[2];
  // 호스트 디테일 api
  const hostDetail = queryClient.getQueryData([
    'hostDetail',
    hostId,
  ]) as HostDetailResponse;

  return hostDetail ? (
    <>
      <HostMember {...hostDetail.masterUser} />
      <Divider height={28} line padding={5} />
      {hostDetail.hostUsers.map((user: HostUser) => {
        return (
          <div key={user.userId}>
            <HostMember {...user} />
            <Divider height={28} line padding={5} />
          </div>
        );
      })}
    </>
  ) : null;
};

export default HostMembers;
