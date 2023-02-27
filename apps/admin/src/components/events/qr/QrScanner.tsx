import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import { IssuedTicket } from '@lib/apis/event/eventType';
import { useLocation } from 'react-router-dom';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import QrReader from 'react-qr-reader';
import { css } from '@emotion/react';
import { ViewType } from '@pages/events/Qr';

interface QrScannerProps {
  newView: boolean;
  cam?: ViewType;
}

const QrScanner = ({ newView, cam = 'user' }: QrScannerProps) => {
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
    },
  );

  const handleScan = (result: any) => {
    if (result) {
      console.log('scan ticket : ', result);
      patchEventIssuedTicket.mutate({
        eventId: eventId,
        uuid: result,
      });
    }
  };

  const qrReaderStyle = newView
    ? {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        zIndex: '10',
      }
    : {
        borderRadius: '12px',
        boxShadow: '3px 4px 7px rgba(0, 0, 0, 0.15)',
        border: ` 1px solid #000`,
        width: '100%',
        height: '600px',
        padding: '0',
        margin: '0',
        overflow: 'hidden',
      };

  console.log(cam);
  return (
    <QrCodeReader
      delay={1000}
      onScan={handleScan}
      onError={() => {}}
      facingMode={cam}
      style={qrReaderStyle}
      newView={newView}
    />
  );
};

export default QrScanner;

interface QrCodeReaderProps {
  newView: boolean;
}

const QrCodeReader = styled(QrReader)<QrCodeReaderProps>`
  & > section > div {
    border: 0px none !important;
    box-shadow: none !important;
  }
  ${({ newView }) =>
    newView
      ? css`
          & > section > video {
            height: 100vh !important;
          }
          & > section {
            height: 100vh !important;
          }
        `
      : null}
`;
