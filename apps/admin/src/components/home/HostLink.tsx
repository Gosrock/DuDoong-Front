import { Divider } from '@dudoong/ui';
import { Link } from 'react-router-dom';
import { HostProfileResponse } from '@lib/apis/host/hostType';
import HostItem from '@components/shared/component/HostItem';

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

export default HostLink;
