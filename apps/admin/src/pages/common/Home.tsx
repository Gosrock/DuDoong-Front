import List from '@components/home/List';
import { Button, ButtonSet, FlexBox, ListHeader, Spacing } from '@dudoong/ui';
import { authState } from '@store/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export type PageType = 'host' | 'event';

const Home = () => {
  const auth = useRecoilValue(authState);
  const [select, setSelect] = useState<PageType>('host');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSelect(location.state.select);
    }
  }, []);

  const handleClickHost = () => {
    setSelect('host');
  };
  const handleClickEvent = () => {
    setSelect('event');
  };

  const setVarient = (key: PageType) => {
    return key === select ? 'secondary' : 'tertiary';
  };

  const handleClickPost = () => {
    if (select === 'host') navigate(`/new/${select}s`);
    else navigate(`/new/${select}s/1`);
  };
  return (
    <>
      <Spacing size={42} />
      <ListHeader
        size="listHeader_24"
        padding={[32, 0, 20, 0]}
        title={`${auth.userProfile?.name}님의 홈`}
      />
      <Spacing size={20} />
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
        <Button onClick={handleClickPost}>
          {select === 'event' ? '공연 만들기' : '호스트 등록하기'}
        </Button>
      </FlexBox>
      <Spacing size={20} />
      <List page={select} />
    </>
  );
};
export default Home;
