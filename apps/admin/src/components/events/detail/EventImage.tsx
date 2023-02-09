import { useState } from 'react';
import encodeFileToBase64 from '@lib/utils/encodeFileToBase64';
import {
  ListHeader,
  Text,
  DropZone,
  TagButton,
  RoundBlock,
  FlexBox,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const EventImage = () => {
  const [curImage, setCurImage] = useState<string | null>(null);

  const uploadHandler = (image: File) => {
    encodeFileToBase64(image, setCurImage);
  };

  const deleteImageHandler = () => {
    setCurImage(null);
  };

  return (
    <div>
      <ListHeader
        title={'공연 상세 내용'}
        size={'listHeader_18'}
        padding={[32, 0, 12, 0]}
        description={<TitleDescription />}
      />
      <Wrapper color="gray_200" padding={16}>
        {curImage === null || '' ? (
          <DropZone
            uploadFileHandler={uploadHandler}
            fileTypeErrorHandler={() => {
              console.log('file type err');
            }}
            fileNumErrorHandler={() => {
              console.log('file num err');
            }}
          />
        ) : (
          <ImageWrapper
            align={'center'}
            justify={'center'}
            direction={'column'}
          >
            <ImageContainer imageurl={curImage} padding={0}>
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
          </ImageWrapper>
        )}
      </Wrapper>
    </div>
  );
};

export default EventImage;

// -----------------------------------------------

const TitleDescription = () => {
  return (
    <div>
      <Text typo={'P_Text_16_M'} color={'red_300'}>
        포스터 이미지는 표준 종이규격 (A,B) 에 최적화되어 있어요.
        <br />
      </Text>
      <Text typo={'P_Text_16_M'} color={'red_300'}>
        사진형식은 JPG, JPEG, PNG만 가능해요.
      </Text>
    </div>
  );
};

// -----------------------------------------------

const Wrapper = styled(RoundBlock)`
  width: 100%;
  height: 398px;
`;

const ImageWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

interface ImageContainerProps {
  imageurl: string;
}

const ImageContainer = styled(RoundBlock)<ImageContainerProps>`
  ${({ imageurl }) =>
    css`
      background: url(${imageurl});
    `};
  background-size: cover;
  background-position: center;
  width: 268px;
  height: 370px;
`;

const DeleteCover = styled(FlexBox)`
  width: 268px;
  height: 370px;
  border-radius: 16px;
  opacity: 0;
  &:hover {
    background: rgba(12, 12, 12, 0.6);
    opacity: 1;
  }
`;
