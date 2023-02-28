import { ListHeader } from '@dudoong/ui';
import { palette } from '@dudoong/ui/src/theme/palette';
import { css } from '@emotion/react';
import type { OrderPaymentResponse } from '@lib/apis/order/orderType';
import InfoItem from './InfoItem';

const PaymentInfo = ({ payment }: { payment: OrderPaymentResponse }) => {
  return (
    <>
      <ListHeader title="결제정보" size="listHeader_18" />
      <InfoItem item="결제상태" value={payment.orderStatus} />
      <InfoItem item="결제수단" value={payment.paymentMethod} />
      <InfoItem item="금액" value={payment.supplyAmount} />
      <InfoItem item="할인" value={payment.discountAmount} />
      <InfoItem item="할인쿠폰" value={payment.couponName} />
      <InfoItem
        item="총 결제금액"
        value={payment.supplyAmount}
        typo="P_Header_18_SB"
        color="main_500"
        css={css`
          border-top: 1px solid ${palette.gray_200};
        `}
      />
    </>
  );
};

export default PaymentInfo;
