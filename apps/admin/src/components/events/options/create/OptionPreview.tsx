import styled from '@emotion/styled';
import {
  theme,
  ListHeader,
  Input,
  Divider,
  Spacing,
  FlexBox,
  SelectButton,
} from '@dudoong/ui';
import { OptionItemProps } from '@lib/apis/option/optionType';
import { useState } from 'react';

const OptionPreview = ({ name, description, type }: OptionItemProps) => {
  const [answer, setAnswer] = useState<string>('Y');
  const handleClickSelect = (key: 'Y' | 'N') => {
    setAnswer(key);
  };
  return (
    <div>
      <ListHeader
        padding={[32, 0, 12, 0]}
        title={'미리보기'}
        size={'listHeader_18'}
      />
      <Wrapper>
        <ListHeader
          padding={[0, 12, 0, 0]}
          gap={12}
          title={name === '' ? '1. 옵션 이름' : `1. ${name}`}
          size="listHeader_18"
          description={
            description === ''
              ? '설문의 설명이 들어가는 공간입니다.'
              : description
          }
        />
        <Divider line={true} />
        <Spacing size={6} />
        {type === '주관식' ? (
          <>
            <Input
              disabled={false}
              placeholder="최대 100글자까지 쓸 수 있어요"
            ></Input>
          </>
        ) : (
          <>
            <FlexBox gap={10}>
              <SelectButton
                text={'네'}
                fullWidth={false}
                isSelected={answer === 'Y'}
                onClick={() => {
                  handleClickSelect('Y');
                }}
              />
              <SelectButton
                text={'아니오'}
                fullWidth={false}
                isSelected={answer === 'N'}
                onClick={() => {
                  handleClickSelect('N');
                }}
              />
            </FlexBox>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default OptionPreview;

const Wrapper = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
