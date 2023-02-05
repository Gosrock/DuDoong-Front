import { Button, ButtonSet, ListHeader } from '@dudoong/ui';
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <ListHeader size="listHeader_28" title="예매가 완료되었어요" />
      <ButtonSet>
        <Button onClick={() => router.replace('/')}>홈으로</Button>
      </ButtonSet>
    </>
  );
};

export default Success;
