import { FlexBox, Padding } from '../../layout';
import { Text } from '../Text';
import { ChevronLeft } from 'react-bootstrap-icons';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface NavBarProps {
  label?: string;
  backHandler: () => void;
}

/**
 *
 * @param label : 제목
 * @param backHandler : 클릭시 호출할 함수이름
 */

export const NavBar = ({ label, backHandler }: NavBarProps) => {
  return (
    <Padding size={[4, 6]}>
      <Wrapper align={'center'} justify={'center'}>
        <ChevronLeft onClick={backHandler} />
        <Text typo={'Navbar_17'} color={'black'}>
          {label}
        </Text>
      </Wrapper>
    </Padding>
  );
};

const Wrapper = styled(FlexBox)`
  height: 40px;
  position: relative;
  & > svg {
    height: 18px;
    width: 18px;
    padding: 11px;
    position: absolute;
    left: 0px;
    cursor: pointer;
  }
  & > svg > path {
    fill: ${({ theme }) => theme.palette.gray_500};
  }
`;
