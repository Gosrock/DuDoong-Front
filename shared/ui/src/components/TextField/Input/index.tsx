import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FlexBox } from '../../../layout';
import { KeyOfPalette } from '../../../theme';
import { calcRem } from '../../../theme/typo';
import { Text } from '../../Text';
export { Search } from 'react-bootstrap-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  width?: number;
  height?: number;
  styles?: SerializedStyles;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  errorMessageColor?: KeyOfPalette;
}

/**
 * @default: input (input 태그 속성 그대로)
 *
 * @param width: number (기본값: 100%)
 * @param height: number (기본값: 56px)
 * @param leftImage: 왼쪽에 들어갈 수 있는 element
 * @param rightImage: 오른쪽에 들어갈 수 있는 element
 * @param errorMessage: string
 * @param messageColor: KeyOfPalette
 */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      height,
      styles,
      errorMessageColor = 'red_200',
      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <FlexBox
        align={'flex-start'}
        justify={'center'}
        direction={'column'}
        gap={10}
      >
        <InputWrapper width={props.width} height={height} css={styles}>
          {props.leftIcon}
          <StyledInput
            value={value}
            ref={ref}
            onClick={props.onClick}
            {...props}
          />
          {props.rightIcon}
        </InputWrapper>
        {props.errorMessage && (
          <MessageWrapper errorMessage={props.errorMessage}>
            <Text typo={'Text_12'} color={errorMessageColor}>
              {props.errorMessage}
            </Text>
          </MessageWrapper>
        )}
      </FlexBox>
    );
  },
);

const InputWrapper = styled.div<{
  width?: number;
  height?: number;
}>`
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.gray_200};
  border-radius: 12px;

  padding: 16px;
  gap: 10px;

  height: ${({ height }) => (height ? `${height}px` : `48px`)};
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

  ${({ theme }) => theme.typo.P_Text_16_M};
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

const MessageWrapper = styled.div<{
  errorMessage?: string;
}>`
  padding-left: 16px;
  padding-bottom: ${({ errorMessage }) =>
    errorMessage ? `${calcRem(18)}` : '0'};
  height: ${({ errorMessage }) => (errorMessage ? '0' : `${calcRem(18)}`)};
`;
