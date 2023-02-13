import { useState } from 'react';
import {
  ImageUrlResponse,
  imageFileExtensionType,
} from '@lib/apis/host/hostType';
import { useMutation } from '@tanstack/react-query';
import HostApi from '@lib/apis/host/HostApi';
import axios from 'axios';
import { useEffect } from 'react';
import EventApi from '@lib/apis/event/EventApi';

export interface ImageInfoType
  extends Pick<ImageUrlResponse, 'presignedUrl' | 'key'> {
  image: File | null;
}

type presignedUrlType = 'host' | 'event';

const usePresignedUrl = (type: presignedUrlType, id: string) => {
  const [imageInfo, setImageInfo] = useState<ImageInfoType>({
    presignedUrl: '',
    key: '',
    image: null,
  });

  // presigned 발급 api
  const postHostImageMutation = useMutation(HostApi.POST_HOST_IMAGE, {
    onSuccess: (data: ImageUrlResponse) => {
      setImageInfo((prev) => {
        return { ...prev, presignedUrl: data.presignedUrl, key: data.key };
      });
      console.log('postHostImageMutation : ', data);
    },
  });

  const postEventImageMutation = useMutation(EventApi.POST_EVENT_IMAGE, {
    onSuccess: (data: ImageUrlResponse) => {
      setImageInfo((prev) => {
        return { ...prev, presignedUrl: data.presignedUrl, key: data.key };
      });
      console.log('postHostImageMutation : ', data);
    },
  });

  // 이미지 업로드 될 때마다 presigned url 받아오기
  useEffect(() => {
    if (imageInfo.image) {
      if (type === 'host') {
        postHostImageMutation.mutate({
          hostId: id,
          imageFileExtension: getImageExtension(imageInfo.image.type),
        });
      } else {
        postEventImageMutation.mutate({
          eventId: id,
          imageFileExtension: getImageExtension(imageInfo.image.type),
        });
      }
    }
  }, [imageInfo.image]);

  // extension 구하는 function
  const getImageExtension = (extension: string) => {
    const type = extension.split('/')[1];
    if (type === 'jpg') return 'JPG' as imageFileExtensionType;
    else if (type === 'png') return 'PNG' as imageFileExtensionType;
    else return 'JPEG' as imageFileExtensionType;
  };

  // s3 upload function
  const uploadImageToS3 = async () => {
    const response = await axios.put(imageInfo.presignedUrl, imageInfo.image, {
      headers: {
        'Content-Type': imageInfo.image!.type,
      },
      baseURL: '',
    });
    return response.data.data;
  };

  return {
    imageInfo,
    setImageInfo,
    uploadImageToS3,
  };
};

export default usePresignedUrl;
