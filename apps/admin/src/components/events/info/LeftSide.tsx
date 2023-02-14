import TimeButton from '@components/new/events/secondStep/TimeButton';
import {
  DatePicker,
  FlexBox,
  Input,
  ListHeader,
  Padding,
  Spacing,
  TimePicker,
} from '@dudoong/ui';
import { EventDetailResponse, useInputs } from '@dudoong/utils';
import styled from '@emotion/styled';
import EventApi from '@lib/apis/event/EventApi';
import { BasicEventRequest } from '@lib/apis/event/eventType';
import timeFormatter from '@lib/utils/timeFormatter';
import { useQuery } from '@tanstack/react-query';
import { run } from 'node:test';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapPage from './Map';

//공연이름, 공연날짜, 관람시간
//Map컴포넌트를 여기다가 쓰는게 더 날듯
//날짜, 시간 picker 이미있는것 쓰기->컴포넌트로 분리하는거 어떰
//useInputs의 onChange함수 쓸 수 있을듯

const LeftSide = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const { data } = useQuery(
    ['eventDetail'],
    () => EventApi.GET_EVENT_DETAIL(eventId),
    {
      onSuccess: () => {
        return EventApi.GET_EVENT_DETAIL(eventId);
      },
    },
  );

  console.log(data);

  const [startDate, setStartAt] = useState<Date | null>();
  const [startTime, setStartAtTime] = useState<Date | null>();
  const runTimeRef = useRef<HTMLInputElement>(null);
  const [runTime, setRunTime] = useState<number | undefined>(data?.runTime);

  //const [form, onChange] = useInputs<BasicEventRequest>(data?data:);

  //1.form제출 해야됨...how?->props를 map에다가 전달해주면 될듯!!
  //2.dropDown modal?

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
  //time지정

  return (
    <>
      <FlexBox align={'center'} direction={'row'}>
        <FlexBox align={'flex-start'} direction={'column'}>
          <ListHeader
            padding={[32, 0, 12, 0]}
            title={'공연 이름'}
            size={'listHeader_18'}
          />

          <Input width={398} disabled={true} value={data?.name || ''}></Input>
          <Spacing size={40} />
          <ListHeader
            padding={[32, 0, 12, 0]}
            title={'공연 날짜'}
            size={'listHeader_18'}
          />
          <FlexBox align={'center'} gap={10}>
            <Box>
              <DatePicker
                placeholder={'Select Date'}
                onChange={setStartAt}
                initialValue={startDate || null}
              />
            </Box>
            <Box>
              <TimePicker
                placeholder={'Select Time'}
                onChange={setStartAtTime}
                initialValue={startTime || null}
              />
            </Box>
          </FlexBox>
          <ListHeader
            padding={[32, 0, 12, 0]}
            title={'관람 시간'}
            size={'listHeader_18'}
          />
          <FlexBox align={'center'} gap={10}>
            <Input
              type="number"
              placeholder={data?.runTime ? `${data?.runTime}` : '시:분'}
              name="runTime"
              onChange={(e) => {
                setRunTime(Number(e.target.value));
              }}
              width={160}
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
        <MapPage
          name={data?.name}
          startDate={startDate}
          startTime={startTime}
          runtime={runTime}
        />
      </FlexBox>
    </>
  );
};

const Box = styled.div`
  width: 192px;
`;

export default LeftSide;
