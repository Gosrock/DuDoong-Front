import { Button } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import DDHead from '@components/shared/Layout/NextHead';
const Home = () => {
  const { openGlobalOverlay } = useGlobalOverlay();
  const openLoginTest = () => {
    openGlobalOverlay({ content: 'login' });
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
