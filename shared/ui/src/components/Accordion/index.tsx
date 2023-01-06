import styled from '@emotion/styled';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { ReactComponent as Down } from '../../assets/icons/down.svg';
import { ReactComponent as Up } from '../../assets/icons/up.svg';
import { FlexBox, Padding, PaddingSize } from '../../layout';
import { KeyOfTypo } from '../../theme';
import { Text } from '../Text';
export interface AccordionProps {
  title?: string;
  titlepaddingSize: PaddingSize;
  contents: string;
  titleAs: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleTypo: KeyOfTypo;
}

/**
 * @titlepaddingSize 제목 패딩 기본:[20,10]
 * number: 상하좌우 패딩
 * [num,num]:상하, 좌우
 * [num,num,num,num]:상,우,하,좌
 * @param title : 제목
 * @param contents: 내용물, 눈으로 확인해 볼 수 있게 일단 string으로 해놓았는데 기본 요소 무엇으로 해놓아야할지 정하지 x
 * --------------------
 * contents는 listRow요소를 써서 listRow에 맞게 써주세요
 * 아이콘과 접었다 폈다는 고정시켜서 props가 많이 x 오히려 안에 있는 요소들을 신경써야할듯
 * contents wrapper부분이 고정되어야 하는 이유는 높이에 맞게 접었다 폈다를 구현했기 때문에 설정해놓은 패딩값이 변하면 x
 */

export const Accordion = ({
  title = '공연장안내',
  titleAs = 'p',
  titleTypo = 'Text_12',
  titlepaddingSize = [20, 10],
  contents,
}: AccordionProps) => {
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <>
      <Container>
        <div onClick={() => setIsCollapse((prev) => !prev)}>
          <Padding size={titlepaddingSize}>
            <FlexBox align="any" direction="row" justify="space-between">
              <Text as={titleAs} typo={titleTypo}>
                {title}
              </Text>
              {!isCollapse ? <Down /> : <Up />}
            </FlexBox>
          </Padding>
        </div>
        <ContentsWrapper isOpen={isCollapse} childRef>
          <Contents isOpen={isCollapse}>{contents}</Contents>
        </ContentsWrapper>
      </Container>
    </>
  );
};
const ContentsWrapper = styled.div<{ isOpen: boolean; childRef: any }>`
  height: ${(props) => (props.isOpen === false ? '0' : `${props.childRef}px`)};
  overflow: ${(props) => (props.isOpen === false ? 'hidden' : 'none')};
`;
const Contents = styled.div<{ isOpen: boolean }>`
  padding: 4px 8px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border: 1px solid black;
`;
