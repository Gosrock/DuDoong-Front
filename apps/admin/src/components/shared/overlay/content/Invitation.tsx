import {
  Divider,
  ListHeader,
  Spacing,
  Text,
  FlexBox,
  Button,
  BorderBox,
  Input,
  Popup,
  theme,
  ChevronDown,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HostApi from '@lib/apis/host/HostApi';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { HostDetailResponse } from '@lib/apis/host/hostType';

interface PostEventProps {
  closeOverlay: () => void;
}
type memberTypes = '일반멤버' | '매니저';

const Invitation = ({ closeOverlay }: PostEventProps) => {
  const hostId = useLocation().pathname.split('/')[2];
  const [memberType, setMemberType] = useState<memberTypes>('일반멤버');
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  // 멤버 초대 api
  const queryClient = useQueryClient();
  const postHostInviteMutation = useMutation(HostApi.POST_HOST_INVITE, {
    onSuccess: (data: HostDetailResponse) => {
      console.log('POST_HOST_INVITE : ', data);
      queryClient.invalidateQueries({ queryKey: ['hostDetail', hostId] });
      closeOverlay();
    },
  });

  // 멤버 초대 핸들러
  const inviteMemberHandler = (data: any) => {
    postHostInviteMutation.mutate({
      hostId: hostId,
      payload: {
        email: data.email,
        role: roleConverter({ role: memberType }),
      },
    });
  };

  useEffect(() => {
    if (formState.isValid) setButtonDisable(false);
    else setButtonDisable(true);
  }, [formState.isValid]);

  return (
    <Wrapper>
      <ListHeader size="listHeader_20" title={'초대'} padding={0} />
      <Divider line={true} height={24} />
      <BorderBox
        padding={[0, 16, 0, 0]}
        css={css`
          background-color: ${theme.palette.gray_100};
        `}
      >
        <FlexBox>
          <Input
            styles={css`
              background: none;
            `}
            {...register('email', {
              required: true,
              pattern:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            })}
            placeholder="E-mail"
          />
          <RoleSelector memberType={memberType} setMemberType={setMemberType} />
        </FlexBox>
      </BorderBox>
      <Spacing size={12} />
      <Text typo="P_Text_16_R" color="gray_500">
        멤버 초대 시 상대방 승인 후 멤버관리 목록에 표시됩니다.
      </Text>
      <Spacing size={36} />
      <FlexBox align={'center'} justify={'end'} gap={10}>
        <Button
          varient="tertiary"
          onClick={closeOverlay}
          css={css`
            width: 108px;
            height: 54px;
          `}
        >
          취소
        </Button>
        <Button
          varient="primary"
          onClick={handleSubmit(inviteMemberHandler)}
          css={css`
            width: 194px;
            height: 54px;
          `}
          disabled={buttonDisable}
        >
          초대하기
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default Invitation;

interface RoleSelectorProps {
  memberType: '일반멤버' | '매니저';
  setMemberType: React.Dispatch<React.SetStateAction<memberTypes>>;
}

const RoleSelector = ({ memberType, setMemberType }: RoleSelectorProps) => {
  return (
    <FlexBox
      justify={'flex-end'}
      css={css`
        width: 95px;
      `}
    >
      <Popup
        renderElement={
          <SearchOptionDropdown>
            {memberType === '일반멤버' ? '일반멤버' : '매니저'}
            <ChevronDown width={16} height={16} />
          </SearchOptionDropdown>
        }
        options={[
          {
            title: '일반멤버',
            onClick: () => {
              setMemberType('일반멤버');
            },
          },
          {
            title: '매니저',
            onClick: () => {
              setMemberType('매니저');
            },
          },
        ]}
      />
    </FlexBox>
  );
};

const roleConverter = ({ role }: { role: memberTypes }) => {
  if (role === '매니저') return 'MANAGER';
  else return 'GUEST';
};

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
`;

const SearchOptionDropdown = styled.div`
  ${({ theme }) => theme.typo.P_Text_14_M}
  color: ${({ theme }) => theme.palette.main_500};
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;
