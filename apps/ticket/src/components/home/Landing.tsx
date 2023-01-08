import { Button, ButtonSet, ListHeader } from '@dudoong/ui';
import DDHead from '@lib/utils/NextHead';
import { useRouter } from 'next/router';

const Landing = () => {
  const router = useRouter();
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        <ListHeader title={'테스트페이지'} size="listHeader_28" />

        <ButtonSet varient="vertical">
          <Button onClick={() => router.push('/home')}>홈</Button>
          <Button onClick={() => router.push('/mypage')}>마이페이지</Button>
        </ButtonSet>
      </main>
    </>
  );
};

export default Landing;
