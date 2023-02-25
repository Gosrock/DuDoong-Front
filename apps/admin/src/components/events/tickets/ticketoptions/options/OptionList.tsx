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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import OptionApi from '@lib/apis/option/OptionApi';
import { AllOptionGroupResponse } from '@lib/apis/option/optionType';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { resetServerContext } from 'react-beautiful-dnd';
import { queryClient } from '../../../../../main';

const OptionList = ({
  optionItems,
}: {
  optionItems: AllOptionResponse[] | null;
}) => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const patchOptionApplyMutation = useMutation(OptionApi.PATCH_APPLY_OPTION, {
    onSuccess: (data: AllOptionGroupResponse) => {
      console.log('OPTION_APPLY:', data);
      queryClient.invalidateQueries({ queryKey: ['AppliedTicket', eventId] });
    },
  });

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log('destination : ' + destination);
    const optionGroupId = parseInt(result.draggableId);
    /*  patchOptionApplyMutation.mutate({
      eventId: eventId,
      ticketItemId: 72,
      payload: {
        optionGroupId: optionGroupId,
      },
    }); */
  };
  resetServerContext();

  if (!optionItems?.length) {
    return (
      <div>
        <ListHeader padding={0} size="listHeader_18" title="옵션 목록" />
        <Spacing size={42} />
        <OptionItemContainer>
          <Padding size={[24, 12, 24, 12]}>
            <Text typo="P_Header_16_SB">옵션을 먼저 생성해주세요!</Text>
          </Padding>
        </OptionItemContainer>
      </div>
    );
  } else {
    return (
      <Wrapper>
        <FlexBox direction="column" align="flex-start">
          <div>
            <ListHeader padding={0} size="listHeader_18" title="옵션 목록" />
            <Spacing size={42} />
          </div>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="options">
              {(provided) => (
                <section {...provided.droppableProps} ref={provided.innerRef}>
                  {optionItems?.map((item: AllOptionResponse, index: any) => (
                    <Draggable
                      key={item.optionGroupId}
                      draggableId={item.optionGroupId.toString()}
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
          </DragDropContext>
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
