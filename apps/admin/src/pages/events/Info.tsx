import LeftSide from '@components/events/info/LeftSide';
import TempIButtonSet from '@components/events/info/TempIButtonSet';
import { FlexBox, ListHeader, Spacing } from '@dudoong/ui';
import Map from '@components/events/info/Map';

//기본 state를 get해와서 넣어주고 patch로 변경만해주면 될듯

const Info = () => {
  return (
    <>
      <ListHeader
        padding={[32, 0, 12, 0]}
        title={'공연 기본정보'}
        size={'listHeader_24'}
        description={'공연 기본정보는 공연 등록 이후에는 수정할 수 없어요'}
      />
      <Spacing size={24} />
      <LeftSide />
    </>
  );
};
export default Info;
