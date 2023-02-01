import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';

export interface ContenGridProps extends HTMLAttributes<HTMLDivElement> {
  topElement?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  rowGap?: number;
}

const ContentGrid = ({
  topElement,
  leftElement,
  rightElement,
  rowGap = 0,
}: ContenGridProps) => {
  return (
    <Container rowGap={rowGap}>
      <div>{topElement}</div>
      {/* topElement 값이 없을 때, leftElement가 1번 element 되는 것 방지용 */}
      {leftElement}
      {rightElement}
    </Container>
  );
};
export default ContentGrid;

interface ContainerProps {
  rowGap: number;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: grid;

  grid-template-columns: repeat(2, 398px);
  grid-template-rows: auto;
  grid-column-gap: 80px;
  grid-row-gap: ${({ rowGap }) => `${rowGap}px`};

  & > div:first-of-type {
    grid-column: 1 / 3;
  }
`;
