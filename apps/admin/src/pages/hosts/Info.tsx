import GridLeftElement from '@components/hosts/info/GridLeftElement';
import GridRightElement from '@components/hosts/info/GridRightElement';
import ContentGrid from '@components/shared/layout/ContentGrid';
import { ListHeader } from '@dudoong/ui';
import useBottomButton from '@lib/hooks/useBottomButton';
import { useEffect } from 'react';
import type {
  HostDetailResponse,
  ImageUrlResponse,
  UpdateHostRequest,
} from '@lib/apis/host/hostType';
import { useLocation } from 'react-router-dom';
import HostApi from '@lib/apis/host/HostApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePresignedUrl from '@lib/hooks/usePresignedUrl';
import { useForm, FormState, FieldValues } from 'react-hook-form';
import getKeyFromUrl from '@lib/utils/getKeyFromUrl';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';

export type InputFormType = Pick<
  UpdateHostRequest,
  'introduce' | 'contactNumber' | 'contactEmail'
>;

const Info = () => {
  const hostId = useLocation().pathname.split('/')[2];
  const { openOverlay } = useGlobalOverlay();
  const { imageInfo, setImageInfo, uploadImageToS3 } = usePresignedUrl(
    'host',
    hostId,
  );
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState } = useForm<InputFormType>({
    mode: 'onChange',
    defaultValues: {
      introduce: '',
      contactNumber: '',
      contactEmail: '',
    },
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

  // 호스트 디테일 api
  const hostDetail = queryClient.getQueryData<HostDetailResponse>([
    'hostDetail',
    hostId,
  ]);
  console.log(hostDetail);

  useEffect(() => {
    if (hostDetail) {
      if (hostDetail.profileImage) {
        setImageInfo((prev) => {
          return {
            ...prev,
            presignedUrl: '',
            key: getKeyFromUrl(hostDetail.profileImage),
          };
        });
      }
      reset({ ...hostDetail });
    }
  }, [hostDetail]);

  // 하단부 버튼
  const buttonClickHandler = (data: InputFormType) => {
    // 이미지 post
    if (imageInfo.image) {
      console.log('upload image');
      uploadImageToS3();
    }
    // 호스트 정보 post
    postEventMutation.mutate(
      {
        hostId: hostId,
        payload: { ...data, profileImageKey: imageInfo.key },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['hostDetail', hostId]);
          openOverlay({
            content: 'saved',
          });
        },
      },
    );
    console.log('click button', data, imageInfo);
  };
  useEffect(() => {
    setButtonInfo({
      firstHandler: handleSubmit(buttonClickHandler),
      firstDisable: checkButtonDisable(formState, imageInfo),
    });
  }, [formState.isValid, imageInfo]);

  return (
    <>
      <ListHeader
        title={'호스트 정보'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      <ContentGrid>
        <GridLeftElement
          hostName={hostDetail ? hostDetail!.name : ''}
          imageurl={hostDetail ? hostDetail!.profileImage : null}
          setImageInfo={setImageInfo}
        />
        <GridRightElement register={register} />
      </ContentGrid>
    </>
  );
};
export default Info;

const checkButtonDisable = (
  formState: FormState<FieldValues>,
  imageInfo: Pick<ImageUrlResponse, 'presignedUrl' | 'key'>,
) => {
  if (!formState.isValid || imageInfo.key === '') return true;
  return false;
};
