import { useInfiniteQueries } from '@dudoong/utils';
import { HostProfileResponse } from '@lib/apis/host/hostType';
import HostApi from '@lib/apis/host/HostApi';
import HostProfile from './HostProfile';

interface HostProfilesProps {
  hostId: number;
  setHostId: (props: number) => void;
}

const HostProfiles = ({ hostId, setHostId }: HostProfilesProps) => {
  const HostProfileContainer = (props: HostProfileResponse) => {
    const onClick = () => {
      setHostId(props.hostId);
    };
    return <HostProfile {...props} onClick={onClick} isSelected={hostId} />;
  };

  const { infiniteListElement } = useInfiniteQueries<HostProfileResponse>(
    'host',
    HostApi.GET_HOSTS,
    HostProfileContainer,
  );
  return <>{infiniteListElement}</>;
};

export default HostProfiles;
