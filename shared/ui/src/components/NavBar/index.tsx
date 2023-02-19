import { FlexBox } from '../../layout';
import { Text } from '../Text';
import BackArrow from '../../assets/icons/BackArrow';
import styled from '@emotion/styled';
import { media } from '../../theme';

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
      <BackArrow onClick={backHandler} />
      <Text typo={'Navbar_17'} color={'black'}>
        {label}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled(FlexBox)`
  height: 48px;
  width: 100%;
  position: fixed;
  ${media.pc} {
    position: sticky;
  }
  top: 0;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 3;

  & > button {
    width: 40px;
    height: 40px;
    left: 6px;
    position: absolute;
    cursor: pointer;
  }
`;
