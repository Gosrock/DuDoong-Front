import styled from '@emotion/styled';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { ReactComponent as Down } from '../../assets/icons/down.svg';
import { ReactComponent as Up } from '../../assets/icons/up.svg';
import { Padding, PaddingSize } from '../../layout';

export interface AccordionProps {
  title?: string;
  children: ReactNode;
  titlepaddingSize: PaddingSize;
  contents: string;
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
  children,
  titlepaddingSize = [20, 10],
  contents,
}: AccordionProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
        parentRef.current.style.background = 'white';
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  const parentRefHeight = parentRef.current?.style.height ?? '0px';

  return (
    <>
      <Container>
        <Header onClick={handleButtonClick}>
          <Padding size={titlepaddingSize}>
            <TitleText>{title}</TitleText>
          </Padding>
          <Icon>{parentRefHeight === '0px' ? <Down /> : <Up />} </Icon>
        </Header>
        <ContentsWrapper ref={parentRef}>
          <Contents ref={childRef}>
            {children}
            {contents}
          </Contents>
        </ContentsWrapper>
      </Container>
    </>
  );
};
const ContentsWrapper = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
`;
const Contents = styled.div`
  padding: 4px 8px;
`;
const Icon = styled.div`
  font-size: 40px;
  margin-left: 330px;
  position: fixed;
`;
const TitleText = styled.a``;
const Header = styled.div`
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;
