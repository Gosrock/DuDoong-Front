import type { imageFileExtensionType } from '@lib/apis/event/eventType';

// extension 구하는 function
const getImageExtension = (extension: string) => {
  const type = extension.split('/')[1];
  if (type === 'jpg') return 'JPG' as imageFileExtensionType;
  else if (type === 'png') return 'PNG' as imageFileExtensionType;
  else return 'JPEG' as imageFileExtensionType;
};

export default getImageExtension;
