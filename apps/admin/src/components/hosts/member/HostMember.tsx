import { HostUser } from '@lib/apis/host/hostType';
import HostItem from '@components/shared/component/HostItem';
import styled from '@emotion/styled';

const HostMember = (props: HostUser) => {
  const { userId, userName, role, profileImage, active } = props;
  return (
    <Wrapper>
      <HostItem
        type="sm"
        hostId={userId}
        name={userName}
        introduce={role}
        profileImage={profileImage}
        role={role}
        active={active}
      />
    </Wrapper>
  );
};

export default HostMember;

const Wrapper = styled.div`
  pointer-events: none;
`;
