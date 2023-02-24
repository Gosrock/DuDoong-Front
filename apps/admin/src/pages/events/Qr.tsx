import { FlexBox, ListHeader, Spacing } from '@dudoong/ui';
import QrReader from 'react-qr-reader';
import { ReactComponent as Scanner } from '@assets/scanner.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import { IssuedTicket } from '@lib/apis/event/eventType';
import { useLocation } from 'react-router-dom';
import useToastify from '@dudoong/ui/src/lib/useToastify';

const Qr = () => {
  const eventId = useLocation().pathname.split('/')[2];
  const { setToast } = useToastify();

  // 입장 처리 api
  const patchEventIssuedTicket = useMutation(
    EventApi.PATCH_EVENT_ISSUEDTICKET,
    {
      onSuccess: (data: IssuedTicket) => {
        console.log('PATCH_EVENT_ISSUEDTICKET : ', data);
        setToast({ type: 'success', comment: '입장이 완료되었습니다.' });
      },
      onError: (error: any) => {
        const comment = error.response.data.reason;
        setToast({ comment: comment });
      },
    },
  );

  const handleScan = (result: any) => {
    if (result) {
      console.log('scan ticket : ', result);
      patchEventIssuedTicket.mutate({
        eventId: eventId,
        issuedTicketId: result,
      });
    }
  };

  return (
    <>
      <ListHeader
        padding={[32, 0, 12, 0]}
        title={'QR 체크인'}
        size={'listHeader_24'}
        description={'체크인에 활용할 카메라를 선택해주세요!'}
      />
      <Spacing size={15} />
      <div
        css={css`
          position: relative;
        `}
      >
        <ScannerWrapper>
          <Scanner />
        </ScannerWrapper>
        <QrScanner
          delay={500}
          onScan={handleScan}
          onError={() => {}}
          facingMode="user"
          style={{
            borderRadius: '12px',
            boxShadow: '3px 4px 7px rgba(0, 0, 0, 0.15)',
            border: ` 1px solid #000`,
            width: '100%',
            height: '600px',
            padding: '0',
            margin: '0',
            overflow: 'hidden',
          }}
        />
      </div>
      <Spacing size={30} />
    </>
  );
};
export default Qr;

const ScannerWrapper = styled(FlexBox)`
  position: absolute;
  margin: 75px 0px;
  width: 100%;
  z-index: 50;
`;

const QrScanner = styled(QrReader)`
  & > section > div {
    border: 0px none !important;
    box-shadow: none !important;
  }
`;
