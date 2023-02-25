import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import OptionApi from '@lib/apis/option/OptionApi';
import styled from '@emotion/styled';
import { theme, Text, Padding, Spacing, FlexBox } from '@dudoong/ui';
import {
  AllOptionGroupResponse,
  AllOptionResponse,
  AppliedOptionGroupResponse,
} from '@lib/apis/option/optionType';
import { queryClient } from '../../../../../main';

const OptionDropArea = ({ ticketItemId }: { ticketItemId: number }) => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const { data } = useQuery(['ticketOptionList', eventId, ticketItemId], () =>
    OptionApi.GET_TICKET_OPTION({ eventId, ticketItemId }),
  );

  const patchOpionCancleMutation = useMutation(OptionApi.PATCH_CANCEL_OPTION, {
    onSuccess: (data: AllOptionGroupResponse) => {
      console.log('OPTION_DELETE', data);
      queryClient.invalidateQueries({ queryKey: ['AppliedTicket', eventId] });
    },
  });

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log('destination : ' + destination);
    const optionGroupId = parseInt(result.draggableId);
    /*     patchOpionCancleMutation.mutate({
      eventId: eventId,
      ticketItemId: 72,
      payload: {
        optionGroupId: optionGroupId,
      },
    }); */
  };
  console.log('티켓 옵션' + data);
  if (data === undefined || data.optionGroups.length === 0)
    return (
      <>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId="ticketOptions" key="ticketOptions">
            {(provided) => (
              <section {...provided.droppableProps} ref={provided.innerRef}>
                {provided.placeholder}
                <Spacing size={10} />
                <RoundWrapper>
                  {provided.placeholder}
                  <Padding size={[40, 38]}>
                    <Text typo="P_Header_18_SB" color="gray_400">
                      추가할 옵션을 드래그 앤 드롭 해주세요.
                    </Text>
                  </Padding>
                </RoundWrapper>
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  else {
    return (
      <div>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable
            droppableId={ticketItemId.toString()}
            key={ticketItemId.toString()}
          >
            {(provided) => (
              <section {...provided.droppableProps} ref={provided.innerRef}>
                {data.optionGroups.map(
                  (item: AllOptionResponse, index: any) => (
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
                          <Spacing size={10} />
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
                        </div>
                      )}
                    </Draggable>
                  ),
                )}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
};

export default OptionDropArea;

const RoundWrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.palette.gray_200};
  height: 100px;
`;

const OptionWrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.palette.main_200};
  height: auto;
`;
