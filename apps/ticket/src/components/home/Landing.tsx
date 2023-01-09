import { Button, ButtonSet, ListHeader } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import DDHead from '@lib/utils/NextHead';
import { useRouter } from 'next/router';

const Landing = () => {
  const { openOverlay } = useGlobalOverlay();
  const router = useRouter();
  const openLoginTest = () => {
    openOverlay({ content: 'login' });
  };
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        <ListHeader title={'테스트페이지'} size="listHeader_28" />

        <ButtonSet varient="vertical">
          <Button onClick={openLoginTest}>로그인 열기</Button>
          <Button onClick={() => router.push('/mypage')}>마이페이지</Button>
        </ButtonSet>
      </main>
    </>
  );
};

export default Landing;
