import { ListHeader, NavBar } from '@dudoong/ui';
import DDHead from '@lib/utils/NextHead';

const Option = () => {
  return (
    <>
      <DDHead title="두둥!" />
      <NavBar backHandler={() => {}} />
      <ListHeader title={'옵션 선택하기'} size={'listHeader_20'} />
    </>
  );
};

export default Option;
