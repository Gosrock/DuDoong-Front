import { FlexBox, Spacing } from '@dudoong/ui';
import { Text } from '@dudoong/ui';
import { useLocation } from 'react-router-dom';

type EventUrlSetTypeKey =
  | 'dashboard'
  | 'info'
  | 'detail'
  | 'tickets'
  | 'ticketsnew'
  | 'options'
  | 'optionsnew'
  | 'guests'
  | 'qr';

type HostUrlSetTypeKey = 'info' | 'member' | 'slack' | 'events' | 'alliance';

type EventUrlSetType = {
  [key in EventUrlSetTypeKey]: string;
};

type HostUrlSetType = {
  [key in HostUrlSetTypeKey]: string;
};

const EVENT_URL_SET: EventUrlSetType = {
  dashboard: '대시보드',
  info: '공연 기본 정보',
  detail: '공연 이미지･상세',
  tickets: '티켓 관리',
  ticketsnew: '새 티켓 만들기',
  options: '티켓 옵션 관리',
  optionsnew: '새 옵션 만들기',
  guests: '예매자 관리',
  qr: 'QR 체크인',
};

const HOST_URL_SET: HostUrlSetType = {
  info: '호스트 정보 관리',
  member: '멤버 관리',
  events: '등록한 공연',
  slack: '슬랙 알림',
  alliance: '제휴 관련',
};

const Breadcrumb = ({ name }: { name: string }) => {
  const location = useLocation();
  const urlDetails = location.pathname.substr(1).split('/');
  let detailUrl,
    newUrl = null;
  if (urlDetails[0] == 'events') {
    detailUrl = EVENT_URL_SET[urlDetails[2] as EventUrlSetTypeKey];
    if (urlDetails.length > 3) {
      newUrl = EVENT_URL_SET[`${urlDetails[2]}new` as EventUrlSetTypeKey];
    }
    if (urlDetails[2] == 'qr' && urlDetails.length > 3) {
      newUrl = 'QR 확인';
    }
  } else {
    detailUrl = HOST_URL_SET[urlDetails[2] as HostUrlSetTypeKey];
    if (urlDetails.length > 3) {
      newUrl = HOST_URL_SET[`${urlDetails[2]}new` as HostUrlSetTypeKey];
    }
  }

  return (
    <>
      <Spacing size={55} />
      <FlexBox align={'center'} justify={'flex-start'}>
        <Text typo="P_Text_14_M" color="main_500">
          {newUrl
            ? `${name} / ${detailUrl} / ${newUrl}`
            : `${name} / ${detailUrl}`}
        </Text>
      </FlexBox>
    </>
  );
};

export default Breadcrumb;
