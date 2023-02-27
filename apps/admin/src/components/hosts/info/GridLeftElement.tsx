import {
  DropZone,
  ListHeader,
  Spacing,
  Text,
  RoundBlock,
  TagButton,
  FlexBox,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import encodeFileToBase64 from '@lib/utils/encodeFileToBase64';
import { ImageInfoType } from '@lib/hooks/usePresignedUrl';

interface GridLeftElementProps {
  hostName: string | null;
  imageurl: string | null;
  setImageInfo: React.Dispatch<React.SetStateAction<ImageInfoType>>;
}

const GridLeftElement = ({
  hostName,
  imageurl,
  setImageInfo,
}: GridLeftElementProps) => {
  const [curImage, setCurImage] = useState<string | null>('');

  useEffect(() => setCurImage(imageurl), [imageurl]);

  const uploadHandler = (image: File) => {
    encodeFileToBase64(image, setCurImage);
    setImageInfo((prev) => {
      return { ...prev, image: image };
    });
  };

  const deleteImageHandler = () => {
    setCurImage(null);
    setImageInfo((prev) => {
      return { ...prev, image: null, key: '' };
    });
  };

  return (
    <div>
      <ListHeader
        title={<ListHeaderTitle hostName={hostName ? hostName : 'OOO'} />}
        size={'listHeader_18'}
        padding={[32, 0, 12, 0]}
        description={'호스트 이름은 수정할 수 없어요.'}
      />
      <Spacing size={58} />
      <ListHeader
        title={'프로필 이미지'}
        required={true}
        size={'listHeader_18'}
        padding={[32, 0, 12, 0]}
      />
      {curImage === null || '' ? (
        <DropZoneWrapper background="gray_200" padding={24}>
          <DropZone
            type="profile"
            uploadFileHandler={uploadHandler}
            fileTypeErrorHandler={() => {
              console.log('file type err');
            }}
            fileNumErrorHandler={() => {
              console.log('file num err');
            }}
          />
        </DropZoneWrapper>
      ) : (
        <>
          <ImageContainer padding={0} imageurl={curImage}>
            <DeleteCover align={'center'} justify={'center'}>
              <TagButton
                text="삭제"
                color="warn"
                size="lg"
                width={96}
                onClick={deleteImageHandler}
              />
            </DeleteCover>
          </ImageContainer>
        </>
      )}
    </div>
  );
};
export default GridLeftElement;

// -----------------------------------------------------

// -----------------------------------------------------

const ListHeaderTitle = ({ hostName }: { hostName: string | undefined }) => {
  return (
    <Text typo={'P_Header_18_SB'} color={'black'}>
      호스트 정보:{' '}
      <Text typo={'P_Header_18_SB'} color={'main_500'}>
        {hostName}
      </Text>
    </Text>
  );
};

const DropZoneWrapper = styled(RoundBlock)`
  width: 288px;
  height: 288px;
`;

interface ImageContainerProps {
  imageurl: string;
}

const ImageContainer = styled(DropZoneWrapper)<ImageContainerProps>`
  ${({ imageurl }) =>
    css`
      background: url(${imageurl});
    `};
  background-size: cover;
  background-position: center;
`;

const DeleteCover = styled(FlexBox)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  opacity: 0;
  &:hover {
    background: rgba(12, 12, 12, 0.6);
    opacity: 1;
  }
`;
