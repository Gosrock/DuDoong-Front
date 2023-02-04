import { Divider, FlexBox, ListRow, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { HostProfileResponse } from '@lib/apis/host/hostType';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Plus } from '../../../../assets/Plus.svg';

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
      padding={[5, 0]}
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
      textTypo={['G_Side_15_M', 'P_Text_14_R']}
      textColor={['black', 'gray_400']}
      imageTextGap={26}
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
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid ${theme.palette.black};
      `}
    >
      <Plus />
    </FlexBox>
  );
};
