import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import {
  FlexBox,
  ListHeader,
  Text,
  Input,
  DatePicker,
  TimePicker,
  Spacing,
  Button,
} from '@dudoong/ui';
import { useInputs } from '@dudoong/utils';
import styled from '@emotion/styled';
import TimeButton from './TimeButton';
import { CreateEventRequest } from '@lib/apis/event/eventType';
import { useRef } from 'react';
import { useState } from 'react';
import useEvents from '@lib/hooks/useEvents';
import timeFormatter from '@lib/utils/timeFormatter';

interface SecondStepProps {
  hostId: number;
}

const SecondStep = ({ hostId }: SecondStepProps) => {
  const runTimeRef = useRef<HTMLInputElement>(null);
  const [runTime, setRunTime] = useState<number | null>(null);
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [startAtTime, setStartAtTime] = useState<Date | null>(null);
  const [form, onChange] = useInputs<CreateEventRequest>({
    hostId: hostId,
    name: '',
    startAt: '',
    runTime: 0,
  });
  const { postEventMutation } = useEvents();

  const makeEventHandler = () => {
    if (startAt && startAtTime && runTime) {
      const payload = {
        ...form,
        runTime: runTime,
        startAt: timeFormatter(startAt, startAtTime),
      } as CreateEventRequest;

      postEventMutation.mutate(payload);
    }
  };

  const changeRunTimeHandler = (change: number) => {
    if (runTimeRef.current) {
      if (change === 0) {
        // 초기화
        runTimeRef.current.value = '0';
        setRunTime(0);
      }
      if (runTimeRef.current.value) {
        // 시간 입력이 되어있을 때
        const curValue = Number(runTimeRef.current.value);
        runTimeRef.current.value =
          curValue + change < 0 ? '0' : `${curValue + change}`;
        setRunTime(Number(runTimeRef.current.value));
      } else {
        // 시간 입력이 안되어있을 때
        runTimeRef.current.value = change < 0 ? '0' : `${change}`;
        setRunTime(Number(runTimeRef.current.value));
      }
    }
  };

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
          maxLength={25}
          placeholder={'최대 25글자까지 쓸 수 있어요.'}
          name="name"
          onChange={onChange}
        />
        <FlexBox align={'flex-start'} gap={32}>
          <FlexBox align={'start'} direction={'column'} gap={12}>
            <ListHeader
              title={'공연 날짜와 시간을 입력해주세요'}
              size={'listHeader_18'}
              padding={[32, 0, 12, 0]}
            />
            <PickerWrapper align={'center'} gap={10} width={330}>
              <DatePicker placeholder="Select Date" onChange={setStartAt} />
              <TimePicker placeholder="Select Time" onChange={setStartAtTime} />
            </PickerWrapper>
          </FlexBox>
          <FlexBox align={'start'} direction={'column'} gap={12}>
            <ListHeader
              title={'공연 시간을 입력해주세요'}
              size={'listHeader_18'}
              padding={[32, 0, 12, 0]}
            />
            <PickerWrapper align={'center'} gap={10} width={385}>
              <Input
                type="number"
                placeholder={'단위 : 분'}
                name="runTime"
                onChange={(e) => {
                  setRunTime(Number(e.target.value));
                }}
                width={154}
                ref={runTimeRef}
              />
              <TimeButton
                type={'modify'}
                text={'-10분'}
                onClick={() => {
                  changeRunTimeHandler(-10);
                }}
              />
              <TimeButton
                type={'modify'}
                text={'+30분'}
                onClick={(event) => {
                  event.preventDefault();
                  changeRunTimeHandler(30);
                }}
              />
              <TimeButton
                type={'reset'}
                text={'초기화'}
                onClick={() => {
                  changeRunTimeHandler(0);
                }}
              />
            </PickerWrapper>
          </FlexBox>
        </FlexBox>
      </BorderBox>
      <Spacing size={100} />
      <Button
        varient="primary"
        fullWidth={true}
        onClick={makeEventHandler}
        disabled={checkDisable(startAt, startAtTime, runTime, form.name)}
      >
        다음
      </Button>
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
  runTime: number | null,
  name: string,
) => {
  if (!date || !time || !runTime || name === '') return true;
  return false;
};

// ----------------------------------------------------------------

interface PickerWrapperProps {
  width: number;
}

const PickerWrapper = styled(FlexBox)<PickerWrapperProps>`
  width: ${({ width }) => `${width}px`};
  height: 48px;
`;
