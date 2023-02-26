import {
  FlexBox,
  ListHeader,
  Text,
  Input,
  DatePicker,
  TimePicker,
  Spacing,
  Button,
  BorderBox,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import type { CreateEventRequest } from '@lib/apis/event/eventType';
import { useEffect, useState } from 'react';
import timeFormatter from '@lib/utils/timeFormatter';
import { useForm, FormState } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { CreateEventResponse } from '@lib/apis/event/eventType';
import EventApi from '@lib/apis/event/EventApi';
import { useNavigate } from 'react-router-dom';
interface SecondStepProps {
  hostId: number;
  setButtonInfo: (props: any) => void;
}

interface InputType {
  name: string;
  runTime: number;
}

const SecondStep = ({ hostId, setButtonInfo }: SecondStepProps) => {
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [startAtTime, setStartAtTime] = useState<Date | null>(null);
  const { register, handleSubmit, formState } = useForm<InputType>({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const postEventMutation = useMutation(EventApi.POST_EVENT, {
    onSuccess: (data: CreateEventResponse) => {
      console.log('postEventMutation : ', data);
    },
  });

  const makeEventHandler = (data: InputType) => {
    if (startAt && startAtTime) {
      const payload = {
        ...data,
        hostId: hostId,
        startAt: timeFormatter(startAt, startAtTime),
      } as CreateEventRequest;

      postEventMutation.mutate(payload, {
        onSuccess: (data: CreateEventResponse) => {
          navigate(`/events/${data.eventId}/info`, { replace: true });
        },
      });
    }
  };

  useEffect(() => {
    setButtonInfo({
      firstHandler: handleSubmit(makeEventHandler),
      firstDisable: checkDisable(startAt, startAtTime, formState),
    });
  }, [formState.isValid, startAt, startAtTime]);

  return (
    <>
      <BorderBox padding={[36, 60, 52, 60]}>
        <ListHeader
          title={'공연을 새로 만들어볼까요?'}
          size={'listHeader_24'}
          description={<SubTitle />}
          padding={[20, 0, 16, 0]}
          gap={20}
        />
        <ListHeader
          title={'공연 이름을 입력해주세요'}
          size={'listHeader_18'}
          padding={[32, 0, 12, 0]}
        />
        <Input
          {...register('name', {
            required: true,
            pattern: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,25}$/,
          })}
          placeholder={'최대 25글자까지 쓸 수 있어요.'}
          maxLength={25}
        />
        <FlexBox align={'start'} direction={'column'} gap={12}>
          <ListHeader
            title={'공연 날짜와 시간을 입력해주세요'}
            size={'listHeader_18'}
            padding={[32, 0, 12, 0]}
          />
          <PickerWrapper align={'center'} gap={17}>
            <DatePicker
              placeholder="Select Date"
              onChange={setStartAt}
              width={240}
            />
            <TimePicker
              placeholder="Select Time"
              onChange={setStartAtTime}
              width={240}
            />
            <Input
              placeholder={'러닝타임'}
              rightIcon={
                <Text typo="P_Text_16_M" color="gray_500">
                  분
                </Text>
              }
              type="number"
              {...register('runTime', {
                required: true,
                pattern: /^[0-9]+$/,
                min: 1,
              })}
              width={240}
            />
          </PickerWrapper>
        </FlexBox>
      </BorderBox>
    </>
  );
};

export default SecondStep;

// ----------------------------------------------------------------

const SubTitle = () => {
  return (
    <FlexBox align={'start'} direction={'column'}>
      <Text typo="P_Text_16_M" color="gray_400">
        공연이 확정되지 전까지 바꿀 수 있으니 걱정하지 마세요.
      </Text>
      <Text typo="P_Text_16_M" color="gray_400">
        추후 자세한 정보들을 더 작성할 수 있어요!
      </Text>
    </FlexBox>
  );
};

const checkDisable = (
  date: Date | null,
  time: Date | null,
  formState: FormState<InputType>,
) => {
  // 미입력
  if (!date || !time || !formState.isValid) return true;
  const inputDate = dateTimeConverter(date, time);
  // // 날짜가 현재 이전인 경우
  if (inputDate < new Date()) return true;
  return false;
};

const dateTimeConverter = (date: Date, time: Date) => {
  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return new Date(date.getTime() + time.getTime() - todayDate.getTime());
};

// ----------------------------------------------------------------

const PickerWrapper = styled(FlexBox)`
  height: 48px;
`;
