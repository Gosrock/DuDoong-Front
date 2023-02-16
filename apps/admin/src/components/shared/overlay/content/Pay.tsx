import { Divider, ListHeader, Spacing, Text } from '@dudoong/ui';
import styled from '@emotion/styled';

interface PostEventProps {
  closeOverlay: () => void;
}

const Pay = ({ closeOverlay }: PostEventProps) => {
  return (
    <Wrapper>
      <ListHeader size="listHeader_20" title={'정산'} padding={0} />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        정산정산정산정산정산정산정산정산
        <br />
        정산정산정산정산정산정산정산정산
      </Text>
      <Spacing size={36} />
      <Spacing size={56} />
    </Wrapper>
  );
};

export default Pay;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
`;
