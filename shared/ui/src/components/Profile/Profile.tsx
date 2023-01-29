import { ListRow } from '../../layout';
import { TextType } from '../../theme';
import { Text } from '../Text';
import { ProfileImage } from './ProfileImage';

export interface ProfileProps {
  size: ProfileSizeKey;
  image?: string;
  name: string;
  alliance?: boolean;
  subText?: string;
}

type ProfileSizeKey = 'big' | 'small';

type ProfileSizeType = {
  [key in ProfileSizeKey]: {
    imageSize: 36 | 68;
    name: TextType;
    sub: TextType;
  };
};

const PROFILE_SIZE: ProfileSizeType = {
  big: {
    imageSize: 68,
    name: {
      typo: 'G_Name_18_M',
      color: 'black',
    },
    sub: {
      typo: 'P_Text_14_M',
      color: 'gray_400',
    },
  },
  small: {
    imageSize: 36,
    name: {
      typo: 'G_Name_15_M',
      color: 'black',
    },
    sub: {
      typo: 'P_Name_11_M',
      color: 'black',
    },
  },
};

export const Profile = ({
  size,
  image,
  name,
  subText,
  alliance = false,
}: ProfileProps) => {
  return (
    <ListRow
      leftImage={
        <ProfileImage
          size={PROFILE_SIZE[size].imageSize}
          imageUrl={image}
          alliance={alliance}
        />
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
      imageTextGap={size === 'big' ? 35 : 10}
      padding={0}
    />
  );
};
