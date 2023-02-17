import {
  FlexBox,
  ListHeader,
  SelectButton,
  Spacing,
  Tag,
  Text,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import { ReactComponent as Recommendation } from '@assets/recommendation.svg';

import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const TicketSelect = () => {
  return (
    <Wrapper>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title={
          <FlexBox align="center" gap={16}>
            <div>티켓 종류</div>
            <Tag text="유료티켓은 어떻게 이용하나요?" color="red" size="md" />
          </FlexBox>
        }
        description={
          <Text typo="P_Text_16_M" color="gray_400">
            새로 생성할 티켓의 종류를 선택해주세요.
          </Text>
        }
      />
      <Spacing size={24} />
      <FlexBox align="center" justify="flex-start" gap={12}>
        <SelectButton text="두둥티켓" fullWidth={true} isSelected={false} />
        <SelectButton text="무료티켓" fullWidth={true} isSelected={false} />
        <SelectButton text="유료티켓" fullWidth={true} isSelected={false} />
      </FlexBox>
      <Recommendation className="recommendation" />
    </Wrapper>
  );
};
export default TicketSelect;

const Wrapper = styled.div`
  width: 396px;

  .recommendation {
    z-index: 1;
    position: relative;

    left: 96px;
    top: -64px;
  }
`;
