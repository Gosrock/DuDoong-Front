import { FlexBox, Padding } from '@dudoong/ui';
import styled from '@emotion/styled';
import { Text } from '@dudoong/ui';
import { useLocation } from 'react-router-dom';

type BaseUrlSetTypeKey = 'events' | 'hosts';

type EventUrlSetTypeKey =
  | 'events'
  | 'dashboard'
  | 'info'
  | 'detail'
  | 'tickets'
  | 'new'
  | 'options'
  | 'guests'
  | 'qr';

type HostUrlSetTypeKey = 'hosts' | 'dashboard' | 'info' | 'member' | 'slack';

type EventUrlSetType = {
  [key in EventUrlSetTypeKey]: string;
};

type HostUrlSetType = {
  [key in HostUrlSetTypeKey]: string;
};

const EVENT_URL_SET: EventUrlSetType = {
  events: '공연',
  dashboard: '대시보드',
  info: '공연 기본 정보',
  detail: '공연 이미지･상세',
  tickets: '티켓 관리',
  new: '새 티켓 만들기',
  options: '티켓 옵션 관리',
  guests: '예매자 관리',
  qr: 'QR 체크인',
};

const HOST_URL_SET: HostUrlSetType = {
  hosts: '호스트',
  dashboard: '대시보드',
  info: '호스트 정보',
  member: '호스트 멤버',
  slack: '슬랙 알림 등록',
};

const Breadcrumb = () => {
  const location = useLocation();
  const urlDetails = location.pathname.substr(1).split('/');
  const baseUrl = urlDetails[0] as BaseUrlSetTypeKey;

  return (
    <Padding size={[40, 40, 0, 40]}>
      <FlexBox align={'center'} justify={'flex-start'}>
        {urlDetails.map((detail, index) => {
          const textColor =
            urlDetails.length === index + 1 ? 'gray_500' : 'gray_400';
          return (
            index != 1 && (
              <FlexBox align={'center'} justify={'flex-start'} key={index}>
                <Text typo="Text_14" color={textColor}>
                  {baseUrl === 'events'
                    ? EVENT_URL_SET[detail as EventUrlSetTypeKey]
                    : HOST_URL_SET[detail as HostUrlSetTypeKey]}
                </Text>
                {urlDetails.length !== index + 1 && (
                  <SlashWrapper size={[0, 8]}>
                    <Text typo="Text_14" color="gray_400">
                      /
                    </Text>
                  </SlashWrapper>
                )}
              </FlexBox>
            )
          );
        })}
      </FlexBox>
    </Padding>
  );
};

export default Breadcrumb;

const SlashWrapper = styled(Padding)``;
