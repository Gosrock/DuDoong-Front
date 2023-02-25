import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import type { IssuedTicketInfo } from '@lib/apis/order/orderType';
import 'swiper/css';
import 'swiper/css/pagination';
import TicketItem from './TicketItem';

const TicketList = ({ tickets }: { tickets: IssuedTicketInfo[] }) => {
  console.log(tickets);
  const pagination = {
    clickable: true,
    renderBullet: (_index: number, className: string) => {
      return '<span class="' + className + '"></span>';
    },
  };
  const swiperParams = {
    spaceBetween: -18,
    centeredSlides: true,

    modules: [Pagination],
    pagination: pagination,
    autoplay: {
      delay: 5000000,
      disableOnInteraction: false,
    },
    initialSlide: 0,
  };

  return (
    <>
      <Swiper {...swiperParams}>
        {tickets.map((ticket: IssuedTicketInfo, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <TicketItem ticket={ticket} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default TicketList;
