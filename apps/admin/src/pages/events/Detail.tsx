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
} from '@lib/apis/event/eventType';

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

  // detail 정보 수정 api
  const patchEventDetailMutation = useMutation(EventApi.PATCH_EVENT_DETAIL, {
    onSuccess: (data: EventResponse) => {
      console.log('patchEventDetailMutation : ', data);
    },
  });

  // event detail info get request api
  // const { data, status } = useQuery(
  //   ['hostDetail'],
  //   () => HostApi.GET_HOST_DETAIL(hostId),
  //   {
  //     onSuccess: (data: HostDetailResponse) => {
  //       if (data.profileImageUrl) {
  //         setImageInfo((prev) => {
  //           return {
  //             ...prev,
  //             presignedUrl: '',
  //             key: getKeyFromUrl(data.profileImageUrl),
  //           };
  //         });
  //       }
  //       setForm({
  //         posterImageKey: data.posterImageUrl
  //           ? getKeyFromUrl(data.posterImageUrl)
  //           : '',
  //         content: data.content,
  //       });
  //       console.log('GET_HOST_DETAIL : ', data);
  //     },
  //   },
  // );

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
      payload: { ...form },
    });
    console.log('click button', form, imageInfo);
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
        {/* <EventImage
          imageurl={status === 'success' ? data!.profileImageUrl : null}
          setImageInfo={setImageInfo}
        /> */}
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
  if (props.posterImageKey === '' || imageInfo.key === '') return true;
  return false;
};

const getKeyFromUrl = (url: string) => {
  const fragments = url.split('/');
  return `${fragments[3]}/${fragments[4]}/${fragments[5]}/${fragments[6]}`;
};
