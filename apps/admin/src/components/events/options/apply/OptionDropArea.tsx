import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { theme, Text, Padding, Spacing, FlexBox } from '@dudoong/ui';
import { OptionGroupResponse } from '@lib/apis/option/optionType';
import { ReactNode } from 'react';

interface OptionDropArea {
  ticketItemId: number;
  optionGroups: OptionGroupResponse[];
}

const OptionDropArea = ({ ticketItemId, optionGroups }: OptionDropArea) => {
  return (
    <>
      <Droppable
        droppableId={ticketItemId.toString()}
        key={ticketItemId.toString()}
      >
        {(provided) => (
          <section {...provided.droppableProps} ref={provided.innerRef}>
            {optionGroups.length === 0 ? (
              <>
                <BlankOption dropPlaceholder={provided.placeholder} />
              </>
            ) : (
              <>
                {optionGroups.map(
                  (item: OptionGroupResponse, index: number) => (
                    <Draggable
                      draggableId={`ticketOption-${ticketItemId}-${item.optionGroupId}`}
                      key={`ticketOption-${ticketItemId}-${item.optionGroupId}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <AppliedOption item={item} />
                        </div>
                      )}
                    </Draggable>
                  ),
                )}
                {provided.placeholder}
              </>
            )}
          </section>
        )}
      </Droppable>
    </>
  );
};

const AppliedOption = ({ item }: { item: OptionGroupResponse }) => {
  return (
    <OptionWrapper key={item.optionGroupId}>
      <Padding size={[16, 21]}>
        <FlexBox direction="column" align="flex-start">
          <Text typo="P_Text_16_SB" color="main_500">
            {item.name}
          </Text>
          <Text typo="Text_14" color="main_400">
            필수응답 · {item.type}
          </Text>
        </FlexBox>
      </Padding>
    </OptionWrapper>
  );
};

const BlankOption = ({ dropPlaceholder }: { dropPlaceholder: ReactNode }) => {
  return (
    <RoundWrapper>
      <Padding size={[40, 38]}>
        <Text typo="P_Header_16_SB" color="gray_300">
          추가할 옵션을 드래그 앤 드롭 해주세요.
        </Text>
      </Padding>
      {dropPlaceholder}
    </RoundWrapper>
  );
};

export default OptionDropArea;

const RoundWrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.palette.gray_100};
  height: 100px;
  margin-top: 10px;
`;

const OptionWrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.palette.main_100};
  height: auto;
  margin-top: 12px;
`;
