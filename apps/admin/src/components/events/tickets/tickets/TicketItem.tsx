import { Divider, FlexBox, ListRow, Tag, TagButton } from '@dudoong/ui';
import TicketApi from '@lib/apis/ticket/TicketApi';
import { GetTicketDetailResponse } from '@lib/apis/ticket/ticketType';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { queryClient } from '../../../../main';

export interface TicketItemProps {
  text: string;
  subText: string;
  stock: number;
  quantity: number;
  isSold: boolean;
  ticketItemId: number;
}

const TicketItem = ({
  text,
  subText,
  stock,
  quantity,
  isSold,
  ticketItemId,
}: TicketItemProps) => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  //티켓 삭제 api
  const patchTicketDeleteMutation = useMutation(TicketApi.PATCH_TICKET_DELETE, {
    onSuccess: (data: GetTicketDetailResponse) => {
      console.log('DELETE_TICKET: ', data);
      queryClient.invalidateQueries({ queryKey: ['ticketDetail'] });
    },
  });

  const handleRemoveClick = () => {
    patchTicketDeleteMutation.mutate({
      ticketItemId: ticketItemId,
      eventId: eventId,
    });
  };

  return (
    <>
      <FlexBox align="center" justify="space-between">
        <ListRow
          text={text}
          textColor={['main_500', 'gray_400']}
          subText={subText}
        />
        <FlexBox align="center" justify="space-between" gap={20}>
          <Tag text={`재고 ${stock}/${quantity}`} color="main" size="lg" />
          <TagButton
            text="삭제"
            color="warn"
            size="lg"
            disabled={isSold}
            onClick={handleRemoveClick}
          />
        </FlexBox>
      </FlexBox>
      <Divider className="host-divider" height={28} line padding={16} />
    </>
  );
};
export default TicketItem;
