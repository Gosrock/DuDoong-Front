import {
  Accordion,
  Button,
  ButtonSet,
  DatePicker,
  ListHeader,
  TimePicker,
} from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import DDHead from '@lib/utils/NextHead';
import { authState } from '@store/auth';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
const Landing = () => {
  const router = useRouter();
  const { openOverlay } = useGlobalOverlay();
  const openLoginTest = () => {
    openOverlay({ content: 'login' });
  };
  const [auth] = useRecoilState(authState);
  return (
    <>
      <DDHead title="두둥!" />
      <main>
        <ListHeader title={'테스트페이지'} size="listHeader_28" />
        <div>{auth.userProfile?.name}</div>
        <ButtonSet varient="vertical">
          <Button onClick={openLoginTest}>로그인 열기</Button>
          <Button onClick={() => router.push('/mypage')} isLoading={true}>
            마이페이지
          </Button>
        </ButtonSet>
        <DatePicker />
      </main>
    </>
  );
};

export default Landing;
