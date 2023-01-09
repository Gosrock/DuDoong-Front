import { FlexBox, Padding } from '../../layout';
import { Text } from '../Text';
import { ReactComponent as Back } from '../../assets/icons/leftPointer.svg';
import styled from '@emotion/styled';

export interface NavBarProps {
  label?: string;
  onClick?: Function;
}

/**
 *
 * @param label : 제목
 * @params onClick : 클릭시 호출할 함수이름
 */

export const NavBar = ({ label, onClick }: NavBarProps) => {
  return (
    <FlexBox justify={'flex-start'} align={'center'} direction={'row'}>
      {onClick !== undefined && (
        <Back
          onClick={() => {
            onClick();
          }}
        />
      )}
      <Wrapper>
        {label && (
          <Text typo="Text_12" color="black">
            {label}
          </Text>
        )}
      </Wrapper>
    </FlexBox>
  );
};

const Wrapper = styled.div`
  //width: 100%;
  position: absolute;
  border: 1px solid black;
  justify-items: center;
  margin-left: 140px;
`;
