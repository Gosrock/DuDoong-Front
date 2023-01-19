import { Divider, ListHeader, Padding, Profile } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';

const Mypage = () => {
  return (
    <>
      <DDHead title="두둥! | 마이페이지" />
      <ListHeader title={'마이페이지'} size={'listHeader_28'} />
      <Padding size={[20, 24]}>
        <Profile size="big" name="한규진" subText="010-5536-4937" />
      </Padding>
      <Divider />
      <ListHeader title={'바로가기'} size={'listHeader_20'} />
    </>
  );
};

export default Mypage;
