import { ListHeader, Spacing } from '@dudoong/ui';
import { OrderLineTicketResponse } from '@lib/apis/order/orderType';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import OrderedTicket from './OrderedTicket';

const TicketsInfo = ({ tickets }: { tickets: OrderLineTicketResponse[] }) => {
  const pagination = {
    clickable: true,
    renderBullet: (_index: number, className: string) => {
      return '<span class="' + className + '"></span>';
    },
  };

  const swiperParams = {
    centeredSlides: true,

    modules: [Pagination],
    pagination: pagination,

    initialSlide: 0,
  };

  return (
    <>
      <ListHeader title="예매정보" size="listHeader_18" />
      <Swiper {...swiperParams}>
        {tickets.map((ticket: OrderLineTicketResponse, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <OrderedTicket ticket={ticket} />
              <Spacing size={48} color="gray_100" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default TicketsInfo;
