import { FlexBox, KeyOfTypo, ListRow, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { ReactComponent as Plus } from '@assets/Plus.svg';

export type NewPersonTypeKey = 'member' | 'host';

type NewPersonType = {
  [key in NewPersonTypeKey]: {
    text: string;
    subText: string;
  };
};

const NEW_PERSON_SET: NewPersonType = {
  member: {
    text: '멤버 초대하기',
    subText: '호스트의 새로운 멤버를 초대해보세요!',
  },
  host: {
    text: '호스트 만들기',
    subText: '새로운 호스트를 만들어보세요!',
  },
};

export type NewPersonSizeTypeKey = 'lg' | 'sm';

type NewPersonSizeType = {
  [key in NewPersonSizeTypeKey]: {
    textTypo: [KeyOfTypo, KeyOfTypo];
    imageTextGap: number;
    padding: [number, number];
    imageSize: number;
  };
};

const NEW_PERSON_SIZE_SET: NewPersonSizeType = {
  lg: {
    textTypo: ['G_Header_18_M', 'P_Text_16_R'],
    imageTextGap: 16,
    padding: [16, 16],
    imageSize: 60,
  },
  sm: {
    textTypo: ['G_Side_15_M', 'P_Text_14_R'],
    imageTextGap: 26,
    padding: [5, 5],
    imageSize: 50,
  },
};

interface NewPersonProps {
  onClick: () => void;
  type: NewPersonTypeKey;
  size: NewPersonSizeTypeKey;
}

const NewPerson = ({ onClick, type, size }: NewPersonProps) => {
  return (
    <ListRow
      onClick={onClick}
      padding={NEW_PERSON_SIZE_SET[size].padding}
      css={css`
        cursor: pointer;
        border-radius: 12px;
        &:hover {
          background-color: ${theme.palette.gray_100};
        }
      `}
      leftImage={<HostProfileImage size={size} />}
      text={NEW_PERSON_SET[type].text}
      subText={NEW_PERSON_SET[type].subText}
      textTypo={NEW_PERSON_SIZE_SET[size].textTypo}
      textColor={['black', 'gray_400']}
      imageTextGap={NEW_PERSON_SIZE_SET[size].imageTextGap}
    />
  );
};

export default NewPerson;

const HostProfileImage = ({ size }: { size: NewPersonSizeTypeKey }) => {
  return (
    <FlexBox
      align={'center'}
      css={css`
        background-color: ${theme.palette.gray_100};
        width: ${NEW_PERSON_SIZE_SET[size].imageSize}px;
        height: ${NEW_PERSON_SIZE_SET[size].imageSize}px;
        border-radius: 50%;
        border: 1px solid ${theme.palette.black};
        box-sizing: border-box;
      `}
    >
      <Plus />
    </FlexBox>
  );
};
