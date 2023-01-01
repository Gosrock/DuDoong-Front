import { useRecoilState } from 'recoil';
import { Button } from '@dudoong/ui';
import useSample from '@lib/hooks/useSample';
import { authState } from '@store/auth';

const Sample = () => {
  const a = useSample();
  const [value, setValue] = useRecoilState(authState);
  return (
    <>
      <Button>react + vite + typescript 어드민 보일러플레이트</Button>
    </>
  );
};
export default Sample;
