import { OrderApi } from '@lib/apis/order/OrderApi';
import { useMutation } from '@tanstack/react-query';
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';

const useOrderMutation = (instance: PaymentWidgetInstance | null) => {
  const { mutate: orderMutate } = useMutation(OrderApi.CREATE_ORDER, {
    onSuccess: (data) => {
      const payload = {
        orderId: data.orderId,
        orderName: data.orderName,
        successUrl: 'http://localhost:3000/pay/success',
        failUrl: 'http://localhost:3000/pay/fail',
        customerEmail: data.customerEmail,
        customerName: data.customerName,
      };
      instance && instance.requestPayment(payload);
    },
  });
  return { orderMutate };
};

export default useOrderMutation;
