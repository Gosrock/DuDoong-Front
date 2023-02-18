import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

const TempTButtonSet = ({ eventId }: { eventId: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => {
          navigate(`/events/${eventId}/tickets/new`);
        }}
      >
        새 티켓 만들기
      </Button>
    </>
  );
};
export default TempTButtonSet;
