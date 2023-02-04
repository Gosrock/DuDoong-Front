import FirstStep from '@components/new/events/firstStep/FirstStep';
import SecondStep from '@components/new/events/secondStep/SecondStep';
import { Spacing, ListHeader } from '@dudoong/ui';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Events = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  let hostId = 0;
  if (location.state) {
    hostId = location.state.hostId;
  }
  console.log(hostId);

  // 잘못된 url
  useEffect(() => {
    if (step !== '1' && step !== '2') navigate('/404');
  }, []);

  // hostId 없이 step 2에 접근한 경우
  useEffect(() => {
    if (step === '2' && !hostId) navigate('/');
  }, [step]);

  return (
    <>
      <Spacing size={42} />
      <ListHeader
        title={
          step === '1'
            ? '공연 만들기 1단계: 호스트 선택'
            : '공연 만들기 2단계: 공연 간편생성'
        }
        size={'listHeader_24'}
        padding={[32, 0, 20, 0]}
      />
      <Spacing size={20} />
      {step === '1' ? <FirstStep /> : <SecondStep hostId={hostId} />}
      <Spacing size={72} />
    </>
  );
};
export default Events;
