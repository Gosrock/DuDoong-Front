import TicketForm from '@components/events/tickets/newtickets/form/TicketForm';
import TicketInput from '@components/events/tickets/newtickets/input/TicketInput';
import TicketSelect from '@components/events/tickets/newtickets/TicketSelect';
import ContentGrid from '@components/shared/layout/ContentGrid';
import { FlexBox, ListHeader, Spacing, Text } from '@dudoong/ui';
import { EventDetailResponse } from '@dudoong/utils/src/apis/event/eventType';
import TicketApi from '@lib/apis/ticket/TicketApi';
import { GetTicketDetailResponse } from '@lib/apis/ticket/ticketType';

import useBottomButton from '@lib/hooks/useBottomButton';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const NewTickets = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const queryClient = useQueryClient();
  const eventDetail = queryClient.getQueryData<EventDetailResponse>([
    'eventDetail',
    eventId,
  ]);
  const { register, handleSubmit, watch, control, formState, reset, setValue } =
    useForm({
      mode: 'onChange',
    });
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const { setButtonInfo, hideButtons } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  //티켓 생성 api
  const postTicketCreateMutation = useMutation(TicketApi.POST_TICKET, {
    onSuccess: (data: GetTicketDetailResponse) => {
      console.log('POST_TICKET: ', data);
      openOverlay({
        content: 'saveTicket',
        props: {
          saveTicketHandler: () => {
            navigate(`/events/${eventId}/tickets`);
            closeOverlay();
            hideButtons();
          },
        },
      });
    },
  });

  useEffect(() => {
    formState.isValid
      ? setButtonInfo({
          firstDisable: false,
          firstHandler: handleSubmit(onSubmit, onError),
        })
      : setButtonInfo({
          firstDisable: true,
          firstHandler: () => {},
        });
  }, [formState.isValid]);

  const onSubmit = (data: any) => {
    postTicketCreateMutation.mutate({
      eventId: eventId,
      payload: {
        ...data,
        approveType:
          data.payType === '유료티켓'
            ? '선착순'
            : data.approveType
            ? '승인'
            : '선착순',
        description: '',
        price: data.price || 0,
      },
    });
  };

  const onError = (error: any) => {
    console.log('error', error);
  };

  return (
    <div onSubmit={handleSubmit(onSubmit, onError)}>
      <Spacing size={32} />
      <ListHeader
        padding={0}
        size="listHeader_24"
        title="새 티켓 만들기"
        description={
          <FlexBox direction="column" align="flex-start">
            <Text typo="P_Text_16_M" color="gray_400">
              티켓은 제휴 호스트만 유료티켓 발급이 가능해요. 제휴 없이
              유료티켓을 발급하기 위해서는
            </Text>
            <Text typo="P_Text_16_M" color="gray_400">
              승인티켓에 송금 계좌와 금액을 표기한 옵션을 부착하는 방법을 사용할
              수 있어요.
            </Text>
          </FlexBox>
        }
      />
      <Spacing size={72} />
      <ContentGrid>
        <div>
          <TicketSelect
            partner={eventDetail?.host.partner || null}
            control={control}
            hostId={eventDetail?.host.hostId || null}
            reset={reset}
            setValue={setValue}
          />
          <Spacing size={80} />
          <TicketInput
            title="티켓 이름"
            description="티켓의 성격을 잘 드러내는 이름을 써주세요. (ex. 무료 티켓)"
            placeholder="최대 12글자까지 쓸 수 있어요"
            type="text"
            maxLength={12}
            {...register('name', {
              required: true,
              maxLength: {
                value: 12,
                message: '*12글자를 초과하였습니다.',
              },
            })}
          />
        </div>
        <TicketForm
          select={watch('payType')}
          register={register}
          control={control}
        />
      </ContentGrid>
    </div>
  );
};
export default NewTickets;
