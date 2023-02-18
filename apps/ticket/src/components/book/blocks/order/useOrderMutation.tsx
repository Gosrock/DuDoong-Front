import { DOMAIN } from '@dudoong/utils';
import { OrderApi } from '@lib/apis/order/OrderApi';
import { useMutation } from '@tanstack/react-query';
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useRouter } from 'next/router';

const useOrderMutation = (instance?: PaymentWidgetInstance | null) => {
  const router = useRouter();
  const { mutate: orderMutate } = useMutation(OrderApi.CREATE_ORDER, {
    onSuccess: (data) => {
      const payload = {
        orderId: data.orderId,
        orderName: data.orderName,
        successUrl: `${DOMAIN}/pay/confirm`,
        failUrl: `${DOMAIN}/pay/fail`,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
      };
      instance && instance.requestPayment(payload);
    },
  });

  const { mutate: dudoongMutate } = useMutation(OrderApi.CREATE_ORDER, {
    onSuccess: (data) => {
      router.replace(`/pay/success?order=${data.orderId}`, '/pay/success');
    },
  });

  return { orderMutate, dudoongMutate };
};

export default useOrderMutation;
