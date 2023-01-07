import styled from '@emotion/styled';
import { InputHTMLAttributes, ReactNode } from 'react';
import { FlexBox } from '../../../layout';
import { KeyOfPalette } from '../../../theme';
import { calcRem } from '../../../theme/typo';
import { Text } from '../../Text';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  messageColor?: KeyOfPalette;
}

/**
 * @param width: number (기본값: 100%)
 * @param height: number (기본값: 56px)
 * @param leftImage: 왼쪽에 들어갈 수 있는 element
 * @param rightImage: 오른쪽에 들어갈 수 있는 element
 * @param errorMessage: string
 * @param messageColor: KeyOfPalette
 */

export const Input = ({
  height = 56,
  messageColor = 'red_200',
  ...props
}: InputProps) => {
  return (
    <FlexBox
      align={'flex-start'}
      justify={'center'}
      direction={'column'}
      gap={10}
    >
      <InputWrapper width={props.width} height={height}>
        {props.leftIcon}
        <StyledInput {...props} />
        {props.rightIcon}
      </InputWrapper>

      <TextWrapper errorMessage={props.errorMessage}>
        {props.errorMessage && (
          <Text typo={'Text_12'} color={messageColor}>
            {props.errorMessage}
          </Text>
        )}
      </TextWrapper>
    </FlexBox>
  );
};

const InputWrapper = styled.div<{
  width?: number;
  height?: number;
}>`
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.gray_200};
  border-radius: 16px;

  padding: 16px;
  gap: 10px;

  height: ${({ height }) => (height ? `${height}px` : `56px`)};
  width: ${({ width }) => (width ? `${width}px` : '100%')};

  // ㅡ.ㅡ
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  border: none;
  background: transparent;
  padding: 0;

  width: 100%;
  line-height: 100%;

  ${({ theme }) => theme.typo.Text_16};
  color: ${({ theme }) => theme.palette.gray_500};

  ::placeholder {
    color: ${({ theme }) => theme.palette.gray_400};
  }

  &:disabled {
    ::placeholder {
      color: ${({ theme }) => theme.palette.gray_100} !important;
    }
  }
`;

const TextWrapper = styled.div<{
  errorMessage?: string;
}>`
  padding-left: 16px;
  padding-bottom: ${({ errorMessage }) =>
    errorMessage ? `${calcRem(18)}` : '0'};
  height: ${({ errorMessage }) => (errorMessage ? '0' : `${calcRem(18)}`)};
`;
