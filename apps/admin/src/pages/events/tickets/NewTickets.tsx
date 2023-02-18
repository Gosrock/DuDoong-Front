import TicketForm from '@components/events/tickets/newtickets/form/TicketForm';
import TicketInput from '@components/events/tickets/newtickets/input/TicketInput';
import TicketSelect from '@components/events/tickets/newtickets/TicketSelect';
import { FlexBox, ListHeader, Spacing, Text } from '@dudoong/ui';
import { EventDetailResponse } from '@dudoong/utils/src/apis/event/eventType';

import useBottomButton from '@lib/hooks/useBottomButton';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { queryClient } from '../../../main';

const NewTickets = () => {
  const eventDetail = queryClient.getQueryData<EventDetailResponse>([
    'eventDetail',
  ]);
  const ref = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const { setButtonInfo } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  useEffect(() => {
    console.log(
      'payType',
      watch('payType'),
      'name',
      watch('name'),
      'price',
      watch('price'),
      'account',
      watch('account'),
      'issuance',
      watch('issuance'),
      'approve',
      watch('approve'),
      'stock',
      watch('stock'),
      'limit',
      watch('limit'),
    );
  }, [
    watch('payType'),
    watch('name'),
    watch('account'),
    watch('price'),
    watch('issuance'),
    watch('approve'),
    watch('stock'),
    watch('limit'),
  ]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onError = (error: any) => {};

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
      <FlexBox align="flex-start" justify="flex-start" gap={82}>
        <div>
          <TicketSelect
            partner={eventDetail?.host.partner || null}
            control={control}
          />
          <Spacing size={80} />
          <TicketInput
            title="티켓 이름"
            description="티켓의 성격을 잘 드러내는 이름을 써주세요. (ex. 무료 티켓)"
            placeholder="최대 12글자까지 쓸 수 있어요"
            width={396}
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
      </FlexBox>
    </div>
  );
};
export default NewTickets;
