import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { Spacing, ListHeader, FlexBox, Text } from '@dudoong/ui';
import HostMembers from '@components/hosts/member/HostMembers';
import NewMember from '@components/hosts/member/NewMember';

const Member = () => {
  return (
    <>
      <ListHeader
        size="listHeader_24"
        padding={[32, 0, 20, 0]}
        title={'멤버 관리'}
        description={<SubTitle />}
      />
      <BorderBox padding={[36, 55]}>
        <HostMembers />
        <NewMember />
      </BorderBox>
      <Spacing size={16} />
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
