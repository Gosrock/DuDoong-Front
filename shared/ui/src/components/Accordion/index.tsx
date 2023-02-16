import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentPropsWithRef, forwardRef, ReactNode, useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import { FlexBox, ListRow, ListRowProps, PaddingSize } from '../../layout';
export interface AccordionProps
  extends ComponentPropsWithRef<'div'>,
    Pick<ListRowProps, 'textTypo' | 'textColor'> {
  title: string;
  padding?: PaddingSize;
  content: ReactNode;
  contentHeight?: number;
  initialState?: boolean;
  rightElement?: ReactNode;
  onAccordionOpened?: () => void;
  onAccordionClosed?: () => void;
  disabled?: boolean;
}
/**
 * @param padding 제목 패딩 기본:[20,10]
 * number: 상하좌우 패딩
 * [num,num]:상하, 좌우
 * [num,num,num,num]:상,우,하,좌
 * @param title : 제목
 * @param content: 아코디언 내용
 * @param textTypo
 * @param textColor
 * @param contentHeight 컨텐츠 높이 지정되면 애니메이션 적용
 * @param initialState 초기 오픈 상태
 * @param disabled
 * @param rightElement : 오른쪽 (핸들러 왼쪽)에 뱃지 같은거 넣을겨
 */

export const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(
  (
    {
      title,
      padding = [16, 24],
      content,
      textTypo = 'P_Text_16_M',
      textColor = 'gray_500',
      onAccordionOpened,
      onAccordionClosed,
      contentHeight,
      initialState = false,
      rightElement,
      disabled = false,
      ...props
    }: AccordionProps,
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const handleAccordion = () => {
      if (!disabled) {
        if (isOpen) {
          setIsOpen((prev) => !prev);
          onAccordionClosed && onAccordionClosed();
        } else {
          setIsOpen((prev) => !prev);
          onAccordionOpened && onAccordionOpened();
        }
      }
    };

    return (
      <div {...props}>
        <AccordianHeader onClick={handleAccordion} ref={ref}>
          <FlexBox align="center" justify="space-between">
            <ListRow
              text={title}
              rightElement={
                <FlexBox align={'center'} gap={12}>
                  {rightElement}
                  <Handler open={isOpen} disabled={disabled} />
                </FlexBox>
              }
              padding={padding}
              fill
              textTypo={textTypo}
              textColor={textColor}
            />
          </FlexBox>
        </AccordianHeader>

        <Content open={isOpen} height={contentHeight}>
          {content}
        </Content>
      </div>
    );
  },
);

const AccordianHeader = styled.button`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray_200};
`;

const Handler = styled(ChevronDown)<{ open: boolean; disabled: boolean }>`
  width: 18px;
  height: 18px;
  fill: ${({ theme, disabled }) =>
    disabled ? theme.palette.gray_200 : theme.palette.gray_400};
  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
  transition: all 0.2s ease;
`;

const Content = styled.div<{ height: number | undefined; open: boolean }>`
  max-height: ${({ height, open }) => (open ? height : 0)}px;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
`;
