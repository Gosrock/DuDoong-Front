import { FlexBox, Padding, PaddingSize } from '../../layout';
import { KeyOfPalette } from '../../theme';
import styled from '@emotion/styled';
import { CSSProperties } from '@emotion/serialize';
import { theme } from '../../theme';
import { Text } from '../Text';
import React, { useState } from 'react';
import { useRef } from 'react';
import { element, number } from 'prop-types';
import { useEffect } from '@storybook/addons';
import { inferControls } from '@storybook/store';

/**
 * @param menus menu 항목
 * @param padding 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 * * 아랫쪽 패딩은 0으로 고정입니다.
 */

export interface MenuBarProps {
  menus: Array<string>;
  padding?: PaddingSize;
}

export const MenuBar = ({ menus, padding = [8, 24] }: MenuBarProps) => {
  const contentRef = useRef<HTMLDivElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number>(0);
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
    setSelected(index);
    setIndicatorPositionAndWidth([indicatorPosition, indicatorWidth]);
  };

  const convertedPadding = paddingConvertion({ padding });

  return (
    <MenuBarWrapper size={convertedPadding as PaddingSize}>
      <>
        <FlexBox align="center" justify="start">
          {menus.map((menu, index) => (
            <div ref={(el: HTMLDivElement) => addRef(el)}>
              <Content size={[12, 11, 10, 11]} key={index}>
                <Text
                  typo="Navbar_17"
                  color={selected === index ? 'black' : 'gray_300'}
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
        <Indicator
          ref={indicatorRef}
          leftAndWidth={indicatorPositionAndWidth}
        />
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
  transition: all 500ms ease-in-out;
`;
