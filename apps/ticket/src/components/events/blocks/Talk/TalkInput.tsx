import styled from '@emotion/styled';
import { CommentApi } from '@lib/apis/comment/CommentApi';
import { authState } from '@store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';
import Send from '@assets/send.svg';
import { useInput } from '@dudoong/utils';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useRouter } from 'next/router';
import { ForwardedRef, RefObject } from 'react';

const TalkInput = ({
  eventId,
  listRef,
}: {
  eventId: string;
  listRef: RefObject<HTMLDivElement>;
}) => {
  const { userProfile, isAuthenticated } = useRecoilValue(authState);
  const [value, onChange, reset] = useInput('');
  const queryClient = useQueryClient();

  const { mutate } = useMutation(CommentApi.POST_COMMENTS, {
    onSuccess: () => {
      queryClient.invalidateQueries(['talk', eventId]);
      reset();
      listRef.current && listRef.current.scrollTo(0, 0);
    },
  });
  const { openGlobalOverlay } = useGlobalOverlay();
  const router = useRouter();
  const setRequestData = (value: string) => {
    const [splited] = value.trim().split(/\r\n|\r|\n|\s/);
    if (splited[0] === '#') {
      const content = value.trim().replace(splited, '').trim();
      const name = splited.replace('#', '').trim();
      return { nickName: name.substring(0, 10), content: content };
    } else {
      return { nickName: userProfile?.name || '', content: value.trim() };
    }
  };

  const handleSendTalk = () => {
    if (isAuthenticated) {
      const payload = setRequestData(value);
      mutate({ eventId, payload });
    } else {
      openGlobalOverlay({
        content: 'login',
        props: { redirect: router.asPath },
      });
    }
  };

  return (
    <Wrapper>
      <TextArea
        placeholder="맨 앞에 ‘#별명’을 붙이면 익명으로 남길 수 있어요. 별명은 최대 10자, 내용은 150자까지 가능해요."
        value={value}
        onChange={onChange}
        name={'form'}
      />
      <SendButton
        onClick={handleSendTalk}
        disabled={setRequestData(value).content.length === 0}
      >
        <Send />
      </SendButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  padding: 16px 24px;
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  border-top: 1px solid ${({ theme }) => theme.palette.gray_300};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.typo.P_Text_14_R}
  overflow-y: auto;
  resize: none;
  background: none;
  padding: 0;
  border: 0;
  &::placeholder {
    ${({ theme }) => theme.typo.P_Text_14_R}
    color: ${({ theme }) => theme.palette.gray_400};
  }
`;
const SendButton = styled.button`
  color: ${({ theme }) => theme.palette.point_mint};

  &:disabled {
    color: ${({ theme }) => theme.palette.gray_200};
    cursor: default;
  }
`;

export default TalkInput;
