import ContentGrid from '@components/shared/layout/ContentGrid';
import OptionApi from '@lib/apis/option/OptionApi';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import OptionList from './OptionList';
import TicketListOption from './TicketListOption';
import useToastify from '@dudoong/ui/src/lib/useToastify';

const ApplyOption = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const queryClient = useQueryClient();
  const { setToast } = useToastify();
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const { data, isSuccess } = useQuery(['optionGroups', eventId], () =>
    OptionApi.GET_ALL_OPTION(eventId),
  );

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    const dragElementId = draggableId;
    const isApply = dragElementId.split('-')[0] === 'eventOption';
    if (isApply && destination == null) {
      return;
    } else {
      if (source.droppableId === destination?.droppableId) {
        return;
      }

      if (isApply && destination) {
        const ticketItemId = destination.droppableId;
        //옵선 적용
        applyOptionMutate({
          eventId,
          ticketItemId,
          payload: { optionGroupId: parseInt(dragElementId.split('-')[1]) },
        });
      } else {
        //옵션 적용 취소
        const [, ticketItemId, optionGroupId] = dragElementId.split('-');
        openOverlay({
          content: 'cancelOption',
          props: {
            closeOverlay,
            cancelOptionHandler: () =>
              cancelOptionMutate({
                eventId,
                ticketItemId,
                payload: { optionGroupId: parseInt(optionGroupId) },
              }),
          },
        });
      }
    }
  };

  useEffect(() => {
    resetServerContext();
  }, []);

  // 옵션 적용 왼->오
  const { mutate: applyOptionMutate } = useMutation(
    OptionApi.PATCH_APPLY_OPTION,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['AppliedTicket', eventId] });
      },
      onError: (error: any) => {
        const comment = error.response.data.reason;
        setToast({ comment: comment, type: 'error' });
        closeOverlay();
      },
    },
  );
  //옵션 취소 왼<-오
  const { mutate: cancelOptionMutate } = useMutation(
    OptionApi.PATCH_CANCEL_OPTION,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['AppliedTicket', eventId] });
        closeOverlay();
      },
    },
  );

  return (
    <>
      {isSuccess && (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <ContentGrid>
            <OptionList optionItems={data.optionGroups} />
            <TicketListOption />
          </ContentGrid>
        </DragDropContext>
      )}
    </>
  );
};

export default ApplyOption;
