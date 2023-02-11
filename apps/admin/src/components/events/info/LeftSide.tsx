import TimeButton from '@components/new/events/secondStep/TimeButton';
import {
  DatePicker,
  FlexBox,
  Input,
  ListHeader,
  Spacing,
  TimePicker,
} from '@dudoong/ui';
import { useInputs } from '@dudoong/utils';
import EventApi from '@lib/apis/event/EventApi';
import { BasicEventRequest } from '@lib/apis/event/eventType';
import { useQuery } from '@tanstack/react-query';
import { run } from 'node:test';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

//공연이름, 공연날짜, 관람시간
//Map컴포넌트를 여기다가 쓰는게 더 날듯
//날짜, 시간 picker 이미있는것 쓰기->컴포넌트로 분리하는거 어떰
//useInputs의 onChange함수 쓸 수 있을듯

const LeftSide = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const { data, isFetched } = useQuery(
    ['eventDetail'],
    () => EventApi.GET_EVENT_DETAIL(eventId),
    {
      onSuccess: () => {
        return EventApi.GET_EVENT_DETAIL(eventId);
      },
    },
  );

  const [startDate, setStartAt] = useState<Date | undefined>();
  const [startTime, setStartAtTime] = useState<Date | undefined>();
  const runTimeRef = useRef<HTMLInputElement>(null);
  const [runTime, setRunTime] = useState<number | undefined>(data?.runTime);
  //const [form, onChange] = useInputs<BasicEventRequest>(data?data:);

  useEffect(() => {
    setRunTime(data?.runTime);
    if (data?.startAt != null) {
      const DateTime = data?.startAt.split(' ');
      const curDate = new Date(`${DateTime[0]}`);
      const curTime = new Date(data?.startAt);
      setStartAtTime(curTime);
      setStartAt(curDate);
    }
  }, [data?.runTime]);

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
        console.log(runTimeRef.current.value);
      } else {
        // 시간 입력이 안되어있을 때
        runTimeRef.current.value = change < 0 ? '0' : `${change}`;
        setRunTime(Number(runTimeRef.current.value));
      }
    }
  };
  console.log(startDate);
  console.log(startTime);

  return (
    <>
      <FlexBox align={'flex-start'} direction={'column'}>
        <ListHeader title={'공연 이름'} size={'listHeader_18'} />
        <Input disabled={true} value={data?.name || ''}></Input>
        <Spacing size={40} />
        <ListHeader title={'공연 날짜'} size={'listHeader_18'} />
        <FlexBox align={'center'} gap={10}>
          <DatePicker
            placeholder={'Select Date'}
            onChange={setStartAt}
            initialValue={startDate || null}
          />
          <TimePicker
            placeholder={'Select Time'}
            onChange={setStartAtTime}
            initialValue={startTime || null}
          />
        </FlexBox>
        <ListHeader title={'관람 시간'} size={'listHeader_18'} />
        <FlexBox align={'center'} gap={10}>
          <Input
            type="number"
            placeholder={data?.runTime ? `${data?.runTime}` : '시:분'}
            name="runTime"
            onChange={(e) => {
              setRunTime(Number(e.target.value));
            }}
            width={154}
            ref={runTimeRef}
            value={String(runTime) || ''}
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
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default LeftSide;
