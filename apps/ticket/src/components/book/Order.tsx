import Main from '@components/shared/Layout/Main';
import { ListHeader, NavBar, Text, theme } from '@dudoong/ui';
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
      <Main>
        <NavBar
          backHandler={() => {
            router.back();
          }}
        />
        <ListHeader
          title={'결제하기'}
          size={'listHeader_20'}
          description={
            <Text typo="Text_14" color="gray_500">
              고스락 제 23회 정기공연
              <span css={{ color: `${theme.palette.main_500}` }}>
                {' '}
                일반티켓 총 3매
              </span>
            </Text>
          }
        />
      </Main>
    </>
  );
};

export default Order;
