import { FlexBox, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ComponentProps, useEffect, useRef } from 'react';
import XLg from '@assets/close.svg';
import TalkInput from './TalkInput';
import TalkList from './TalkList';

interface TalkProps extends ComponentProps<'div'> {
  eventName: string;
  onClose: () => void;
}

const TalkOverlay = ({ eventName, onClose }: TalkProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const {
    query: { eventId },
  } = useRouter();

  useEffect(() => {
    console.log(listRef.current);
  }, [listRef]);

  return (
    <Wrapper>
      <Header>
        <Text typo="P_Text_18_M" as="div">
          응원톡 - {eventName}
        </Text>
        <Close onClick={onClose} />
      </Header>
      <TalkList ref={listRef} />
      <TalkInput eventId={eventId as string} listRef={listRef} />
    </Wrapper>
  );
};

export default TalkOverlay;

const Wrapper = styled.div``;
const Header = styled(FlexBox)`
  height: 48px;
  padding-inline: 80px;
  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Close = styled(XLg)`
  position: absolute;
  right: 24px;

  width: 16px;
  height: 16px;

  cursor: pointer;
`;
