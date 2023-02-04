import EventApi from '@lib/apis/event/EventApi';
import { CreateEventResponse } from '@lib/apis/event/eventType';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useEvents = () => {
  const navigate = useNavigate();

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

  return { postEventMutation };
};

export default useEvents;
