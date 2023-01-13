import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

const Slack = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button>어드민 호스트 slack</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
    </>
  );
};
export default Slack;
