import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

const Member = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button>어드민 호스트 member</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
    </>
  );
};
export default Member;
