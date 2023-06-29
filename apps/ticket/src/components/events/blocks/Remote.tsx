import { Button, Modal } from '@dudoong/ui';
import Talk from '@assets/talk.svg';
import styled from '@emotion/styled';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';
import { useRouter } from 'next/router';
import useOverlay from '@lib/hooks/useOverlay';
import TalkOverlay from './Talk/Index';

interface RemoteProps {
  openTicketOverlay: () => void;
  eventName: string;
  isOutdated: boolean;
}

const Remote = ({ openTicketOverlay, eventName, isOutdated }: RemoteProps) => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const { openGlobalOverlay } = useGlobalOverlay();
  const {
    openOverlay: openTalkOverlay,
    isOpen,
    closeOverlay: closeTalkOverlay,
  } = useOverlay();

  const handleClickBooking = () => {
    auth.isAuthenticated
      ? openTicketOverlay()
      : openGlobalOverlay({
          content: 'login',
          props: { redirect: router.asPath },
        });
  };

  return (
    <>
      <Wrapper>
        <Button varient="tertiary" width={56} onClick={openTalkOverlay}>
          <Talk />
        </Button>
        <Button
          varient="primary"
          fullWidth
          onClick={handleClickBooking}
          disabled={isOutdated}
        >
          {isOutdated ? '지난 공연' : '예매하기'}
        </Button>
      </Wrapper>
      <Modal open={isOpen} onDismiss={closeTalkOverlay}>
        <TalkOverlay
          eventName={eventName}
          onClose={closeTalkOverlay}
          isOpen={isOpen}
        />
      </Modal>
    </>
  );
};

export default Remote;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 56px auto;
  grid-column-gap: 10px;
`;
