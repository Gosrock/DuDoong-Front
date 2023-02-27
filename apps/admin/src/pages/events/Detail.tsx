import { ListHeader } from '@dudoong/ui';
import { useEffect, useState } from 'react';
import useBottomButton from '@lib/hooks/useBottomButton';
import EventDetailInfo from '@components/events/detail/EventDetailInfo';
import { useLocation } from 'react-router-dom';
import usePresignedUrl from '@lib/hooks/usePresignedUrl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import type {
  EventResponse,
  ImageUrlResponse,
  UpdateEventDetailRequest,
  EventDetailResponse,
} from '@lib/apis/event/eventType';
import EventImage from '@components/events/detail/EventImage';
import getKeyFromUrl from '@lib/utils/getKeyFromUrl';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';

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
  const { openOverlay } = useGlobalOverlay();

  const { setButtonInfo } = useBottomButton({
    type: 'save',
    isActive: true,
  });
  const queryClient = useQueryClient();
  // 이벤트 디테일 api
  const eventDetail = queryClient.getQueryData([
    'eventDetail',
    eventId,
  ]) as EventDetailResponse;

  useEffect(() => {
    if (eventDetail) {
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
    onSuccess: (data: EventResponse) => {},
  });

  // 하단부 버튼
  const buttonClickHandler = () => {
    // 이미지 post
    if (imageInfo.image) {
      uploadImageToS3();
    }
    // 호스트 정보 post
    patchEventDetailMutation.mutate(
      {
        eventId: eventId,
        payload: { ...form, posterImageKey: imageInfo.key },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['eventDetail', eventId]);
          openOverlay({
            content: 'saved',
          });
        },
      },
    );
  };

  useEffect(() => {
    setButtonInfo({
      firstHandler: buttonClickHandler,
      firstDisable: checkButtonDisable(form, imageInfo),
    });
  }, [form, imageInfo.key]);

  return (
    <>
      <ListHeader
        title={'공연 이미지･상세'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      <EventImage imageKey={form.posterImageKey} setImageInfo={setImageInfo} />
      <EventDetailInfo
        setForm={setForm}
        content={form.content}
        eventId={eventId}
      />
    </>
  );
};
export default Detail;

// ------------------------------------

const checkButtonDisable = (
  props: UpdateEventDetailRequest,
  imageInfo: Pick<ImageUrlResponse, 'presignedUrl' | 'key'>,
) => {
  if (
    props.content === '' || // 초기 설정 값
    props.content === null || // 상세 정보를 입력한 적 없을 경우
    props.content === '<p><br></p>' || // 입력한거 모두 지웠을 때, 기본 html 값
    imageInfo.key === ''
  )
    return true;
  return false;
};
