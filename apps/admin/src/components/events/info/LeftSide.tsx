import TimeButton from '@components/new/events/secondStep/TimeButton';
import ContentGrid from '@components/shared/layout/ContentGrid';
import {
  DatePicker,
  FlexBox,
  Input,
  ListHeader,
  Spacing,
  TimePicker,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import EventApi from '@lib/apis/event/EventApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapPage from './Map';

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
  const [startDate, setStartAt] = useState<Date | null>();
  const [startTime, setStartAtTime] = useState<Date | null>();
  const runTimeRef = useRef<HTMLInputElement>(null);
  const [runTime, setRunTime] = useState<number | undefined>(data?.runTime);
  const [place, setPlace] = useState<any | undefined>();

  useEffect(() => {
    setRunTime(data?.runTime);
    setPlace(data?.place);
    if (data?.startAt != null) {
      const DateTime = data?.startAt.split(' ');
      if (DateTime[0].length <= 10) {
        DateTime[0] = DateTime[0].replace(/\./g, '-');
        data.startAt = data?.startAt.replace(/\./g, '-');
      }
      console.log(data.startAt);
      const curDate = new Date(`${DateTime[0]}`);
      const curTime = new Date(data?.startAt);
      setStartAtTime(curTime);
      console.log(curTime);
      console.log(data?.startAt);
      setStartAt(curDate);
    }
  }, [data?.runTime, data?.place]);

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
  //time지정

  return (
    <>
      <ContentGrid>
        <div>
          <ListHeader
            padding={[32, 0, 12, 0]}
            title={'공연 이름'}
            size={'listHeader_18'}
          />
          <Input disabled={true} value={data?.name || ''}></Input>
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
          <DateGrid>
            <Input
              type="number"
              placeholder={data?.runTime ? `${data?.runTime}` : '시:분'}
              name="runTime"
              onChange={(e) => {
                setRunTime(Number(e.target.value));
              }}
              ref={runTimeRef}
              value={String(runTime) || ''}
            />
            <TimeButton
              type={'reset'}
              text={'초기화'}
              onClick={() => {
                changeRunTimeHandler(0);
              }}
            />
          </DateGrid>
        </div>
        <MapPage
          name={data?.name}
          startDate={startDate}
          startTime={startTime}
          runtime={runTime}
          place={place}
        />
      </ContentGrid>
    </>
  );
};

const Box = styled.div`
  width: 192px;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: auto 100px;
  grid-column-gap: 10px;
`;

export default LeftSide;
