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
import { Draggable, Droppable } from 'react-beautiful-dnd';
import type { OptionGroupResponse } from '@lib/apis/option/optionType';

interface OptionListProps {
  optionItems: OptionGroupResponse[];
}

const OptionList = ({ optionItems }: OptionListProps) => {
  console.log(optionItems);
  if (!optionItems?.length) {
    return (
      <Wrapper>
        <div>
          <ListHeader padding={0} size="listHeader_18" title="옵션 목록" />
          <Spacing size={42} />
          <OptionItemContainer>
            <Padding size={[24, 12, 24, 12]}>
              <Text typo="P_Header_16_SB">옵션을 먼저 생성해주세요!</Text>
            </Padding>
          </OptionItemContainer>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <FlexBox direction="column" align="flex-start">
          <div>
            <ListHeader padding={0} size="listHeader_18" title="옵션 목록" />
            <Spacing size={42} />
          </div>

          <Droppable droppableId="options">
            {(provided) => (
              <section {...provided.droppableProps} ref={provided.innerRef}>
                {optionItems?.map((item, index) => (
                  <Draggable
                    key={`eventOption-${item.optionGroupId}`}
                    draggableId={`eventOption-${item.optionGroupId}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <OptionItemContainer key={item.optionGroupId}>
                          <OptionItem
                            name={item.name}
                            subText={`필수응답 · ${item.type}`}
                            OptionGroupId={item.optionGroupId}
                          />
                        </OptionItemContainer>
                        <Spacing size={16} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </FlexBox>
      </Wrapper>
    );
  }
};

export default OptionList;

const Wrapper = styled.div`
  & > div {
    position: sticky;
    position: -webkit-sticky;
    margin-top: 44px;
    top: 36px;
  }
`;

const OptionItemContainer = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};
`;
