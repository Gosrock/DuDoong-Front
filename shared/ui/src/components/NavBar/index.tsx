import { FlexBox } from '../../layout';
import { Text } from '../Text';
import { ReactComponent as Back } from '../../assets/icons/leftPointer.svg';

export interface NavBarProps {
  title?: string;
}

export const NavBar = ({ title }: NavBarProps) => {
  return (
    <FlexBox justify={'space-between'} align={'center'}>
      <Back />
      {title && (
        <Text typo="Header_20" color="black">
          {title}
        </Text>
      )}
    </FlexBox>
  );
};
