import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

const NewOption = ({ eventId }: { eventId: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => {
          navigate(`/events/${eventId}/options/new`);
        }}
      >
        새 옵션 만들기
      </Button>
    </>
  );
};
export default NewOption;
