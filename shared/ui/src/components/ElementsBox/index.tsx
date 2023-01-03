import { CSSProperties } from '@emotion/serialize';
import { FlexBox, Padding, PaddingSize } from '../../layout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

/**
 * @paddingSize 버튼 셋의 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 * @param jusitfy : justify-content 속성
 * @param leftElement : 좌측에 위치시킬 element
 * @param rightElement : 우측에 위치시킬 element (기본값 : () => <></>)
 * @param midElement : 중간에 위치시킬 element (기본값 : () => <></>)
 */
export interface ElementsBoxProps {
  paddingSize: PaddingSize;
  justify: CSSProperties['justifyContent'];
  leftElement: () => EmotionJSX.Element;
  rightElement?: () => EmotionJSX.Element;
  midElement?: () => EmotionJSX.Element;
}

// 좌측, 중간, 우측에 존재하는 element를 함수로 받아
// 이를 flexbox에 담아 보여주는 컴포넌트입니다.
// 각 컴포넌트간 간격은 justify로 조절할 수 있습니다.
export const ElementsBox = ({
  paddingSize,
  justify,
  leftElement,
  rightElement = () => <></>,
  midElement = () => <></>,
}: ElementsBoxProps) => {
  return (
    <Padding size={paddingSize}>
      <FlexBox
        align={'center'}
        gap={'unset'}
        justify={justify}
        direction={'row'}
      >
        {leftElement()}
        {midElement()}
        {rightElement()}
      </FlexBox>
    </Padding>
  );
};
