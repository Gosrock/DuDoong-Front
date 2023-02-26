import {
  FlexBox,
  ListHeader,
  ListRow,
  Spacing,
  Tag,
  TagColorKey,
  Text,
  theme,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import { OrderListResponse, StageType } from '@lib/apis/order/orderType';

import Image from 'next/image';
import { useRouter } from 'next/router';

type TagColorType = {
  [key in StageType]: TagColorKey;
};

const TAG_COLOR: TagColorType = {
  승인대기: 'red',
  입장완료: 'main',
  관람예정: 'main',
  입장중: 'main',
  취소됨: 'mono',
};

const OrderItem = (prop: OrderListResponse) => {
  const router = useRouter();
  return (
    <Wrapper onClick={() => router.push(`/ticket/${prop.orderUuid}`)}>
      <Image
        src={prop.eventProfile.posterImage}
        alt=""
        className="poster"
        width={120}
        height={166}
      />
      <ContentWrapper>
        <FlexBox align="flex-start" direction="column" gap={5}>
          <Tag text={prop.stage} color={TAG_COLOR[prop.stage]} size={'sm'} />
          <Text className="title" typo="P_Text_16_M">
            {prop.eventProfile.name}
          </Text>
        </FlexBox>
        <ListRow
          text={prop.eventProfile.startAt}
          textTypo={'P_Text_12_M'}
          subText={`${prop.itemName} ${prop.totalQuantity}매 | 주문번호 ${prop.orderNo}`}
          padding={0}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

export default OrderItem;

const Wrapper = styled.div`
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  width: 100%;
  max-width: 440px;
  height: 166px;

  overflow: hidden;

  display: flex;
  justify-content: space-between;

  cursor: pointer;

  transform: scale(1);
  transition: all 0.1s ease-out;
  filter: drop-shadow(3px 4px 7px rgba(0, 0, 0, 0.15));

  :active {
    transform: scale(0.99);
    filter: none;
  }

  .poster {
    width: 120px;
    height: 100%;

    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  padding: 15px 15px 10px 15px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;

  .title {
    word-break: break-all;
    word-wrap: break-word;
    white-space: -moz-pre-wrap;
    white-space: pre-wrap;
  }
`;
