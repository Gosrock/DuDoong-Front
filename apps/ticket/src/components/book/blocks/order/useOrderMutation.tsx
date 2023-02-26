import { DOMAIN } from '@dudoong/utils';
import { OrderApi } from '@lib/apis/order/OrderApi';
import { useMutation } from '@tanstack/react-query';
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useRouter } from 'next/router';

const useOrderMutation = (instance?: PaymentWidgetInstance | null) => {
  const router = useRouter();
  const { mutate: orderMutate } = useMutation(OrderApi.CREATE_ORDER, {
    onSuccess: (data) => {
      if (data.isNeedPayment) {
        const payload = {
          orderId: data.orderId,
          orderName: data.orderName,
          successUrl: `${DOMAIN}/pay/confirm`,
          failUrl: `${DOMAIN}/pay/fail`,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
        };
        instance && instance.requestPayment(payload);
      } else if (data.approveType === '선착순') {
        //무료 선착순
        freeOrderMutate(data.orderId);
      } else {
        router.push(`/pay/success?order=${data.orderId}`, '/pay/success');
      }
    },
  });

  const { mutate: freeOrderMutate } = useMutation(OrderApi.POST_ORDER_FREE, {
    onSuccess: (data) => {
      router.push(`/pay/success?order=${data.orderId}`, '/pay/success');
    },
  });

  const { mutate: dudoongMutate } = useMutation(OrderApi.CREATE_ORDER, {
    onSuccess: (data) => {
      router.push(`/pay/success?order=${data.orderId}`, '/pay/success');
    },
  });

  return { orderMutate, dudoongMutate };
};

export default useOrderMutation;
