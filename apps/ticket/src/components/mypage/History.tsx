import TalkList from '@components/events/blocks/Talk/TalkList';
import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import { FlexBox, MenuBar, NavBar } from '@dudoong/ui';
import { useInfiniteQueries } from '@dudoong/utils';
import styled from '@emotion/styled';
import { OrderApi } from '@lib/apis/order/OrderApi';
import { OrderListResponse } from '@lib/apis/order/orderType';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import OrderItem from './OrderItem';
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
