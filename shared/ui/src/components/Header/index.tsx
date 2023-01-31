/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';
import { FlexBox, Padding } from '../../layout';
import { Text } from '../Text';
import { ReactComponent as LogoEng } from '../../assets/logo/logoEng.svg';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  rightElement: ReactNode;
  title?: string;
}

export const Header = ({ rightElement, title }: HeaderProps) => {
  return (
    <Wrapper align={'center'}>
      <Padding size={[0, 38]} fill>
        <FlexBox justify={'space-between'} align={'center'}>
          <LogoEng />
          {rightElement}
        </FlexBox>
      </Padding>
      {title && (
        <Text
          typo="G_Header_20_B"
          color="black"
          css={css`
            position: absolute;
            left: 252px;
          `}
        >
          {title}
        </Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(FlexBox)`
  height: 80px;
  left: 0px;
  width: 100%;
`;
