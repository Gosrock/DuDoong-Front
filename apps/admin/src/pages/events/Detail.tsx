import { ListHeader } from '@dudoong/ui';
import ContentGrid from '@components/shared/layout/ContentGrid';
import { useEffect, useState } from 'react';
import useBottomButton from '@lib/hooks/useBottomButton';
import EventDetailInfo from '@components/events/detail/EventDetailInfo';
import { useLocation } from 'react-router-dom';
import usePresignedUrl from '@lib/hooks/usePresignedUrl';
import { useMutation } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import {
  EventResponse,
  ImageUrlResponse,
  UpdateEventDetailRequest,
  EventDetailResponse,
} from '@lib/apis/event/eventType';
import { queryClient } from '../../main';
import EventImage from '@components/events/detail/EventImage';

const Detail = () => {
  const eventId = useLocation().pathname.split('/')[2];
  const { imageInfo, setImageInfo, uploadImageToS3 } = usePresignedUrl(
    'event',
    eventId,
  );
  const [form, setForm] = useState<UpdateEventDetailRequest>({
    posterImageKey: '',
    content: '',
  });

  const { setButtonInfo } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  // 이벤트 디테일 api
  const eventDetail = queryClient.getQueryData([
    'eventDetail',
  ]) as EventDetailResponse;

  useEffect(() => {
    if (eventDetail) {
      console.log('EVENT_DETAIL :', eventDetail);
      setForm({
        posterImageKey: getKeyFromUrl(eventDetail.posterImage),
        content: eventDetail.content,
      });
      setImageInfo((prev) => {
        return {
          ...prev,
          key: getKeyFromUrl(eventDetail.posterImage),
        };
      });
    }
  }, [eventDetail]);

  // detail 정보 수정 api
  const patchEventDetailMutation = useMutation(EventApi.PATCH_EVENT_DETAIL, {
    onSuccess: (data: EventResponse) => {
      console.log('patchEventDetailMutation : ', data);
    },
  });

  // 하단부 버튼
  const buttonClickHandler = () => {
    // 이미지 post
    if (imageInfo.image) {
      console.log('upload image');
      uploadImageToS3();
    }
    // 호스트 정보 post
    patchEventDetailMutation.mutate({
      eventId: eventId,
      payload: { ...form, posterImageKey: imageInfo.key },
    });
  };

  useEffect(() => {
    setButtonInfo({
      firstHandler: buttonClickHandler,
      firstDisable: checkButtonDisable(form, imageInfo),
    });
  }, [form, imageInfo]);

  return (
    <>
      <ListHeader
        title={'호스트 정보'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      <ContentGrid>
        <EventDetailInfo setForm={setForm} content={form.content} />
        <EventImage
          imageKey={form.posterImageKey}
          setImageInfo={setImageInfo}
        />
      </ContentGrid>
    </>
  );
};
export default Detail;

// ------------------------------------

const checkButtonDisable = (
  props: UpdateEventDetailRequest,
  imageInfo: Pick<ImageUrlResponse, 'presignedUrl' | 'key'>,
) => {
  if (props.content === '' || imageInfo.key === '') return true;
  return false;
};

const getKeyFromUrl = (url: string) => {
  if (!url) return '';
  const fragments = url.split('/');
  return `${fragments[3]}/${fragments[4]}/${fragments[5]}/${fragments[6]}`;
};
