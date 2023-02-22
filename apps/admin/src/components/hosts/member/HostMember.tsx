import { HostUser } from '@lib/apis/host/hostType';
import HostItem from '@components/shared/component/HostItem';
import styled from '@emotion/styled';

const HostMember = (props: HostUser) => {
  return (
    <Wrapper>
      <HostItem
        type="sm"
        hostId={props.userId}
        name={props.userName}
        introduce={props.role}
        profileImage={props.profileImage}
        role={props.role}
        active={props.active}
      />
    </Wrapper>
  );
};

export default HostMember;

const Wrapper = styled.div`
  pointer-events: none;
`;
