import { Button, ListHeader, Padding } from '@dudoong/ui';
import DDHead from '@lib/utils/NextHead';
import { useRouter } from 'next/router';

const Landing = () => {
  const router = useRouter();
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        <ListHeader title={'홈'} variant="listHeader_28" />

        <Padding>
          <Button
            onClick={() => {
              router.push('/home');
            }}
          >
            홈으로
          </Button>
        </Padding>
      </main>
    </>
  );
};

export default Landing;
