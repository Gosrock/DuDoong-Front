import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import OptionApi from '@lib/apis/option/OptionApi';
import { FlexBox, ListRow, TagButton, Padding } from '@dudoong/ui';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { soldOptionState } from '@store/soldOption';

export interface OptionItemProps {
  name: string;
  subText: string;
  OptionGroupId: number;
}

const OptionItem = ({ name, subText, OptionGroupId }: OptionItemProps) => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const soldOptions = useRecoilValue(soldOptionState);
  const queryClient = useQueryClient();
  const { mutate: optionDeleteMutate } = useMutation(
    OptionApi.PATCH_OPTION_DELETE,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['optionGroups', eventId] });
      },
    },
  );

  const handleRemoveClick = () => {
    optionDeleteMutate({
      eventId: eventId,
      optionGroupId: OptionGroupId,
    });
  };

  return (
    <>
      {soldOptions && (
        <FlexBox align="center" justify="space-between">
          <ListRow
            text={name}
            textColor={['black', 'gray_400']}
            subText={subText}
            padding={[13.5, 23]}
          />
          <Padding size={[0, 24, 0, 0]}>
            <TagButton
              text="삭제"
              color="warn"
              disabled={soldOptions.includes(OptionGroupId) ? true : false}
              size="lg"
              onClick={handleRemoveClick}
            />
          </Padding>
        </FlexBox>
      )}
    </>
  );
};

export default OptionItem;
