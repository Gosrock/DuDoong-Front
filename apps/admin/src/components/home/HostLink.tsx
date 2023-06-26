import { Divider } from '@dudoong/ui';
import { Link } from 'react-router-dom';
import type { HostProfileResponse } from '@lib/apis/host/hostType';
import HostItem from '@components/shared/component/HostItem';
import React from 'react';

const HostLink = (props: HostProfileResponse) => {
  return (
    <>
      <Link to={`/hosts/${props.hostId}/info`}>
        <HostItem {...props} />
      </Link>
      <Divider className="host-divider" height={28} line padding={16} />
    </>
  );
};

export default React.memo(HostLink);
