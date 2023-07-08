import {
  Button,
  ButtonSet,
  Divider,
  FlexBox,
  ListHeader,
  NavBar,
  Padding,
  Profile,
  Spacing,
  TagButton,
  Text,
  theme,
} from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { authState } from '@store/auth';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import OrderItem from './OrderItem';
import { OrderApi } from '@lib/apis/order/OrderApi';
import Shortcuts from '@components/shared/Shortcuts';
import Main from '@components/shared/Layout/Main';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { resetCrendentials } from '@lib/utils/setCredentials';
import { GetServerSideProps } from 'next';
import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';
import { UserInfo } from '@lib/apis/user/userType';
import { UserApi } from '@lib/apis/user/UserApi';
import styled from '@emotion/styled';
import OverlayBox from '@components/shared/overlay/OverlayBox';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import useOverlay from '@lib/hooks/useOverlay';
import { AuthAPi } from '@lib/apis/axios';
import { useEffect } from 'react';
import { css } from '@emotion/react';

const Mypage = ({ info }: { info: UserInfo }) => {
  const { userProfile } = useRecoilValue(authState);
  const resetAuthState = useResetRecoilState(authState);
  const { setToast } = useToastify();
  const { isOpen, openOverlay, closeOverlay } = useOverlay();
  const router = useRouter();
  const { isLoading, data } = useQuery(['recentOrderDetail'], () =>
    OrderApi.GET_RECENT_ORDER(),
  );

  useEffect(() => {
    if (!userProfile?.id) {
      router.push('/home');
    }
  }, [userProfile]);

  const { mutate } = useMutation(AuthAPi.OAUTH_DELETE, {
    onSuccess: () => {
      router.push('/');
      setToast({ comment: '탈퇴가 정상적으로 완료되었습니다.' });
      resetAuthState();
      resetCrendentials();
      closeOverlay();
      router.replace(router.asPath);
    },

    onError: (error: any) => {
      const comment = error.response.data.reason;
      setToast({ comment: comment });
      closeOverlay();
    },
  });

  return (
    <Main>
      <DDHead title="두둥! | 마이페이지" />
      <NavBar backHandler={() => router.back()} />
      <ListHeader title={'마이페이지'} size={'listHeader_28'} />
      <Padding size={[20, 24]}>
        <Profile
          size="big"
          image={info?.profileImage}
          name={info?.userName || ''}
          subText={info?.phoneNumber}
        />
      </Padding>
      <Divider />
      <Spacing size={20} />
      <Padding size={[10, 24, 10, 24]}>
        <FlexBox>
          {isLoading ? (
            <SkeletonBox />
          ) : data ? (
            <FlexBox direction={'column'} fullWidth>
              <OrderItem {...data} />
              <Text
                typo="P_Text_12_R"
                color="gray_400"
                css={css`
                  margin-top: 12px;
                `}
              >
                가장 최근에 생성한 주문이에요.
              </Text>
            </FlexBox>
          ) : (
            <SkeletonBox>
              아직 예매한 티켓이 없어요.
              <TagButton
                text="공연 둘러보기"
                color="primary"
                size="lg"
                onClick={() => router.push('/home')}
              />
            </SkeletonBox>
          )}
        </FlexBox>
      </Padding>

      <ListHeader title={'바로가기'} size={'listHeader_20'} />

      <Shortcuts text="내 예매내역" url="/history" />
      <Shortcuts text="내 쿠폰함" url="/history/mycoupon" />
      <Divider />
      <Shortcuts text="공연 준비하기" url="/admin" />
      <Divider />
      <Shortcuts
        text="로그아웃"
        onClick={() => {
          resetAuthState();
          resetCrendentials();
          router.push('/home');
        }}
      />
      <Divider />
      <Shortcuts text="회원탈퇴" textColor="red_300" onClick={openOverlay} />
      <Spacing size={60} />

      <OverlayBox open={isOpen} onDismiss={closeOverlay}>
        <WithdrawConfirmation onDismiss={closeOverlay} onCancel={mutate} />
      </OverlayBox>
    </Main>
  );
};

export default Mypage;

const SkeletonBox = styled.div`
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};
  filter: drop-shadow(3px 4px 7px rgba(0, 0, 0, 0.15));

  width: 100%;
  max-width: 440px;
  height: 166px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  ${theme.typo.P_Text_16_R};
`;

const WithdrawConfirmation = ({
  onDismiss,
  onCancel,
}: {
  onDismiss: () => void;
  onCancel: () => void;
}) => {
  return (
    <>
      <ListHeader
        title="회원 탈퇴를 진행하시겠어요?"
        description="티켓을 예매한 상태이거나, 호스트로 관리 중인 공연이 있다면
회원 탈퇴 이후 해당 서비스를 이용하실 수 없어요."
        size="listHeader_18"
        gap={20}
      />
      <ButtonSet varient="horizontal" padding={[20, 24, 20, 24]}>
        <Button varient="tertiary" onClick={onCancel}>
          취소할래요
        </Button>
        <Button varient="secondary" onClick={onDismiss}>
          아니요
        </Button>
      </ButtonSet>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookies } = context.req;

  try {
    setSsrAxiosHeader(cookies);
    const info: UserInfo = await UserApi.GET_MY_INFO();
    if (info) return { props: { info } };
    else return { redirect: { destination: '/home', permanent: false } };
  } catch (err: any) {
    console.log(err.response);
    return {
      redirect: {
        destination: `/login/expired?redirect=mypage`,
        permanent: false,
      },
    };
  }
};
