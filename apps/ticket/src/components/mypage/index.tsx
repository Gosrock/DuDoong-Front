import {
  Divider,
  FlexBox,
  ListHeader,
  NavBar,
  Padding,
  Profile,
  Spacing,
  TagButton,
  theme,
} from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { authState } from '@store/auth';
import { useResetRecoilState } from 'recoil';
import OrderItem from './OrderItem';
import { OrderApi } from '@lib/apis/order/OrderApi';
import Shortcuts from '@components/shared/Shortcuts';
import Main from '@components/shared/Layout/Main';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { resetCrendentials } from '@lib/utils/setCredentials';
import { GetServerSideProps } from 'next';

import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';
import { UserInfo } from '@lib/apis/user/userType';
import { UserApi } from '@lib/apis/user/UserApi';
import styled from '@emotion/styled';

const Mypage = ({ info }: { info: UserInfo }) => {
  const resetAuthState = useResetRecoilState(authState);
  const router = useRouter();
  const { isLoading, data } = useQuery(['recentOrderDetail'], () =>
    OrderApi.GET_RECENT_ORDER(),
  );

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
            <OrderItem {...data} />
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
      <Shortcuts text="공연 만들기" url="/admin" />
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
      <Shortcuts text="회원탈퇴" textColor="red_300" url="/" />
      <Spacing size={234} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookies } = context.req;
  console.log(cookies);

  try {
    setSsrAxiosHeader(cookies);
    const info: UserInfo = await UserApi.GET_MY_INFO();
    if (info) return { props: { info } };
    else return { redirect: { destination: '/home', permanent: false } };
  } catch (err: any) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      },
    };
  }
};
