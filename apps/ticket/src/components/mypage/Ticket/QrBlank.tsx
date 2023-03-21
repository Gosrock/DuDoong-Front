import { NavBar, Spacing } from '@dudoong/ui';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import QrSheetContainer from './QrSheetContainer';

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
