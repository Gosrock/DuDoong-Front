/** @jsxImportSource @emotion/react */
import { FlexBox } from '../../layout';
import { theme } from '../../theme';

export interface DividerProps {
  line?: boolean;
  padding?: number;
}

/**
 *
 * @param line 구분선으로 사용할지, 섹션 구분인지
 * @param padding line 속성이 있을때, 구분선의 좌우패딩값을 설정합니다.
 */
export const Divider = ({ line = false, padding }: DividerProps) => {
  return (
    <FlexBox
      align={'center'}
      css={{
        height: `${line ? 20 : 16}px`,
        backgroundColor: `${!line ? theme.palette.gray_100 : 'transparent'}`,
      }}
    >
      {line && (
        <div
          css={{
            width: '100%',
            height: '1px',
            backgroundColor: `${theme.palette.gray_200}`,
            padding: `0 ${padding}px`,
          }}
        ></div>
      )}
    </FlexBox>
  );
};
