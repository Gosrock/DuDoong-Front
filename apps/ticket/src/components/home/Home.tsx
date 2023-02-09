import { Button, ButtonSet, Footer, ListHeader } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import DDHead from '@components/shared/Layout/NextHead';
import { useRouter } from 'next/router';
const Home = () => {
  const router = useRouter();
  const { openGlobalOverlay } = useGlobalOverlay();
  const openLoginTest = () => {
    openGlobalOverlay({ content: 'login' });
  };
  return (
    <>
      <DDHead title="두둥! | 홈" />
      <main>
        <ListHeader title={'테스트페이지'} size="listHeader_28" />
        <ButtonSet varient="horizontal">
          <Button onClick={openLoginTest}>로그인 열기</Button>
          <Button onClick={() => router.push('/events/1')}>event1</Button>
        </ButtonSet>
      </main>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
