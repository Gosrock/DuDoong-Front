import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';
import { ReactComponent as Down } from '../../assets/icons/down.svg';
import { FlexBox, ListRow, ListRowProps, PaddingSize } from '../../layout';
export interface AccordionProps
  extends Pick<ListRowProps, 'textTypo' | 'textColor'> {
  title?: string;
  padding?: PaddingSize;
  content: ReactNode;
}
/**
 * @titlepaddingSize 제목 패딩 기본:[20,10]
 * number: 상하좌우 패딩
 * [num,num]:상하, 좌우
 * [num,num,num,num]:상,우,하,좌
 * @param title : 제목
 * @param content: 내용물, 눈으로 확인해 볼 수 있게 일단 string으로 해놓았는데 기본 요소 무엇으로 해놓아야할지 정하지 x
 * --------------------
 * contents는 listRow요소를 써서 listRow에 맞게 써주세요
 * 아이콘과 접었다 폈다는 고정시켜서 props가 많이 x 오히려 안에 있는 요소들을 신경써야할듯
 * contents wrapper부분이 고정되어야 하는 이유는 높이에 맞게 접었다 폈다를 구현했기 때문에 설정해놓은 패딩값이 변하면 x
 */

export const Accordion = ({
  title = '공연장안내',
  padding = [16, 24],
  content,
  textTypo = 'Text_16',
  textColor = 'gray_500',
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AccordianHeader onClick={() => setIsOpen((prev) => !prev)}>
        <FlexBox align="center" justify="space-between">
          <ListRow
            text={title}
            rightElement={<Handler isOpen={isOpen} />}
            padding={padding}
            fill
            textTypo={textTypo}
            textColor={textColor}
          />
        </FlexBox>
      </AccordianHeader>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

const AccordianHeader = styled.button`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray_200};
`;

const Handler = styled(Down)<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
  transition: all 0.2s ease;
`;
