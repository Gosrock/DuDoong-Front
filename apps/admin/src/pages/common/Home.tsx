import Event from '@components/home/Event';
import Host from '@components/home/Host';
import { Button, ButtonSet, FlexBox, Spacing, Text } from '@dudoong/ui';
import { authState } from '@store/auth';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const Home = () => {
  const auth = useRecoilValue(authState);
  const [select, setSelect] = useState<'host' | 'event'>('host');

  const handleClickHost = () => {
    setSelect('host');
  };
  const handleClickEvent = () => {
    setSelect('event');
  };

  const setVarient = (key: 'host' | 'event') => {
    return key === select ? 'secondary' : 'tertiary';
  };
  return (
    <>
      <Spacing size={76} />
      <Text typo="G_Header_20_B">{auth.userProfile?.name}님의 홈</Text>
      <Spacing size={74} />
      <FlexBox align={'center'} justify={'space-between'}>
        <ButtonSet varient="horizontal" padding={0}>
          <Button
            varient={setVarient('host')}
            width={139}
            onClick={handleClickHost}
          >
            호스트
          </Button>
          <Button varient={setVarient('event')} onClick={handleClickEvent}>
            등록한 공연
          </Button>
        </ButtonSet>
        <Button>이벤트 만들기</Button>
      </FlexBox>
      <Spacing size={20} />
      {select === 'host' ? <Host /> : <Event />}
    </>
  );
};
export default Home;
