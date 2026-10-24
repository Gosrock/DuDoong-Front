import Main from '@components/shared/Layout/Main';
import {
  Button,
  ButtonSet,
  Divider,
  Footer,
  ListHeader,
  NavBar,
  Spacing,
  Text,
  theme,
} from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import type { AddCartResponse } from '@lib/apis/cart/cartType';
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
import Info from './blocks/order/Info';
import { css } from '@emotion/react';
import SelectPayMethod from './blocks/order/SelectPayMethod';
import useOverlay from '@lib/hooks/useOverlay';
import OverlayBox from '@components/shared/overlay/OverlayBox';
import AccountInfoSection from './blocks/order/AccountInfoSection';
import { useEffect, useState } from 'react';
import { authState } from '@store/auth';
import { useRecoilValue } from 'recoil';
import { checkName } from '@dudoong/utils';
import { AGREEMENT_VERSION } from '@lib/constants/agreement';
import HostProvisionConsent from './blocks/order/HostProvisionConsent';

const BOTTOM_BAR_ID = 'order-bottom-bar';

const Order = ({ data }: { data: AddCartResponse }) => {
  const router = useRouter();

  const [coupon] = useState(null);
  const [hostProvisionAgreed, setHostProvisionAgreed] = useState(false);
  // 하단 고정 바(동의 상세 펼침에 따라 높이가 변함)에 본문이 가려지지 않도록 높이를 측정한다
  const [bottomBarHeight, setBottomBarHeight] = useState(0);

  useEffect(() => {
    const bar = document.getElementById(BOTTOM_BAR_ID);
    if (!bar) return;
    const observer = new ResizeObserver(() =>
      setBottomBarHeight(bar.offsetHeight),
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);
  const isDudoong = data.ticketPayType === '두둥티켓';
  const isNeedTossPayment = data.ticketPayType === '유료티켓';
  const { instance } = useTossPayments(data.totalPrice, isNeedTossPayment);
  const { orderMutate } = useOrderMutation(instance);
  const skipSelectOption = data.items[0].answers.length === 0;
  const { isOpen, openOverlay, closeOverlay } = useOverlay();
  const { userProfile } = useRecoilValue(authState);

  const handleNavBarButton = () => {
    // 옵션 선택이 생략되었을땐 바로 상세페이지로 뒤로가기
    return skipSelectOption
      ? router.replace(`/events/${router.query.eventId}`)
      : router.back();
  };

  const orderPayload = {
    couponId: coupon,
    cartId: data.cartId,
    hostProvisionAgreed: true,
    agreementVersion: AGREEMENT_VERSION,
  };

  const handleOrder = () => {
    isDudoong ? openOverlay() : orderMutate(orderPayload);
  };

  return (
    <>
      <DDHead title="두둥!" />
      <Main>
        <NavBar backHandler={handleNavBarButton} />
        {/* 헤더 */}
        <BookHeader
          title="결제하기"
          description={[data.eventProfile.name, data.title, data.totalQuantity]}
        />
        <Divider />
        {/* 티켓옵션 프리뷰 */}
        <ListHeader size="listHeader_18" title={'내 티켓 확인하기'} />
        {data.items.map((item, i) => (
          <ItemPreview item={item} key={`${item.name}-${i}`} />
        ))}
        <Divider />
        {/* 할인 쿠폰 TODO : 토스페이먼트 메소드에서 적용하기 */}
        <ListHeader size="listHeader_18" title={'할인 쿠폰 선택하기'} />
        <CouponSelect />
        <Divider />
        {/* 결제금액 */}
        <ListHeader size="listHeader_18" title={'결제금액'} />
        <Totalprice price={data.totalPrice} />
        {/* 결제정보 */}
        {data.totalPrice !== '0원' && (
          <>
            <Divider />
            <ListHeader
              size="listHeader_18"
              title={'결제정보'}
              description={
                isDudoong
                  ? `입금자명은 ${checkName(userProfile!.name)} 해주세요`
                  : ''
              }
            />
            <SelectPayMethod
              instance={instance}
              isDudoong={isDudoong}
              account={data.accountInfo}
            />
          </>
        )}
        {/* 판매정보 */}
        <Divider />
        <div
          css={css`
            background-color: ${theme.palette.gray_100};
            & > div:first-of-type > div > div > span {
              color: ${theme.palette.gray_400} !important;
            }
          `}
        >
          <ListHeader size="listHeader_18" title={'판매정보'} />
          <Info
            isDudoong={isDudoong && data.totalPrice !== '0원'}
            isFree={data.totalPrice === '0원'}
          />
          <Spacing size={60} />
        </div>

        {/* 다음으로 버튼 */}
        <ButtonSet
          id={BOTTOM_BAR_ID}
          bottomFixed
          backGradient
          varient="vertical"
        >
          <HostProvisionConsent
            eventName={data.eventProfile.name}
            isDudoong={isDudoong}
            checked={hostProvisionAgreed}
            onChange={setHostProvisionAgreed}
          />
          <Text
            typo="P_Text_12_R"
            color="gray_500"
            css={css`
              text-align: center;
            `}
          >
            두둥은 통신판매중개자로서 공연의 당사자가 아니며, 공연에 관한 의무와
            책임은 호스트에게 있습니다.
            <br />위 내용을 확인하였으며 결제에 동의합니다.
          </Text>
          <Button
            fullWidth
            onClick={handleOrder}
            disabled={!hostProvisionAgreed}
          >
            {data.totalPrice} 결제하기
          </Button>
        </ButtonSet>

        <section>
          <Footer />
        </section>
        <Spacing size={bottomBarHeight + 20} color={'gray_200'} />
      </Main>
      {isDudoong && (
        <OverlayBox open={isOpen} onDismiss={closeOverlay}>
          <AccountInfoSection
            accountInfo={data.accountInfo}
            orderPayload={orderPayload}
            closeOverlay={closeOverlay}
            name={userProfile!.name}
          />
        </OverlayBox>
      )}
    </>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { state, eventId } = context.query;
  const { cookies } = context.req;

  if (!state) {
    try {
      setSsrAxiosHeader(cookies);
      const data = await CartApi.RECENT_CARTLINE();
      if (data) return { props: { data } };
      else return { redirect: { destination: '/', permanent: false } };
    } catch (e: any) {
      //TODO : 로그인 후 리다이렉트 url QA때 토큰 이리저리 해보면서 확인
      const { status } = e.response.data;

      //토큰 만료일때 -> 재로그인 페이지로
      if (status === 401 || status === 403) {
        const redirectURi = encodeURIComponent(
          `/events/${context.params!.eventId}`,
        );
        return {
          redirect: {
            destination: `/login/expired?redirect=${redirectURi}`,
            permanent: false,
          },
        };
      }

      const redirectUrl = `events/${eventId}`;
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
