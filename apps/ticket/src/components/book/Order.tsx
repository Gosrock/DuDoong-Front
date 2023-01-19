import { NavBar } from '@dudoong/ui';
import DDHead from '@lib/utils/NextHead';
import { useRouter } from 'next/router';

const Order = () => {
  const router = useRouter();
  if (router.query.data) {
    console.log(router.query.data);
  }
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        <NavBar
          backHandler={() => {
            router.back();
          }}
        />
      </main>
    </>
  );
};

export default Order;
