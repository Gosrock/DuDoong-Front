import { useInfiniteQueries } from '@dudoong/utils';
import { HostProfileResponse } from '@lib/apis/host/hostType';
import HostApi from '@lib/apis/host/HostApi';
import HostItem from '@components/shared/component/HostItem';

interface HostProfilesProps {
  hostId: number | null;
  setHostId: (props: number) => void;
}

const HostProfiles = ({ hostId, setHostId }: HostProfilesProps) => {
  const HostProfileContainer = (props: HostProfileResponse) => {
    const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setHostId(props.hostId);
      console.log(props.hostId);
    };
    return (
      <HostItem
        {...props}
        type={'sm'}
        onClick={onClick}
        selectedHostId={hostId}
      />
    );
  };

  const { infiniteListElement } = useInfiniteQueries<HostProfileResponse>(
    'host',
    HostApi.GET_HOSTS,
    HostProfileContainer,
  );
  return <>{infiniteListElement}</>;
};

export default HostProfiles;
