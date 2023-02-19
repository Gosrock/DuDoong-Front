import CheckList from '@components/events/dashboard/CheckList';
import { ListHeader } from '@dudoong/ui';
import EventInfo from '@components/events/dashboard/EventInfo';
import useBottomButton from '@lib/hooks/useBottomButton';
import { useQuery } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import { useLocation, useNavigate } from 'react-router-dom';
import type {
  EventChecklistResponse,
  EventDetailResponse,
  EventResponse,
} from '@lib/apis/event/eventType';
import { useEffect, useState } from 'react';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { queryClient } from '../../main';
import { useMutation } from '@tanstack/react-query';
import { AdminBottomButtonTypeKey } from '@components/shared/layout/AdminBottomButton';
import Warning from '@components/events/dashboard/Warning';

const Dashboard = () => {
  const eventId = useLocation().pathname.split('/')[2];
  const [buttonType, setButtonType] =
    useState<AdminBottomButtonTypeKey>('deletePostEvent');
  const navigate = useNavigate();
  const { setButtonInfo, changeButtonType } = useBottomButton({
    type: 'deletePostEvent',
    isActive: true,
  });
  const { openOverlay, closeOverlay } = useGlobalOverlay();

  // 이벤트 디테일 api
  const eventDetail = queryClient.getQueryData([
    'eventDetail',
  ]) as EventDetailResponse;

  // 이벤트 등록 api
  const patchEventOpenMutation = useMutation(EventApi.PATCH_EVENT_OPEN, {
    onSuccess: (data: EventResponse) => {
      console.log('PATCH_EVENT_OPEN : ', data);
      queryClient.invalidateQueries({ queryKey: ['eventDetail'] });
      closeOverlay();
    },
  });

  // 이벤트 삭제 api
  const patchEventDeleteMutation = useMutation(EventApi.PATCH_EVENT_STATUS, {
    onSuccess: (data: EventResponse) => {
      console.log('PATCH_EVENT_Delete : ', data);
      queryClient.invalidateQueries({ queryKey: ['eventDetail'] });
      closeOverlay();
      navigate('/');
    },
  });

  // 이벤트 체크리스트 api
  const { data } = useQuery(
    ['eventCheckList'],
    () => EventApi.GET_EVENT_CHECKLIST(eventId),
    {
      onSuccess: (data: EventChecklistResponse) => {
        console.log('GET_EVENT_CHECKLIST : ', data);
      },
    },
  );

  const eventOpenHandler = () => {
    patchEventOpenMutation.mutate(eventId);
  };

  const eventDeleteHandler = () => {
    patchEventDeleteMutation.mutate({
      eventId: eventId,
      payload: { status: '지난공연' }, //TODO 공연삭제시??? 일단 임시로 박아놓음
    });
  };

  const eventPayHandler = () => {
    closeOverlay();
  };

  // 버튼 setting
  useEffect(() => {
    if (buttonType === 'deletePostEvent') {
      setButtonInfo({
        firstHandler: () =>
          openOverlay({
            content: 'deleteEvent',
            props: {
              eventDeleteHandler: eventDeleteHandler,
            },
          }),
        firstDisable:
          eventDetail && eventDetail.status === '지난공연' ? true : false,
        secondHandler: () =>
          openOverlay({
            content: 'postEvent',
            props: {
              eventOpenHandler: eventOpenHandler,
            },
          }),
        secondDisable: !checkIsChecked(data),
      });
      changeButtonType('deletePostEvent');
    } else if (buttonType === 'deleteEvent') {
      setButtonInfo({
        firstHandler: () =>
          openOverlay({
            content: 'deleteEvent',
            props: {
              eventDeleteHandler: eventDeleteHandler,
            },
          }),
        firstDisable:
          eventDetail && eventDetail.status === '지난공연' ? true : false,
      });
      changeButtonType('deleteEvent');
    } else if (buttonType === 'pay') {
      setButtonInfo({
        firstHandler: () =>
          openOverlay({
            content: 'pay',
            props: {
              eventDeleteHandler: eventPayHandler,
            },
          }),
        firstDisable: false,
      });
      changeButtonType('pay');
    }
  }, [data, buttonType]);

  return (
    <>
      <ListHeader
        title={eventDetail ? eventDetail.name : '호스트'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      {eventDetail && eventDetail.status !== '준비중' ? (
        <EventInfo eventId={eventId} setButtonType={setButtonType} />
      ) : (
        <CheckList
          check={
            data ? [data.hasBasic, data.hasDetail, data.hasTicketItem] : null
          }
        />
      )}
      <ListHeader
        title={'유의사항'}
        size={'listHeader_20'}
        description={<Warning />}
        padding={[36, 32, 0, 32]}
      />
    </>
  );
};
export default Dashboard;

const checkIsChecked = (data: EventChecklistResponse | undefined) => {
  if (!data) return false;
  if (data.hasTicketItem && data.hasDetail && data.hasBasic) return true;
  return false;
};
