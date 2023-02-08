/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';
import { FlexBox, Padding } from '../../layout';
import { Text } from '../Text';
import Logo from '../../assets/logo/Logo';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  rightElement: ReactNode;
  title?: string;
}

export const Header = ({ rightElement, title }: HeaderProps) => {
  return (
    <Wrapper align={'center'}>
      <Padding size={[0, 38]} fill>
        <FlexBox justify={'space-between'} align={'center'}>
          <button
            onClick={() => (window.location.href = window.location.origin)}
            css={css`
              &:hover {
              }
            `}
          >
            <Logo />
          </button>
          {rightElement}
        </FlexBox>
      </Padding>
      {title && (
        <Text
          typo="G_Side_14_M"
          color="black"
          css={css`
            position: absolute;
            margin: 0 auto;
            padding-left: 252px;
          `}
        >
          {title}
        </Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(FlexBox)`
  height: 64px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray_200};
  box-sizing: border-box;
`;
