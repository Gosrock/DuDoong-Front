import GridLeftElement from '@components/hosts/info/GridLeftElement';
import GridRightElement from '@components/hosts/info/GridRightElement';
import ContentGrid from '@components/shared/layout/ContentGrid';
import { ListHeader } from '@dudoong/ui';
import useBottomButton from '@lib/hooks/useBottomButton';
import { useEffect } from 'react';
import { useInputs } from '@dudoong/utils';
import type {
  HostDetailResponse,
  ImageUrlResponse,
  UpdateHostRequest,
} from '@lib/apis/host/hostType';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HostApi from '@lib/apis/host/HostApi';
import { useMutation } from '@tanstack/react-query';
import usePresignedUrl from '@lib/hooks/usePresignedUrl';

const Info = () => {
  const hostId = useLocation().pathname.split('/')[2];
  const { imageInfo, setImageInfo, uploadImageToS3 } = usePresignedUrl(
    'host',
    hostId,
  );
  const [form, onChange, , initForm] = useInputs<UpdateHostRequest>({
    profileImageKey: '',
    introduce: '',
    contactNumber: '',
    contactEmail: '',
  });
  const { setButtonInfo } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  // profile 수정 api
  const postEventMutation = useMutation(HostApi.PATCH_HOST_PROFILE, {
    onSuccess: (data: HostDetailResponse) => {
      console.log('postHostProfileMutation : ', data);
    },
  });

  // 호스트 정보
  const { data, status } = useQuery(
    ['hostDetail'],
    () => HostApi.GET_HOST_DETAIL(hostId),
    {
      onSuccess: (data: HostDetailResponse) => {
        if (data.profileImage) {
          setImageInfo((prev) => {
            return {
              ...prev,
              presignedUrl: '',
              key: getKeyFromUrl(data.profileImage),
            };
          });
        }
        initForm({
          profileImageKey: '',
          introduce: data.introduce !== null ? data.introduce : '',
          contactNumber: data.contactNumber !== null ? data.contactNumber : '',
          contactEmail: data.contactEmail !== null ? data.contactEmail : '',
        });
        console.log('GET_HOST_DETAIL : ', data);
      },
    },
  );

  // 하단부 버튼
  const buttonClickHandler = () => {
    // 이미지 post
    if (imageInfo.image) {
      console.log('upload image');
      uploadImageToS3();
    }
    // 호스트 정보 post
    postEventMutation.mutate({
      hostId: hostId,
      payload: { ...form, profileImageKey: imageInfo.key },
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
        <GridLeftElement
          hostName={status === 'success' ? data!.name : ''}
          imageurl={status === 'success' ? data!.profileImage : null}
          setImageInfo={setImageInfo}
        />
        <GridRightElement onChange={onChange} {...form} />
      </ContentGrid>
    </>
  );
};
export default Info;

const checkButtonDisable = (
  props: UpdateHostRequest,
  imageInfo: Pick<ImageUrlResponse, 'presignedUrl' | 'key'>,
) => {
  if (
    props.contactEmail === '' ||
    props.contactNumber === '' ||
    props.introduce === '' ||
    imageInfo.key === ''
  )
    return true;
  return false;
};

const getKeyFromUrl = (url: string) => {
  const fragments = url.split('/');
  return `${fragments[3]}/${fragments[4]}/${fragments[5]}/${fragments[6]}`;
};
