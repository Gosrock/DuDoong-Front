import { ListHeader } from '@dudoong/ui';
import ContentGrid from '@components/shared/layout/ContentGrid';
import { useEffect } from 'react';
import useBottomButton from '@lib/hooks/useBottomButton';
import EventDetailInfo from '@components/events/detail/EventDetailInfo';
import EventImage from '@components/events/detail/EventImage';

const Detail = () => {
  const { setButtonInfo } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  return (
    <>
      <ListHeader
        title={'호스트 정보'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      <ContentGrid>
        <EventDetailInfo />
        <EventImage />
      </ContentGrid>
    </>
  );
};
export default Detail;
