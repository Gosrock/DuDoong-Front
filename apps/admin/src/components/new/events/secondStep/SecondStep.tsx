import BorderBox from '@components/shared/layout/BorderBox';
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
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import TimeButton from './TimeButton';
import { CreateEventRequest } from '@lib/apis/event/eventType';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SecondStepProps {
  hostId: number;
}

const SecondStep = ({ hostId }: SecondStepProps) => {
  const [form, onChange] = useInputs<CreateEventRequest>({
    hostId: hostId,
    name: '',
    startAt: '',
    runTime: 0,
  });

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
          type="tel"
          placeholder={'최대 N글자까지 쓸 수 있어요.'}
          name="contactNumber"
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
              <DatePicker />
              <TimePicker />
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
                type="tel"
                placeholder={'단위 : 분'}
                name="runTime"
                onChange={onChange}
                width={154}
              />
              <TimeButton type={'modify'} text={'-10분'} onClick={() => {}} />
              <TimeButton type={'modify'} text={'+30분'} onClick={() => {}} />
              <TimeButton type={'reset'} text={'초기화'} onClick={() => {}} />
            </PickerWrapper>
          </FlexBox>
        </FlexBox>
      </BorderBox>
      <Spacing size={100} />
      <Button varient="primary" fullWidth={true} onClick={() => {}}>
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

// ----------------------------------------------------------------

interface PickerWrapperProps {
  width: number;
}

const PickerWrapper = styled(FlexBox)<PickerWrapperProps>`
  width: ${({ width }) => `${width}px`};
  height: 48px;
`;
