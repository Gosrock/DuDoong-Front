import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';

const TempDButtonSet = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button>어드민 이벤트 detail</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
    </>
  );
};
export default TempDButtonSet;
