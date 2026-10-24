import GridLeftElement from '@components/hosts/info/GridLeftElement';
import GridRightElement from '@components/hosts/info/GridRightElement';
import ContentGrid from '@components/shared/layout/ContentGrid';
import { ListHeader } from '@dudoong/ui';
import { formatRegistrationNumber } from '@dudoong/utils';
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
> & {
  isBusiness: boolean;
  businessName: string;
  representativeName: string;
  registrationNumber: string;
  businessAddress: string;
};

const Info = () => {
  const hostId = useLocation().pathname.split('/')[2];
  const { openOverlay } = useGlobalOverlay();
  const { imageInfo, setImageInfo, uploadImageToS3 } = usePresignedUrl(
    'host',
    hostId,
  );
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState, watch, setValue } =
    useForm<InputFormType>({
      mode: 'onChange',
      defaultValues: {
        introduce: '',
        contactNumber: '',
        contactEmail: '',
        isBusiness: false,
        businessName: '',
        representativeName: '',
        registrationNumber: '',
        businessAddress: '',
      },
    });
  const { setButtonInfo } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  // profile 수정 api
  const postEventMutation = useMutation(HostApi.PATCH_HOST_PROFILE, {
    onSuccess: (data: HostDetailResponse) => {
      //console.log('postHostProfileMutation : ', data);
    },
  });

  // 호스트 디테일 api
  const hostDetail = queryClient.getQueryData<HostDetailResponse>([
    'hostDetail',
    hostId,
  ]);

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
      const { businessInfo } = hostDetail;
      reset({
        ...hostDetail,
        isBusiness: !!businessInfo,
        businessName: businessInfo?.businessName ?? '',
        representativeName: businessInfo?.representativeName ?? '',
        registrationNumber: formatRegistrationNumber(
          businessInfo?.registrationNumber ?? '',
        ),
        businessAddress: businessInfo?.address ?? '',
      });
    }
  }, [hostDetail]);

  // 하단부 버튼
  const buttonClickHandler = ({
    isBusiness,
    businessName,
    representativeName,
    registrationNumber,
    businessAddress,
    ...data
  }: InputFormType) => {
    // 이미지 post
    if (imageInfo.image) {
      uploadImageToS3();
    }
    // 호스트 정보 post
    postEventMutation.mutate(
      {
        hostId: hostId,
        payload: {
          ...data,
          profileImageKey: imageInfo.key,
          businessType: isBusiness ? 'BUSINESS' : 'INDIVIDUAL',
          businessInfo: isBusiness
            ? {
                businessName: businessName.trim(),
                representativeName: representativeName.trim(),
                registrationNumber: registrationNumber.replace(/\D/g, ''),
                address: businessAddress.trim(),
              }
            : null,
        },
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
        description={'모든 항목을 입력해야 저장할 수 있어요.'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      <ContentGrid>
        <GridLeftElement
          hostName={hostDetail ? hostDetail!.name : ''}
          imageurl={hostDetail ? hostDetail!.profileImage : null}
          setImageInfo={setImageInfo}
        />
        <GridRightElement
          register={register}
          watch={watch}
          setValue={setValue}
          errors={formState.errors}
        />
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
