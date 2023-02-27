import { DOMAIN } from '@dudoong/utils';
import { OrderApi } from '@lib/apis/order/OrderApi';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useMutation } from '@tanstack/react-query';
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useRouter } from 'next/router';

const useOrderMutation = (
  instance?: PaymentWidgetInstance | null,
  closeDudoongOverlay?: () => void,
) => {
  const router = useRouter();
  const { openGlobalOverlay } = useGlobalOverlay();
  const { mutate: orderMutate } = useMutation(OrderApi.CREATE_ORDER, {
    onSuccess: (data) => {
      console.log(data);
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
        console.log(data, '무료선착순 주문');
        freeOrderMutate(data.orderId);
      } else {
        //무료 승인
        router.replace(`/pay/success?order=${data.orderId}`, '/pay/success');
      }
    },
    onError: (error: any) => {
      const comment = error.response.data.reason;
      setTimeout(
        () => openGlobalOverlay({ content: 'error', props: { text: comment } }),
        200,
      );
    },
  });

  const { mutate: freeOrderMutate } = useMutation(OrderApi.POST_ORDER_FREE, {
    onSuccess: (data) => {
      console.log(data, '무료선착순 주문 응답');
      router.replace(`/pay/success?order=${data.orderUuid}`, '/pay/success');
    },
  });

  const { mutate: dudoongMutate } = useMutation(OrderApi.CREATE_ORDER, {
    onSuccess: (data) => {
      router.replace(`/pay/success?order=${data.orderId}`, '/pay/success');
    },
    onError: (error: any) => {
      closeDudoongOverlay?.();
      const comment = error.response.data.reason;
      setTimeout(
        () => openGlobalOverlay({ content: 'error', props: { text: comment } }),
        200,
      );
    },
  });

  return { orderMutate, dudoongMutate };
};

export default useOrderMutation;
