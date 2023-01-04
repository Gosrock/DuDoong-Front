import { Button } from '@dudoong/ui';
import DDHead from '@lib/utils/NextHead';
import { useRouter } from 'next/router';

const Landing = () => {
  const router = useRouter();
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        두둥 티켓 레포 보일러플레이트
        <Button
          onClick={() => {
            router.push('/home');
          }}
        >
          홈으로
        </Button>
      </main>
    </>
  );
};

export default Landing;
