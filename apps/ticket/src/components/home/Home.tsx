import { Button } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import DDHead from '@lib/utils/NextHead';
const Home = () => {
  const { openOverlay } = useGlobalOverlay();
  const openLoginTest = () => {
    openOverlay({ content: 'login' });
  };
  return (
    <>
      <DDHead title="두둥! | 홈" />
      <main>
        <Button onClick={openLoginTest}>로그인 열기</Button>
      </main>
    </>
  );
};

export default Home;
