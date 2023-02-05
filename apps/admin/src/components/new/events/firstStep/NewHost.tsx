import { FlexBox, ListRow, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Plus } from '@assets/Plus.svg';

const NewHost = () => {
  const navigate = useNavigate();

  return (
    <ListRow
      onClick={() => {
        navigate('/new/hosts', {
          state: {
            returnUrl: '/new/events/2',
          },
        });
      }}
      padding={[16, 16]}
      css={css`
        cursor: pointer;
        border-radius: 12px;
        &:hover {
          background-color: ${theme.palette.gray_100};
        }
      `}
      leftImage={<HostProfileImage />}
      text={'멤버 초대하기'}
      subText={'호스트의 새로운 멤버를 초대해보세요!'}
      textTypo={['P_Text_18_M', 'P_Text_16_R']}
      textColor={['black', 'gray_400']}
      imageTextGap={16}
    />
  );
};

export default NewHost;

const HostProfileImage = () => {
  return (
    <FlexBox
      align={'center'}
      css={css`
        background-color: ${theme.palette.gray_100};
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid ${theme.palette.black};
      `}
    >
      <Plus />
    </FlexBox>
  );
};
