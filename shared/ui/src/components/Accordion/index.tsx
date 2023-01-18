import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import { FlexBox, ListRow, ListRowProps, PaddingSize } from '../../layout';
export interface AccordionProps
  extends Pick<ListRowProps, 'textTypo' | 'textColor'> {
  title: string;
  padding?: PaddingSize;
  content: ReactNode;
  onAccordionOpened?: () => void;
  onAccordionClosed?: () => void;
}
/**
 * @param padding 제목 패딩 기본:[20,10]
 * number: 상하좌우 패딩
 * [num,num]:상하, 좌우
 * [num,num,num,num]:상,우,하,좌
 * @param title : 제목
 * @param content:
 * @param textTypo
 * @param textColor
 */

export const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(
  (
    {
      title,
      padding = [16, 24],
      content,
      textTypo = 'Text_16',
      textColor = 'gray_500',
      onAccordionOpened,
      onAccordionClosed,
    }: AccordionProps,
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAccordion = () => {
      if (isOpen) {
        setIsOpen((prev) => !prev);
        onAccordionClosed && onAccordionClosed();
      } else {
        setIsOpen((prev) => !prev);
        onAccordionOpened && onAccordionOpened();
      }
    };

    return (
      <div>
        <AccordianHeader onClick={handleAccordion} ref={ref}>
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
  },
);

const AccordianHeader = styled.button`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray_200};
`;

const Handler = styled(ChevronDown)<{ isOpen: boolean }>`
  width: 18px;
  height: 18px;
  fill: ${({ theme }) => theme.palette.gray_400};
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
  transition: all 0.2s ease;
`;
