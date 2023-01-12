import styled from '@emotion/styled';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FlexBox } from '../../../layout';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  width?: number;
  height?: number;
}

/**
 * @default: textarea (textarea 태그 속성 그대로)
 *
 * @param width: number (기본값: 100%)
 * @param height: number (기본값: 120px)

 */

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, height = 120, ...props }: TextAreaProps, ref) => {
    return (
      <TextAreaWrapper width={props.width} height={height}>
        <StyledTextArea
          value={value}
          ref={ref}
          onClick={props.onClick}
          {...props}
        />
      </TextAreaWrapper>
    );
  },
);

const TextAreaWrapper = styled.div<{
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

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  border: none;
  resize: none;
  background: transparent;
  padding: 0;

  width: 100%;
  height: 100%;
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

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;
