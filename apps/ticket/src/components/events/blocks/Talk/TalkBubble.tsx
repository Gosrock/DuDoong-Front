import getTimeForToday from '@dudoong/utils/src/utils/getTimeForToday';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RetrieveCommentResponse } from '@lib/apis/comment/commentType';
import React from 'react';

const TalkBubble = ({ commentInfo, isMine }: RetrieveCommentResponse) => {
  return (
    <Wrapper isMine={isMine}>
      <Bubble isMine={isMine}>
        <Head isMine={isMine}>
          <p>from. {commentInfo.nickName}</p>
          <p>{getTimeForToday(commentInfo.createdAt)}</p>
        </Head>
        <p>{commentInfo.content}</p>
      </Bubble>
    </Wrapper>
  );
};
const Wrapper = styled.div<{ isMine: boolean }>`
  width: 100%;
  display: flex;
  ${({ isMine }) =>
    isMine
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: flex-start;
        `}
`;
const Bubble = styled.div<{ isMine: boolean }>`
  display: inline-block;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.palette.black};
  background-color: ${({ theme, isMine }) =>
    isMine ? theme.palette.point_mint : theme.palette.white};

  & > p {
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    ${({ theme }) => theme.typo.P_Text_14_R};
    line-height: 150%;
    color: ${({ theme }) => theme.palette.black};
  }

  ${({ isMine }) =>
    isMine
      ? css`
          border-radius: 16px 2px 16px 16px;
          margin-left: 32px;
        `
      : css`
          border-radius: 2px 16px 16px 16px;
          margin-right: 32px;
        `}
`;
const Head = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;
  & > p:first-of-type {
    ${({ theme }) => theme.typo.P_Text_12_SB};
    color: ${({ theme }) => theme.palette.main_500};
  }
  & > p:last-of-type {
    ${({ theme }) => theme.typo.P_Text_12_M};
    color: ${({ theme, isMine }) =>
      isMine ? theme.palette.main_500 : theme.palette.gray_300};
  }
`;

export default React.memo(TalkBubble);
