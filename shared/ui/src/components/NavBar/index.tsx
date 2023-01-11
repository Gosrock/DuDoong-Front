import { FlexBox, Padding } from '../../layout';
import { Text } from '../Text';
import { ReactComponent as Back } from '../../assets/icons/leftPointer.svg';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { number } from 'prop-types';

export interface NavBarProps {
  label?: string;
  Handler?: Function | undefined;
}

/**
 *
 * @param label : 제목
 * @params Handler : 클릭시 호출할 함수이름
 */

interface IndicatorProps {
  arrowWidth: number;
}

export const NavBar = ({ label, Handler }: NavBarProps) => {
  const contentRef = useRef<HTMLDivElement[]>([]);
  const [indicatorWidth, setWidth] = useState<number>(0);

  const addRef = (element: HTMLDivElement) => {
    contentRef.current?.push(element);
    setWidth(contentRef.current[0].getBoundingClientRect().width);
  };

  return (
    <Padding size={[8, 12]}>
      <FlexBox align={'center'} justify={'flex-start'}>
        <FlexBox direction={'row'} align={'center'} justify={'flex-start'}>
          <div ref={(el: HTMLDivElement) => addRef(el)}>
            <Back
              onClick={() => {
                Handler();
              }}
            />
          </div>
        </FlexBox>
        <Wrapper arrowWidth={indicatorWidth}>
          {label && (
            <Text typo="Text_16" color="black">
              {label}
            </Text>
          )}
        </Wrapper>
      </FlexBox>
    </Padding>
  );
};

const Wrapper = styled.div<IndicatorProps>`
  position: relative;
  justify-items: center;
  align-items: center;
  margin-left: calc((56vw - ${({ arrowWidth }) => ` ${arrowWidth}px`}) / 2);
`;
