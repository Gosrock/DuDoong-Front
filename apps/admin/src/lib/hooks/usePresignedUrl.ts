import { useState } from 'react';
import {
  ImageUrlResponse,
  imageFileExtensionType,
} from '@lib/apis/host/hostType';
import { useMutation } from '@tanstack/react-query';
import HostApi from '@lib/apis/host/HostApi';
import axios from 'axios';

const usePresignedUrl = () => {
  const [imageInfo, setImageInfo] = useState<
    Pick<ImageUrlResponse, 'presignedUrl' | 'key'>
  >({
    presignedUrl: '',
    key: '',
  });

  // presigned 발급 api
  const postImageMutation = useMutation(HostApi.POST_HOST_IMAGE, {
    onSuccess: (data: ImageUrlResponse) => {
      setImageInfo({ presignedUrl: data.presignedUrl, key: data.key });
      console.log('postImageMutation : ', data);
    },
  });

  const getImageExtension = (extension: string) => {
    const type = extension.split('/')[1];
    if (type === 'jpg') return 'JPG' as imageFileExtensionType;
    else if (type === 'png') return 'PNG' as imageFileExtensionType;
    else return 'JPEG' as imageFileExtensionType;
  };

  const uploadImageToS3 = async (url: string, image: File) => {
    const response = await axios.put(url, image, {
      headers: {
        'Content-Type': image.type,
      },
      baseURL: '',
    });
    return response.data.data;
  };

  return {
    imageInfo,
    setImageInfo,
    uploadImageToS3,
    getImageExtension,
    postImageMutation,
  };
};

export default usePresignedUrl;
