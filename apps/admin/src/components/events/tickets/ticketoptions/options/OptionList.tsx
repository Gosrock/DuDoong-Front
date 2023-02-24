import { AllOptionResponse } from '@lib/apis/option/optionType';
import {
  ListHeader,
  theme,
  Spacing,
  FlexBox,
  Text,
  Padding,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import OptionItem from './OptionItem';

const OptionList = ({
  optionItems,
}: {
  optionItems: AllOptionResponse[] | null;
}) => {
  console.log(optionItems);
  if (!optionItems?.length) {
    return (
      <div>
        <ListHeader padding={0} size="listHeader_18" title="옵션 목록" />
        <Spacing size={42} />
        <Wrapper>
          <Padding size={[24, 12, 24, 12]}>
            <Text typo="P_Header_16_SB">옵션을 먼저 생성해주세요!</Text>
          </Padding>
        </Wrapper>
      </div>
    );
  } else {
    return (
      <>
        <FlexBox direction="column" align="flex-start">
          <div>
            <ListHeader padding={0} size="listHeader_18" title="옵션 목록" />
            <Spacing size={42} />
          </div>

          {optionItems?.map((item: AllOptionResponse) => (
            <>
              <Wrapper key={item.optionGroupId}>
                <OptionItem
                  name={item.name}
                  subText={`필수응답 · ${item.type}`}
                  OptionGroupId={item.optionGroupId}
                />
              </Wrapper>
              <Spacing size={16} />
            </>
          ))}
        </FlexBox>
      </>
    );
  }
};

export default OptionList;

const Wrapper = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};
`;
