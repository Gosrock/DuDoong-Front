import { Button, ButtonSet, ListHeader } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { useRouter } from 'next/router';
const Landing = () => {
  const router = useRouter();
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        <ListHeader title={'테스트페이지'} size="listHeader_28" />
        <ButtonSet>
          <Button onClick={() => router.push('/book/option')}>
            티켓 예매 테스트
          </Button>
        </ButtonSet>
      </main>
    </>
  );
};

export default Landing;
