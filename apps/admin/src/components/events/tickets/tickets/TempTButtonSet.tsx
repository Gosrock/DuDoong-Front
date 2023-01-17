import { Button } from '@dudoong/ui';
import { useLocation, useNavigate } from 'react-router-dom';

const TempTButtonSet = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button>어드민 이벤트 tickets</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
      <Button
        onClick={() => {
          navigate('/events/1/tickets/new');
        }}
      >
        새 티켓 만들기
      </Button>
    </>
  );
};
export default TempTButtonSet;
