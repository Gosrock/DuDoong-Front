import { useNavigate } from 'react-router-dom';
import { FlexBox } from '@dudoong/ui';
import { Button } from '@dudoong/ui';

const TempNotFoundEl = () => {
  const navigate = useNavigate();
  return (
    <FlexBox align={'center'} justify={'center'}>
      <Button onClick={() => navigate('/')} isLoading={false}>
        잘못된 접근입니다.
      </Button>
    </FlexBox>
  );
};

export default TempNotFoundEl;
