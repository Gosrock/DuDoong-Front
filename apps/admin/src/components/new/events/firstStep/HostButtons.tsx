import { useInfiniteQueries } from '@dudoong/utils';
import type { HostProfileResponse } from '@lib/apis/host/hostType';
import HostApi from '@lib/apis/host/HostApi';
import HostButton from './HostButton';
import { useQuery } from '@tanstack/react-query';
import HostItem from '@components/shared/component/HostItem';
import { Divider } from '@dudoong/ui';
import { css } from '@emotion/react';

interface HostProfilesProps {
  hostId: number | null;
  setHostId: (props: number) => void;
}

const HostButtons = ({ hostId, setHostId }: HostProfilesProps) => {
  const HostProfileContainer = (props: HostProfileResponse) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setHostId(props.hostId);
    };
    return (
      <HostButton
        {...props}
        key={props.hostId}
        onClick={onClick}
        selectedHostId={hostId}
      />
    );
  };

  const { data, isSuccess } = useQuery(['hostList'], HostApi.GET_HOSTS);
  const hostList = data?.content;

  const realList = hostList?.filter(
    (invite: HostProfileResponse) => invite.active !== false,
  );
  if (realList || isSuccess) {
    return (
      <>
        {realList &&
          realList.map((invite: HostProfileResponse) => (
            <div key={invite.hostId}>{HostProfileContainer(invite)}</div>
          ))}
      </>
    );
  } else {
    return null;
  }
};

export default HostButtons;
