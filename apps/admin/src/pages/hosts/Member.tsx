import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { Spacing, ListHeader, FlexBox, Text, Divider } from '@dudoong/ui';
import { css } from '@emotion/react';
import { queryClient } from '../../main';
import { HostDetailResponse, HostUser } from '@lib/apis/host/hostType';
import { useLocation } from 'react-router-dom';
import HostMembers from '@components/hosts/member/HostMembers';

const Member = () => {
  return (
    <>
      <Spacing size={42} />
      <ListHeader
        size="listHeader_24"
        padding={[32, 0, 20, 0]}
        title={'멤버 관리'}
        description={<SubTitle />}
      />
      <Spacing size={20} />
      <BorderBox padding={[36, 55]}>
        <HostMembers />
      </BorderBox>
      <Spacing size={38} />
    </>
  );
};
export default Member;

const SubTitle = () => {
  return (
    <FlexBox align={'start'} direction={'column'}>
      <Text typo="P_Text_16_M" color="gray_400">
        권한은 마스터, 매니저, 게스트로 나뉘어요.
      </Text>
      <Text typo="P_Text_16_M" color="gray_400">
        게스트는 공연의 조회 기능, 매니저는 게스트의 관할과 공연에서의 수정과
        생성, 마스터는 멤버관리를 비롯한 모든 권한을 갖고 있습니다.
      </Text>
    </FlexBox>
  );
};
