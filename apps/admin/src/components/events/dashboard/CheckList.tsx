import { ListHeader, Spacing, BorderBox } from '@dudoong/ui';

import ListContents from './ListContents';

const CheckList = ({ check }: { check: boolean[] | null }) => {
  if (!check) check = [false, false, false];
  return (
    <BorderBox padding={[36, 32]} shadow>
      <ListHeader
        title={'체크리스트'}
        size={'listHeader_20'}
        description={
          '공연을 등록하기 이전에 필수로 수행 되어야 할 체크리스트 입니다.'
        }
        padding={0}
      />
      <Spacing size={22} />
      <ListContents check={check} />
    </BorderBox>
  );
};

export default CheckList;
