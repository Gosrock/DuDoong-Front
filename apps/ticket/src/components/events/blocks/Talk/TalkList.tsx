import { media } from '@dudoong/ui';
import { useInfiniteQueries, useScreenHeight } from '@dudoong/utils';
import styled from '@emotion/styled';
import { CommentApi } from '@lib/apis/comment/CommentApi';
import { RetrieveCommentResponse } from '@lib/apis/comment/commentType';
import { useRouter } from 'next/router';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import TalkBubble from './TalkBubble';

interface TalkListProps extends React.ComponentProps<'div'> {
  isOpen: boolean;
}

const TalkList = (
  { isOpen }: TalkListProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const router = useRouter();
  const { eventId } = router.query as { eventId: string };
  const { infiniteListElement } = useInfiniteQueries<RetrieveCommentResponse>(
    ['talk', eventId],
    ({ pageParam = 0 }) =>
      CommentApi.GET_COMMENTS({
        id: eventId,
        pageParam,
      }),
    TalkBubble,
    { refetchInterval: 2000, enabled: isOpen },
  );

  useScreenHeight();

  return <Wrapper ref={ref}>{infiniteListElement}</Wrapper>;
};

const Wrapper = styled.div`
  height: 500px;
  padding: 20px 8px 0px 24px;

  ::-webkit-scrollbar-thumb {
    border: solid transparent;
    background-clip: padding-box;
    border-radius: 7px;
    box-shadow: rgb(0 0 0 / 11%) 0px 0px 100px inset;
  }
  :-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar {
    width: 14px;
  }

  ${media.mobile} {
    height: calc(var(--vh) * 100 - 168px);
    padding: 20px 16px 0px 16px;
  }
  background-color: ${({ theme }) => theme.palette.gray_200};
  & > div {
    & > div {
      margin-bottom: 12px;
    }
  }
  box-sizing: border-box;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;
export default forwardRef(TalkList);
