import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import type { IssuedTicketInfo } from '@lib/apis/order/orderType';
import 'swiper/css';
import 'swiper/css/pagination';
import TicketItem from './TicketItem';
import { Button, ButtonSet } from '@dudoong/ui';
import Link from 'next/link';
import { css } from '@emotion/react';

const TicketList = ({
  tickets,
  orderUuid,
  title,
}: {
  tickets: IssuedTicketInfo[];
  orderUuid: string;
  title: string;
}) => {
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
        {tickets.length === 0 ? (
          <ButtonSet varient="horizontal" padding={[20, 24]}>
            <Link
              href={`/history/${orderUuid}`}
              css={css`
                width: 100%;
              `}
            >
              <Button varient="tertiary" fullWidth>
                예매 상세
              </Button>
            </Link>
            <Button varient="tertiary" fullWidth disabled>
              승인 대기중
            </Button>
          </ButtonSet>
        ) : (
          <>
            {tickets.map((ticket: IssuedTicketInfo, idx: number) => {
              return (
                <SwiperSlide key={idx}>
                  <TicketItem
                    ticket={ticket}
                    orderUuid={orderUuid}
                    title={title}
                  />
                </SwiperSlide>
              );
            })}
          </>
        )}
      </Swiper>
    </>
  );
};

export default TicketList;
