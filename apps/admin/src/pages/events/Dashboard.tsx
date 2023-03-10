import CheckList from '@components/events/dashboard/CheckList';
import { ListHeader } from '@dudoong/ui';
import EventInfo from '@components/events/dashboard/EventInfo';
import useBottomButton from '@lib/hooks/useBottomButton';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import { useLocation, useNavigate } from 'react-router-dom';
import type {
  EventChecklistResponse,
  EventDetailResponse,
  EventResponse,
} from '@lib/apis/event/eventType';
import { useEffect, useState } from 'react';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';

import { AdminBottomButtonTypeKey } from '@components/shared/layout/AdminBottomButton';
import Warning from '@components/events/dashboard/Warning';

const Dashboard = () => {
  const eventId = useLocation().pathname.split('/')[2];
  const [buttonType, setButtonType] =
    useState<AdminBottomButtonTypeKey>('deletePostEvent');
  const navigate = useNavigate();
  const { setButtonInfo, changeButtonType, hideButtons } = useBottomButton({
    type: 'deletePostEvent',
    isActive: true,
  });
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const queryClient = useQueryClient();

  // 이벤트 디테일 api
  const eventDetail = queryClient.getQueryData<EventDetailResponse>([
    'eventDetail',
    eventId,
  ]);

  // 이벤트 등록 api
  const patchEventOpenMutation = useMutation(EventApi.PATCH_EVENT_OPEN, {
    onSuccess: (data: EventResponse) => {
      queryClient.invalidateQueries({ queryKey: ['eventDetail', eventId] });
      closeOverlay();
    },
  });

  // 이벤트 삭제 api
  const patchEventDeleteMutation = useMutation(EventApi.PATCH_EVENT_DELETE, {
    onSuccess: (data: EventResponse) => {
      queryClient.removeQueries({ queryKey: ['eventDetail', eventId] });
      closeOverlay();
      navigate('/', {
        replace: true,
        state: {
          select: 'event',
        },
      });
    },
  });

  // 이벤트 체크리스트 api
  const { data } = useQuery(
    ['eventCheckList', eventId],
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
    patchEventDeleteMutation.mutate(eventId);
  };

  // 나중에 추가할 수도 있어서 일단 주석처리
  // const eventPayHandler = () => {
  //   window.open(
  //     'https://dudoong.notion.site/dudoong/501840222fe84cc2983ff45162ff0d5b',
  //   );
  // };

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
        firstDisable: false,
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
          eventDetail && eventDetail.status === ('진행중' || '정산중')
            ? true
            : false,
      });
      changeButtonType('deleteEvent');
    } else if (buttonType === 'pay') {
      // 나중에 추가할 수도 있어서 일단 주석처리
      // setButtonInfo({
      //   firstHandler: () =>
      //     openOverlay({
      //       content: 'pay',
      //       props: {
      //         eventDeleteHandler: eventPayHandler,
      //       },
      //     }),
      //   firstDisable: false,
      // });
      // changeButtonType('pay');
      hideButtons();
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
