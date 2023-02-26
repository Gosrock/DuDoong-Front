import { Accordion, ListRow, Tag, theme } from '@dudoong/ui';
import { parseDate } from '@dudoong/utils';
import { css } from '@emotion/react';
import { OptionAnswer } from '@lib/apis/cart/cartType';
import { OrderLineTicketResponse } from '@lib/apis/order/orderType';
import InfoItem from './InfoItem';

const OrderedTicket = ({ ticket }: { ticket: OrderLineTicketResponse }) => {
  return (
    <div>
      {ticket.answers.length ? (
        <Accordion
          title={ticket.ticketName}
          rightElement={
            <Tag
              text={`각 티켓당 +${ticket.orderLinePrice}`}
              color="main"
              size="md"
            />
          }
          contentHeight={600} // 주관식 설문 글자 제한 있으면 계산해서...
          content={ticket.answers.map((answer: OptionAnswer, index) => (
            <ListRow
              key={answer.questionName}
              padding={[12, 24, 12, 24]}
              text={`${index + 1}. ${answer.questionName}`}
              subText={`${answer.answer} ${
                answer.additionalPrice !== '0원'
                  ? `(+${answer.additionalPrice})`
                  : ``
              }`}
              css={css`
                background-color: ${theme.palette.gray_100};
              `}
            />
          ))}
        />
      ) : (
        <InfoItem key={ticket.ticketNos} item="관리자 티켓" />
      )}
      <InfoItem item="예매번호" value={ticket.orderNo} />
      <InfoItem item="티켓번호" value={ticket.ticketNos} />
      <InfoItem item="예매자명" value={ticket.userName} />
      <InfoItem
        item="결제일시"
        value={
          ticket.paymentAt !== null
            ? `${parseDate(ticket.paymentAt)[0]} ${
                parseDate(ticket.paymentAt)[1]
              }`
            : ``
        }
      />
    </div>
  );
};

export default OrderedTicket;
