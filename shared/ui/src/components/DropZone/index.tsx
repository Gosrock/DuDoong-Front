import { FlexBox } from '../../layout';
import styled from '@emotion/styled';
import { Text } from '../Text';
import { CSSProperties } from '@emotion/serialize';
import { KeyOfTypo, KeyOfPalette } from '../../theme';
import { CardImage } from 'react-bootstrap-icons';
import { FileUploader } from 'react-drag-drop-files';
import { ReactNode } from 'react';

export type ShapeTypeKey = 'bigPoster' | 'miniPoster' | 'profile';

type ShapeType = {
  [key in ShapeTypeKey]: {
    radius: CSSProperties['borderRadius'];
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    typo: KeyOfTypo;
    text: String | ReactNode;
  };
};

const PosterText = () => {
  return (
    <FlexBox align={'center'} direction={'column'} gap={0}>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        여기에 이미지를 드래그앤 드랍 또는 클릭해서
        <br />
      </Text>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        업로드 할 수 있어요
      </Text>
    </FlexBox>
  );
};

const SHAPE_TYPE_SET: ShapeType = {
  bigPoster: {
    radius: '8px',
    width: '100%',
    height: '100%',
    typo: 'P_Text_16_SB',
    text: <PosterText />,
  },
  miniPoster: {
    radius: '8px',
    width: '100px',
    height: '100%',
    typo: 'P_Text_12_M',
    text: '이미지 업로드',
  },
  profile: {
    radius: '50%',
    width: '240px',
    height: '240px',
    typo: 'P_Text_16_SB',
    text: '이미지 업로드',
  },
};

export interface DropZoneProps {
  type?: ShapeTypeKey;
  uploadFileHandler: (file: any) => void;
  fileTypeErrorHandler: (err: Error) => void;
  fileNumErrorHandler: () => void;
}

export const DropZone = ({
  type = 'bigPoster',
  uploadFileHandler,
  fileTypeErrorHandler,
  fileNumErrorHandler,
}: DropZoneProps) => {
  const fileTypes = ['png', 'jpeg', 'jpg'];

  const fileUploaderHandler = (file: File[]) => {
    if (file.length !== 1) {
      fileNumErrorHandler();
    } else {
      uploadFileHandler(file[0]);
    }
  };

  return (
    <BorderBox type={type}>
      <FileUploader
        multiple={true} // 파일 여러개 업로드
        handleChange={fileUploaderHandler} // 파일 업로드시 핸들러
        onTypeError={fileTypeErrorHandler} // 파일 타입 에러 핸들러
        types={fileTypes} // 파일 타입 종류
        dropMessageStyle={{ background: 'none', border: 'none' }} // 호버시 컴포넌트 스타일
        hoverTitle=" " // 호버시 컴포넌트 text
      >
        <InputBox align={'center'} direction="column" gap={10}>
          <CardImage />
          <CustomText
            text={SHAPE_TYPE_SET[type].text}
            color={'gray_400'}
            typo={SHAPE_TYPE_SET[type].typo}
          />
        </InputBox>
      </FileUploader>
    </BorderBox>
  );
};

// ------------------------------------------------------

const CustomText = ({
  text,
  typo,
  color,
  ...props
}: {
  text: ReactNode | string;
  typo: KeyOfTypo;
  color: KeyOfPalette;
}) => {
  return (
    <>
      {isString(text) ? (
        <Text typo={typo} color={color} {...props}>
          {text}
        </Text>
      ) : (
        <div {...props}>{text}</div>
      )}
    </>
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string'; // T of F
};

// ------------------------------------------------------

interface BorderBoxProps {
  type: ShapeTypeKey;
}

const BorderBox = styled.div<BorderBoxProps>`
  border-radius: ${({ type }) => SHAPE_TYPE_SET[type].radius};
  width: ${({ type }) => SHAPE_TYPE_SET[type].width};
  height: ${({ type }) => SHAPE_TYPE_SET[type].height};
  border: 1px dashed ${({ theme }) => theme.palette.main_300};
  cursor: pointer;
  box-sizing: border-box;

  & > input {
    display: none;
  }

  & > label {
    width: 100%;
    height: 100%;
  }
`;

const InputBox = styled(FlexBox)`
  height: 100%;

  & > svg > path {
    fill: ${({ theme }) => theme.palette.gray_400};
  }
`;
