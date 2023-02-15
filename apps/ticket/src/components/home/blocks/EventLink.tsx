import { Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export interface EventLinkProps {
  eventName: string;
  date: string;
  eventId: number;
  posterImage: string;
}

const EventLink = ({
  eventName,
  date,
  eventId,
  posterImage,
}: EventLinkProps) => {
  return (
    <Wrapper href={`events/${eventId}`}>
      <Image
        src={'/sangsang.png'}
        alt=""
        className="poster"
        width={204}
        height={287}
      />
      <Text typo="P_Text_14_R" color="gray_400" as="p">
        {date}
      </Text>
      <Text typo="P_Header_18_SB" color="black" as="p">
        {eventName}
      </Text>
    </Wrapper>
  );
};

export default EventLink;

const Wrapper = styled(Link)`
  .poster {
    width: 100%;
    height: auto;
    background: ${({ theme }) => theme.palette.gray_300};
    border-radius: 12px;
    margin-bottom: 10px;
  }
`;
