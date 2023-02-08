import { FullScreen, SyncLoader } from '@dudoong/ui';
import { css } from '@emotion/react';
import { OrderApi } from '@lib/apis/order/OrderApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Confirm = () => {
  const router = useRouter();
  const queries = router.query;
  const { amount, orderId, paymentKey } = queries;
  const confirmMutation = useMutation(
    OrderApi.CONFIRM_ORDER(orderId as string),
    {
      onSuccess: (data) => {
        router.replace(`/pay/success?order=${data.orderUuid}`, '/pay/success');
      },
    },
  );

  useEffect(() => {
    confirmMutation.mutate({
      amount: parseInt(amount as string),
      paymentKey: paymentKey as string,
    });
  }, []);

  return (
    <>
      <FullScreen
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <SyncLoader />
      </FullScreen>
    </>
  );
};

export default Confirm;
