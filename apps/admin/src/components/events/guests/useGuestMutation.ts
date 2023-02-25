import OrderApi from '@lib/apis/order/OrderApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const useGuestMutation = () => {
  const eventId = useLocation().pathname.split('/')[2];
  const queryClient = useQueryClient();

  const { mutate } = useMutation(OrderApi.POST_ORDER_APPROVE, {
    onSuccess: () => {
      queryClient.invalidateQueries(['events', eventId, 'approveWaiting']);
    },
  });

  return { mutate };
};

export default useGuestMutation;
