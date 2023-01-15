import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

interface TicketsProps {
  setThirdMenuRoute: (thirdMenuRoute: string | null) => void;
}

const Tickets = ({ setThirdMenuRoute }: TicketsProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Button>어드민 이벤트 tickets</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
      <Button
        onClick={() => {
          setThirdMenuRoute('새 티켓 만들기');
        }}
      >
        새 티켓 만들기
      </Button>
      <Button
        onClick={() => {
          setThirdMenuRoute(null);
        }}
      >
        새 티켓 안만들기
      </Button>
    </>
  );
};
export default Tickets;
