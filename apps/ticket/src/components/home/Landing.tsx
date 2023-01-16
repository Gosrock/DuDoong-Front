import { ListHeader } from '@dudoong/ui';
import DDHead from '@lib/utils/NextHead';
const Landing = () => {
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        <ListHeader title={'테스트페이지'} size="listHeader_28" />
      </main>
    </>
  );
};

export default Landing;
