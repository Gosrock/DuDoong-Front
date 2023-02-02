/** @jsxImportSource @emotion/react */
import { HTMLAttributes } from 'react';
import { FlexBox } from '../../layout';
import { theme } from '../../theme';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  line?: boolean;
  padding?: number;
  height?: number;
}

/**
 *
 * @param line 구분선으로 사용할지, 섹션 구분인지
 * @param padding line 속성이 있을때, 구분선의 좌우패딩값을 설정합니다.
 */
export const Divider = ({
  line = false,
  padding,
  height = 20,
  ...props
}: DividerProps) => {
  return (
    <FlexBox
      align={'center'}
      css={{
        height: `${height}px`,
        backgroundColor: `${!line ? theme.palette.gray_100 : 'transparent'}`,
      }}
      {...props}
    >
      {line && (
        <div
          css={{
            width: '100%',
            height: '1px',
            backgroundColor: `${theme.palette.gray_200}`,
            margin: `0 ${padding}px`,
          }}
        ></div>
      )}
    </FlexBox>
  );
};
