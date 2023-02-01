import BorderBox from '@components/shared/layout/BorderBox';
import { useInfiniteQueries } from '@dudoong/utils';
import { HostApi } from '@lib/apis/host/HostApi';
import { HostProfileResponse } from '@lib/apis/host/hostType';

const Host = () => {
  const Elem = (props: HostProfileResponse) => <div>{props.name}</div>;
  const list = useInfiniteQueries('hosts', HostApi.GET_HOSTS, Elem);
  return <BorderBox padding={[36, 60]}>{list}</BorderBox>;
};
export default Host;
