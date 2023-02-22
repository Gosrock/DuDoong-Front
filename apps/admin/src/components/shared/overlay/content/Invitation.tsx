import { Divider, ListHeader, Spacing, Text } from '@dudoong/ui';
import styled from '@emotion/styled';

interface PostEventProps {
  closeOverlay: () => void;
}

const Invitation = ({ closeOverlay }: PostEventProps) => {
  return (
    <Wrapper>
      <ListHeader size="listHeader_20" title={'초대'} padding={0} />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        초대초대초대초대초대초대초대초대초대초대초대초대
        <br />
        초대초대초대초대초대초대초대초대초대초대초대초대
      </Text>
      <Spacing size={36} />
      <Spacing size={56} />
    </Wrapper>
  );
};

export default Invitation;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
`;
