import Main from '@components/shared/Layout/Main';
import {
  Button,
  ButtonSet,
  Divider,
  ListHeader,
  NavBar,
  Spacing,
} from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import { AddCartResponse } from '@lib/apis/cart/cartType';
import DDHead from '@components/shared/Layout/NextHead';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import BookHeader from './blocks/order/BookHeader';
import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';
import CouponSelect from './blocks/order/CouponSelect';
import Totalprice from './blocks/order/TotalPrice';
import ItemPreview from './blocks/order/ItemPreview';
import useOrderMutation from './blocks/order/useOrderMutation';
import useTossPayments from './blocks/order/useTossPayments';

const Order = ({ data }: { data: AddCartResponse }) => {
  const router = useRouter();
  const { instance, Payment } = useTossPayments();
  const { orderMutate } = useOrderMutation(instance);
  return (
    <>
      <DDHead title="두둥!" />
      <Main>
        <NavBar
          backHandler={() => {
            router.back();
          }}
        />
        {/* 헤더 */}
        <BookHeader
          title="결제하기"
          description={['고스락 제 23회 정기공연', '일반티켓', 3]}
        />
        <Divider />
        {/* 티켓옵션 프리뷰 */}
        <ListHeader size="listHeader_18" title={'내 티켓 확인하기'} />
        {data.items.map((item) => (
          <ItemPreview item={item} key={item.name} />
        ))}
        <Divider />
        {/* 할인 쿠폰 TODO : 토스페이먼트 메소드에서 적용하기 */}
        <ListHeader size="listHeader_18" title={'할인 쿠폰 선택하기'} />
        <CouponSelect />
        <Divider />
        {/* 결제금액 */}
        <ListHeader size="listHeader_18" title={'결제금액'} />
        <Totalprice price={data.totalPrice} />
        <Divider />
        {/* 결제정보 */}
        <ListHeader size="listHeader_18" title={'결제정보'} />
        <Payment />
        <Spacing size={120} />

        {/* 다음으로 버튼 */}
        <ButtonSet bottomFixed backGradient>
          <Button
            fullWidth
            onClick={() => {
              orderMutate({ couponId: null, cartId: data.cartId });
            }}
          >
            {data.totalPrice} 결제하기
          </Button>
        </ButtonSet>
      </Main>
    </>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { state } = context.query;
  const { cookies } = context.req;

  if (!state) {
    try {
      setSsrAxiosHeader(cookies);
      const data = await CartApi.RECENT_CARTLINE();
      if (data) return { props: { data } };
      else return { redirect: { destination: '/', permanent: false } };
    } catch (err: any) {
      //TODO : 로그인 후 리다이렉트 url QA때 토큰 이리저리 해보면서 확인
      const redirectUrl = '/book/order';
      return {
        redirect: {
          destination: `/login/expired?redirect=${redirectUrl}`,
          permanent: false,
        },
      };
    }
  } else {
    const data = JSON.parse(state as string) as AddCartResponse;
    return { props: { data } };
  }
};
