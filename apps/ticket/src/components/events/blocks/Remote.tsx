import { Button, ButtonSet } from '@dudoong/ui';
import Talk from '@assets/talk.svg';
import styled from '@emotion/styled';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';
import { useRouter } from 'next/router';

const Remote = ({ openOverlay }: { openOverlay: () => void }) => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const { openGlobalOverlay } = useGlobalOverlay();

  const handleClickBooking = () => {
    auth.isAuthenticated
      ? openOverlay()
      : openGlobalOverlay({
          content: 'login',
          props: { redirect: router.asPath },
        });
  };

  return (
    <Wrapper>
      <Button varient="tertiary" width={56}>
        <Talk />
      </Button>
      <Button varient="primary" fullWidth onClick={handleClickBooking}>
        예매하기
      </Button>
    </Wrapper>
  );
};

export default Remote;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 56px auto;
  grid-column-gap: 10px;
`;
