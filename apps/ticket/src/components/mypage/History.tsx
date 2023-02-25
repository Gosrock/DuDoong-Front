import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import { NavBar } from '@dudoong/ui';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import OrderList from './OrderList';

const History = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <Main>
      <DDHead title="두둥!" />
      <NavBar label="내 예매내역" backHandler={() => router.back()} />
      <OrderList ref={ref} />
    </Main>
  );
};
export default History;
