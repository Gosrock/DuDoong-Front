import { FlexBox, Padding, PaddingSize, RoundBlock } from '../../layout';
import styled from '@emotion/styled';
import { Text } from '../Text';
import { css } from '@emotion/react';
import { CSSProperties } from '@emotion/serialize';
import { KeyOfTypo } from '../../theme';
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { theme } from '../../theme';
import { ReactComponent as DetailInfo } from '../../assets/icons/detailInfo.svg';
import { FileUploader } from 'react-drag-drop-files';

export type ShapeTypeKey = 'bigPoster' | 'miniPoster' | 'profile';

type ShapeType = {
  [key in ShapeTypeKey]: {
    radius: CSSProperties['borderRadius'];
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    typo: KeyOfTypo;
    text: String;
  };
};

const SHAPE_TYPE_SET: ShapeType = {
  bigPoster: {
    radius: '8px',
    width: 'null',
    height: 'null',
    typo: 'Text_16',
    text: '여기에 이미지를 드래그앤 드랍 또는 클릭해서 업로드 할 수 있어요',
  },
  miniPoster: {
    radius: '8px',
    width: '100px',
    height: 'null',
    typo: 'Text_12',
    text: '이미지 업로드',
  },
  profile: {
    radius: '50%',
    width: '240px',
    height: '240px',
    typo: 'Text_16',
    text: '이미지 업로드',
  },
};

export interface DropZoneProps {
  type?: ShapeTypeKey;
  uploadFileHandler: (file: File) => void;
  fileTypeErrorHandler: (err: Error) => void;
}

export const DropZone = ({
  type = 'bigPoster',
  uploadFileHandler,
  fileTypeErrorHandler,
}: DropZoneProps) => {
  const fileTypes = ['png', 'jpeg', 'jpg'];
  return (
    <BorderBox type={type}>
      <FileUploader
        multiple={true} // 파일 여러개 업로드
        handleChange={uploadFileHandler} // 파일 업로드시 핸들러
        onTypeError={fileTypeErrorHandler} // 파일 타입 에러 핸들러
        types={fileTypes} // 파일 타입 종류
        dropMessageStyle={{ background: 'none', border: 'none' }} // 호버시 컴포넌트 스타일
        hoverTitle=" " // 호버시 컴포넌트 text
      >
        <InputBox align={'center'} direction="column" gap={10}>
          <DetailInfo />
          <Text typo={SHAPE_TYPE_SET[type].typo} color={'gray_400'}>
            {SHAPE_TYPE_SET[type].text}
          </Text>
        </InputBox>
      </FileUploader>
    </BorderBox>
  );
};

// ------------------------------------------------------

// ------------------------------------------------------

interface BorderBoxProps {
  type: ShapeTypeKey;
}

const BorderBox = styled.div<BorderBoxProps>`
  ${({ type }) => css`
    border-radius: ${SHAPE_TYPE_SET[type].radius};
    width: ${SHAPE_TYPE_SET[type].width};
    height: ${SHAPE_TYPE_SET[type].height};
  `}
  border: 1px dashed ${({ theme }) => theme.palette.main_300};
  cursor: pointer;

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
