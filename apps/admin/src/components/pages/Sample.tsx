import useSample from 'src/lib/hooks/useSample';
import { authState } from '@store/auth';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@dudoong/ui';

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
