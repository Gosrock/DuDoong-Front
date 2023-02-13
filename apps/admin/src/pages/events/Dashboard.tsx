import CheckList from '@components/events/dashboard/CheckList';
import { ListHeader, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import EventInfo from '@components/events/dashboard/EventInfo';
import useBottomButton from '@lib/hooks/useBottomButton';
import { useQuery } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  EventChecklistResponse,
  EventDetailResponse,
  EventResponse,
} from '@lib/apis/event/eventType';
import { useEffect, useState } from 'react';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { queryClient } from '../../main';
import { useMutation } from '@tanstack/react-query';
import { AdminBottomButtonTypeKey } from '@components/shared/layout/AdminBottomButton';

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
      payload: { status: 'CLOSED' },
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
        padding={[50, 0, 48, 0]}
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

const Warning = () => {
  return (
    <>
      <Text typo={'P_Text_14_R'} color={'gray_500'}>
        예매 마감, 환불 마감 시간은 공연 시작시간 이전입니다.
        <br />
        공연이 등록된 이후에는 공연 기본정보 탭 내부의 정보를 수정 불가 합니다.
        <br />
        결제 기능은 제휴된 호스트가 넣을 수 있는 기능입니다. 제휴 이전엔 승인
        <br />
        무료티켓 기능과 , 옵션을 통해서 계좌정보와 입금받아야할 티켓의 가격을
        <br />
        기재하실 수 있습니다. 제휴 된 호스트의 유료티켓일 경우 , 카드사 수수료와
        <br />
        부가세를 제외한 금액을 정산 받으실 수 있습니다. 정산관련은 공연이 종료된
        <br />후 일주일 이내로 연락드립니다.
        <br />
        <br />
        티켓 관련
        <br />
        공연이 등록된 이후에 이미 판매가 된 티켓은 티켓 수정, 삭제가 불가합니다
        <br />
        <span
          css={css`
            color: ${theme.palette.red_300};
          `}
        >
          *이미 판매가 된 티켓 이란 사용자들에게 판매가되어 재고의 감소가 일어난
          티켓을 의미합니다.
        </span>
        <br />
        공연이 등록된 이후에도 티켓 추가가 가능합니다.
        <br />
        <br />
        옵션 관련
        <br />
        공연이 등록된 이후에 이미 판매가 된 티켓은 옵션 수정이 불가합니다.
        <br />
        공연이 등록된 이후에도 판매가 진행되지않았다면 옵션수정이 가능합니다.
      </Text>
    </>
  );
};
