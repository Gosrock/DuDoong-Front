import EventApi from '@lib/apis/event/EventApi';
import type {
  BasicEventRequest,
  EventResponse,
  CreateEventResponse,
} from '@lib/apis/event/eventType';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

const useEvents = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const postEventMutation = useMutation(EventApi.POST_EVENT, {
    onSuccess: (data: CreateEventResponse) => {
      const curId = data.eventId;
      console.log('postEventMutation : ', data);
      navigate(`/events/${curId}/info`);
    },
    onError: () => {
      console.log('error');
    },
  });

  const changeEventMutation = useMutation(
    (payload: BasicEventRequest) =>
      EventApi.PATCH_EVENT_BASIC(payload, eventId),
    {
      onSuccess: (data: EventResponse) => {
        console.log('success');
        console.log(data);
      },
      onError: () => {
        console.log('error');
      },
    },
  );
  return { postEventMutation, changeEventMutation };
};

export default useEvents;
