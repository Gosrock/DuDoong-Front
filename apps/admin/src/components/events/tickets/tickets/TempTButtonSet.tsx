import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

const TempTButtonSet = () => {
  const navigate = useNavigate();
  return (
    <>
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
