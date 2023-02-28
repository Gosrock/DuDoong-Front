import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import { Divider, NavBar } from '@dudoong/ui';
import { OrderApi } from '@lib/apis/order/OrderApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import DetailEventInfo from './Detail/DetailEventInfo';
import Tickets from './Detail/TicketsInfo';
import PaymentInfo from './Detail/PaymentInfo';
import CancelTicket from './Detail/RefundInfo';
import TicketsInfo from './Detail/TicketsInfo';
import RefundInfo from './Detail/RefundInfo';

const OrderDetail = () => {
  const {
    query: { orderId },
    back,
  } = useRouter();

  const { data } = useQuery(['orderDetail', orderId], () =>
    OrderApi.GET_ORDERS_DETAIL(orderId as string),
  );

  return (
    <Main>
      <DDHead title="두둥!" />
      <NavBar label="예매 상세내역" backHandler={() => back()} />
      {data ? (
        <>
          <DetailEventInfo event={data.eventProfile} />
          <Divider />
          <TicketsInfo tickets={data.tickets} />
          <Divider />
          <PaymentInfo payment={data.paymentInfo} />
          <Divider />
          <RefundInfo refund={data.refundInfo} />
        </>
      ) : (
        <></>
      )}
    </Main>
  );
};

export default OrderDetail;
