import OrderApi from '@lib/apis/order/OrderApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const useGuestMutation = () => {
  const eventId = useLocation().pathname.split('/')[2];
  const queryClient = useQueryClient();

  const { mutate: approveMutate } = useMutation(OrderApi.POST_ORDER_APPROVE, {
    onSuccess: () => {
      queryClient.invalidateQueries(['events', eventId, 'approveWaiting']);
    },
  });
  const { mutate: cancelMutate } = useMutation(OrderApi.POST_ORDER_CANCEL, {
    onSuccess: () => {
      queryClient.invalidateQueries(['events', eventId, 'confirmed']);
    },
  });
  const { mutate: refuseMutate } = useMutation(OrderApi.POST_ORDER_REFUSE, {
    onSuccess: () => {
      queryClient.invalidateQueries(['events', eventId, 'approveWaiting']);
    },
  });

  return { approveMutate, cancelMutate, refuseMutate };
};

export default useGuestMutation;
