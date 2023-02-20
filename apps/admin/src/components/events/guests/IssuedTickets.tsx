import TicketApi from '@lib/apis/ticket/TicketApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const columns = [
  '티켓 번호',
  '이름',
  '이메일',
  '전화 번호',
  '주문 번호',
  '발급 일시',
  '체크인',
  '체크인 시간',
];

const IssuedTickets = () => {
  const eventId = useLocation().pathname.split('/')[2];
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useQuery(
    ['events', eventId, 'issuedTickets', page],
    () => TicketApi.GET_ISSUEDTICKETS({ eventId, page }),
  );
  return <>asdf</>;
};

export default IssuedTickets;
