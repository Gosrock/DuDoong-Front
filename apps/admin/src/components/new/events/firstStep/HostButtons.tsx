import { useInfiniteQueries } from '@dudoong/utils';
import type { HostProfileResponse } from '@lib/apis/host/hostType';
import HostApi from '@lib/apis/host/HostApi';
import HostButton from './HostButton';

interface HostProfilesProps {
  hostId: number | null;
  setHostId: (props: number) => void;
}

const HostButtons = ({ hostId, setHostId }: HostProfilesProps) => {
  const HostProfileContainer = (props: HostProfileResponse) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setHostId(props.hostId);
      console.log(props.hostId);
    };
    return <HostButton {...props} onClick={onClick} selectedHostId={hostId} />;
  };

  const { infiniteListElement } = useInfiniteQueries<HostProfileResponse>(
    ['host'],
    HostApi.GET_HOSTS,
    HostProfileContainer,
  );
  return <>{infiniteListElement}</>;
};

export default HostButtons;
