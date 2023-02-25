import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { theme, Text, Padding, Spacing, FlexBox } from '@dudoong/ui';
import { OptionGroupResponse } from '@lib/apis/option/optionType';
import { ReactNode } from 'react';
import { css } from '@emotion/react';

interface OptionDropArea {
  ticketItemId: number;
  optionGroups: OptionGroupResponse[];
  isEditable?: boolean;
}

const OptionDropArea = ({
  ticketItemId,
  optionGroups,
  isEditable = true,
}: OptionDropArea) => {
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
                <BlankOption
                  dropPlaceholder={provided.placeholder}
                  isEditable={isEditable}
                />
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
                          <AppliedOption item={item} isEditable={isEditable} />
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

const AppliedOption = ({
  item,
  isEditable,
}: {
  item: OptionGroupResponse;
  isEditable: boolean;
}) => {
  const additionalPrice =
    item.options.find((option) => option.answer === '예')?.additionalPrice ||
    '0원';
  return (
    <OptionWrapper key={item.optionGroupId}>
      <Padding size={[16, 21]}>
        <FlexBox direction="column" align="flex-start">
          <Text typo="P_Text_16_SB" color="main_500">
            {item.name}
          </Text>
          <Text typo="Text_14" color="main_400">
            {item.type} {additionalPrice !== '0원' && `· ${additionalPrice}`}
          </Text>
        </FlexBox>
      </Padding>
    </OptionWrapper>
  );
};

const BlankOption = ({
  dropPlaceholder,
  isEditable,
}: {
  dropPlaceholder: ReactNode;
  isEditable: boolean;
}) => {
  return (
    <RoundWrapper isEditable={isEditable}>
      <Padding size={[40, 38]}>
        <Text typo="P_Header_16_M" color="gray_300">
          {isEditable
            ? '추가할 옵션을 드래그 앤 드롭 해주세요.'
            : '이미 판매된 티켓의 옵션은 수정할 수 없어요.'}
        </Text>
      </Padding>
      {dropPlaceholder}
    </RoundWrapper>
  );
};

export default OptionDropArea;

const RoundWrapper = styled.div<{ isEditable: boolean }>`
  border-radius: 10px;
  background-color: ${theme.palette.gray_100};
  border: 1px solid ${({ theme }) => theme.palette.gray_200};
  ${({ theme, isEditable }) =>
    !isEditable &&
    css`
      background-color: ${theme.palette.gray_200};
    `}
  height: 100px;
  margin-top: 10px;
`;

const OptionWrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.palette.main_100};
  height: auto;
  margin-top: 12px;
`;
