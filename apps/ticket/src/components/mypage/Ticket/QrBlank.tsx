import { NavBar, Spacing } from '@dudoong/ui';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';
import QrSheetContainer from './QrSheetContainer';

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  margin: 0,
  dotsOptions: {
    color: 'black',
    type: 'rounded',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  backgroundOptions: { color: '#ffffff' },
  imageOptions: {
    crossOrigin: 'anonymous',
  },
});

const QrBlank = () => {
  const { query, back } = useRouter();
  const ticketUuid = String(query.uuid);
  const { data, isSuccess } = useQuery(
    ['ticket', ticketUuid, 'pulling'],
    () => TicketApi.GET_ISSUEDTICKETS(ticketUuid),
    { refetchInterval: 1000 },
  );

  return (
    <>
      <NavBar backHandler={back} />
      <Spacing size={60} />
      {isSuccess && (
        <QrSheetContainer
          ticket={data?.issuedTicketInfo}
          title={data?.eventInfo.eventName}
        />
      )}
    </>
  );
};

export default QrBlank;
