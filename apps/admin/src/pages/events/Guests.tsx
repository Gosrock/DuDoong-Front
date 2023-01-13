import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

const Guests = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button>어드민 이벤트 guests</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
    </>
  );
};
export default Guests;
