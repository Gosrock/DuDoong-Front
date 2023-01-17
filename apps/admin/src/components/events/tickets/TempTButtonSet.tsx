import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { menuRouting } from '@store/menuRouting';

const TempTButtonSet = () => {
  const navigate = useNavigate();
  const [menuRoute, setMenuRoute] = useRecoilState(menuRouting);
  return (
    <>
      <Button>어드민 이벤트 tickets</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
      <Button
        onClick={() => {
          setMenuRoute({ ...menuRoute, thirdText: '새 티켓 만들기' });
        }}
      >
        새 티켓 만들기
      </Button>
      <Button
        onClick={() => {
          setMenuRoute({ ...menuRoute, thirdText: null });
        }}
      >
        새 티켓 안만들기
      </Button>
    </>
  );
};
export default TempTButtonSet;
