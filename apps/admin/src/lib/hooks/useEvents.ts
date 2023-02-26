import EventApi from '@lib/apis/event/EventApi';
import type {
  BasicEventRequest,
  EventResponse,
} from '@lib/apis/event/eventType';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const useEvents = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const changeEventMutation = useMutation(
    (payload: BasicEventRequest) =>
      EventApi.PATCH_EVENT_BASIC(payload, eventId),
    {
      onSuccess: (data: EventResponse) => {
        console.log('success');
        console.log(data);
      },
    },
  );
  return { changeEventMutation };
};

export default useEvents;
