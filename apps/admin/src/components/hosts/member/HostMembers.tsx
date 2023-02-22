import { Divider } from '@dudoong/ui';
import HostItem, { HostItemProps } from '@components/shared/component/HostItem';
import {
  HostProfileResponse,
  HostUser,
  HostDetailResponse,
} from '@lib/apis/host/hostType';
import styled from '@emotion/styled';
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
      {hostDetail.hostUsers.map((user: HostUser) => {
        return (
          <div key={user.userId}>
            <Divider className="host-divider" height={28} line padding={5} />
            <HostMember {...user} />
          </div>
        );
      })}
    </>
  ) : null;
};

export default HostMembers;
