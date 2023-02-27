import List from '@components/home/List';
import {
  Button,
  ButtonSet,
  FlexBox,
  ListHeader,
  Spacing,
  Tag,
  TagButton,
} from '@dudoong/ui';
import styled from '@emotion/styled';
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
      <ServiceNotion>
        <ListHeader
          size="listHeader_18"
          padding={[0, 0, 20, 0]}
          title={`두둥 서비스 소개서`}
          description={
            '\n두둥 서비스는 누구나 손쉽게 준비한 공연을 홍보하고 예매를 받을 수 있는 플랫폼 이에요!\n두둥 서비스를 호스트(관리자)로 이용할 여러분들께 도움이 되고자 만들었어요!'
          }
          rightElement={
            <Tag
              className="tag"
              color="mono"
              size="lg"
              text="두둥 노션 바로가기"
              onClick={() =>
                (window.location.href =
                  'https://dudoong.notion.site/dudoong/c4999331a2aa47299e1c6821a7dee9af')
              }
            />
          }
        />
      </ServiceNotion>
    </>
  );
};
export default Home;

const ServiceNotion = styled.div`
  .tag {
    cursor: pointer;
    margin-right: 330px;
  }
`;
