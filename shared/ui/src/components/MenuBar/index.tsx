import { FlexBox, Padding, PaddingSize } from '../../layout';
import styled from '@emotion/styled';
import { Text } from '../Text';
import React, { useState } from 'react';
import { useRef } from 'react';

/**
 * @param menus menu 항목
 * @param padding 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 * * 아랫쪽 패딩은 0으로 고정입니다.
 * @param curActiveMenu 현재 메뉴
 * 첫번째 메뉴부터 0 1 2 .... 이런식으로 지정하면 됩니다.
 * @param setCurActiveMenu 메뉴 변경
 */

export interface MenuBarProps {
  menus: Array<string>;
  curActiveMenu: number;
  setCurActiveMenu: (nextMenu: number) => void;
  padding?: PaddingSize;
}

export const MenuBar = ({
  menus,
  curActiveMenu,
  setCurActiveMenu,
  padding = [8, 24],
}: MenuBarProps) => {
  const contentRef = useRef<HTMLDivElement[]>([]);
  // [left position, width]
  const [indicatorPositionAndWidth, setIndicatorPositionAndWidth] = useState<
    [number, number]
  >([0, 0]);

  const addRef = (element: HTMLDivElement) => {
    contentRef.current?.push(element);
    if (indicatorPositionAndWidth[1] === 0) {
      setIndicatorPositionAndWidth([
        0,
        contentRef.current[0].getBoundingClientRect().width,
      ]);
    }
  };

  const menuIndicatorHandler = (
    index: number,
    leftPadding: number,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    const indicatorPosition =
      contentRef.current[index].getBoundingClientRect().left - leftPadding;
    const indicatorWidth =
      contentRef.current[index].getBoundingClientRect().width;
    setCurActiveMenu(index);
    setIndicatorPositionAndWidth([indicatorPosition, indicatorWidth]);
  };

  const convertedPadding = paddingConvertion({ padding });

  return (
    <MenuBarWrapper size={convertedPadding as PaddingSize}>
      <>
        <FlexBox align="center" justify="start">
          {menus.map((menu, index) => (
            <div ref={(el: HTMLDivElement) => addRef(el)}>
              <Content size={[12, 11, 9, 11]} key={index}>
                <Text
                  typo="Navbar_17"
                  color={curActiveMenu === index ? 'black' : 'gray_300'}
                  onClick={(e: React.MouseEvent) =>
                    menuIndicatorHandler(index, convertedPadding[3], e)
                  }
                >
                  {menu}
                </Text>
              </Content>
            </div>
          ))}
        </FlexBox>
        <Indicator leftAndWidth={indicatorPositionAndWidth} />
      </>
    </MenuBarWrapper>
  );
};

// ------------------------------------------------------

interface paddingConvertionProps {
  padding: PaddingSize;
}

const paddingConvertion = ({ padding }: paddingConvertionProps) => {
  const convertedPadding =
    typeof padding === 'number'
      ? [padding, padding, 0, padding]
      : padding.length === 2
      ? [padding[0], padding[1], 0, padding[1]]
      : [padding[0], padding[1], 0, padding[3]];
  return convertedPadding;
};

// ------------------------------------------------------

const MenuBarWrapper = styled(Padding)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray_300};
`;

const Content = styled(Padding)`
  & > span:hover {
    color: ${({ theme }) => theme.palette.black};
    cursor: pointer;
  }
`;

interface IndicatorProps {
  leftAndWidth: [number, number];
}

const Indicator = styled.div<IndicatorProps>`
  position: relative;
  height: 2px;
  background: ${({ theme }) => theme.palette.black};
  left: ${({ leftAndWidth }) => `${leftAndWidth[0]}px`};
  width: ${({ leftAndWidth }) => `${leftAndWidth[1]}px`};
  transition: all 300ms ease-in-out;
  margin-bottom: -1px;
`;
