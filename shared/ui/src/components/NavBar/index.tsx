import { FlexBox, Padding } from '../../layout';
import { Text } from '../Text';
import { ChevronLeft } from 'react-bootstrap-icons';
import styled from '@emotion/styled';

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
    <Wrapper align={'center'} justify={'center'}>
      <ChevronLeft onClick={backHandler} />
      <Text typo={'Navbar_17'} color={'black'}>
        {label}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled(FlexBox)`
  height: 48px;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 10;

  & > svg {
    height: 18px;
    width: 18px;
    padding: 11px;
    left: 6px;
    position: absolute;
    cursor: pointer;
  }
  & > svg > path {
    fill: ${({ theme }) => theme.palette.gray_500};
  }
`;
