import { Button, FlexBox, Input, ListHeader, Spacing, Text } from '@dudoong/ui';
import { useInputs } from '@dudoong/utils';
import { css } from '@emotion/react';
import HostApi from '@lib/apis/host/HostApi';
import type { SlackRequest } from '@lib/apis/host/hostType';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Slack = () => {
  const { hostId } = useParams();

  const [form, onChange] = useInputs<SlackRequest>({ slackUrl: '' });
  const { mutate } = useMutation(() => HostApi.PATCH_HOST_SLACK(hostId, form), {
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleSlack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(typeof e);
    mutate();
  };

  return (
    <>
      <div
        css={css`
          white-space: pre-wrap;
        `}
      >
        <ListHeader
          padding={[32, 0, 20, 0]}
          size={'listHeader_24'}
          title={'슬랙 알림 설정'}
          description={
            '아래 입력창에 슬랙 url을 입력하면 해당 슬랙의 멤버들에게\n슬랙 알림을 통해 두둥의 공연 상황을 공유할 수 있어요.'
          }
        />
      </div>

      <Spacing size={16} />

      <form onSubmit={handleSlack}>
        <FlexBox align={'flex-start'} justify={'flex-start'} gap={20}>
          <Input
            name="slackUrl"
            onChange={onChange}
            placeholder={'slack URL 입력'}
            width={398}
          ></Input>
          <Button
            width={139}
            varient="primary"
            css={css`
              height: 48px;
              border: none;
            `}
          >
            공유하기
          </Button>
        </FlexBox>
      </form>
    </>
  );
};
export default Slack;
