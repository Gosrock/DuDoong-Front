import { ListRow } from '../../layout';
import { TextType } from '../../theme';
import { Text } from '../Text';
import { ProfileImage } from './ProfileImage';

export interface ProfileProps {
  size: ProfileSizeKey;
  image?: string;
  name: string;
  subText?: string;
}

type ProfileSizeKey = 'big' | 'small';

type ProfileSizeType = {
  [key in ProfileSizeKey]: {
    imageSize: 36 | 49;
    name: TextType;
    sub: TextType;
  };
};

const PROFILE_SIZE: ProfileSizeType = {
  big: {
    imageSize: 49,
    name: {
      typo: 'Text_18',
      color: 'black',
    },
    sub: {
      typo: 'Text_16',
      color: 'gray_400',
    },
  },
  small: {
    imageSize: 36,
    name: {
      typo: 'Text_16',
      color: 'black',
    },
    sub: {
      typo: 'Text_12',
      color: 'gray_400',
    },
  },
};

export const Profile = ({ size, image, name, subText }: ProfileProps) => {
  return (
    <ListRow
      leftImage={
        <ProfileImage size={PROFILE_SIZE[size].imageSize} imageUrl={image} />
      }
      text={
        <Text
          typo={PROFILE_SIZE[size].name.typo}
          color={PROFILE_SIZE[size].name.color}
        >
          {name}
        </Text>
      }
      subText={
        subText && (
          <Text
            typo={PROFILE_SIZE[size].sub.typo}
            color={PROFILE_SIZE[size].sub.color}
          >
            {subText}
          </Text>
        )
      }
      padding={0}
    />
  );
};
