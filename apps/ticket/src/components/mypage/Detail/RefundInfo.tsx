import OverlayBox from '@components/shared/overlay/OverlayBox';
import {
  Button,
  ButtonSet,
  FlexBox,
  ListHeader,
  Padding,
  Spacing,
  Text,
  theme,
} from '@dudoong/ui';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import { parseDate } from '@dudoong/utils';

import styled from '@emotion/styled';
import { OrderApi } from '@lib/apis/order/OrderApi';
import type { RefundInfo } from '@lib/apis/order/orderType';
import useOverlay from '@lib/hooks/useOverlay';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InfoItem from './InfoItem';

const HostContactLink = styled(Link)`
  display: block;
  margin-top: 8px;
  text-decoration: underline;
  color: ${theme.palette.main_500};
`;

const RefundInfo = ({
  refund,
  eventId,
  isDudoongTicket,
  isFree,
  isPendingApproval,
}: {
  refund: RefundInfo;
  eventId: number;
  isDudoongTicket: boolean;
  isFree: boolean;
  isPendingApproval: boolean;
}) => {
  const { isOpen, openOverlay, closeOverlay } = useOverlay();
  const {
    query: { orderId },
    push,
  } = useRouter();
  const { setToast } = useToastify();
  const ticketRefundMutation = useMutation(OrderApi.POST_REFUND, {
    onSuccess: () => {
      push('/history');
      setToast({
        comment: isDudoongTicket
          ? '예매가 취소되었어요. 호스트에게 연락해 환불을 요청해주세요.'
          : '티켓이 정상적으로 취소되었습니다.',
      });
      closeOverlay();
    },

    onError: (error: any) => {
      const comment = error.response.data.reason;
      setToast({ comment: comment });
      closeOverlay();
    },
  });

  return (
    <Wrapper>
      <ListHeader title="예매취소" size="listHeader_18" />
      <InfoItem
        item="취소기한"
        value={
          typeof refund.startAt === 'string'
            ? `${parseDate(refund.startAt)[0]} ${parseDate(refund.startAt)[1]}`
            : '승인 대기중'
        }
        color="gray_400"
      />
      <Padding size={[10, 24, 30, 24]}>
        {isDudoongTicket ? (
          <ul>
            <li>취소기한 이전까지 수수료 없이 취소 가능합니다.</li>
            <li>공연 입장확인이 된 티켓이 있을경우 취소가 불가합니다.</li>
            <li>
              두둥티켓은 호스트 계좌로 입금한 티켓이라, 예매를 취소해도 자동으로
              환불되지 않습니다.
            </li>
            <li>
              환불 방법 : 예매취소 후 호스트에게 연락해 환불받을 계좌를
              알려주세요. 호스트는 지체 없이 환불해야 하며, 연락처는{' '}
              <Link href={`/events/${eventId}`}>공연 상세 페이지</Link>에서
              확인할 수 있습니다.
            </li>
            <li>
              호스트가 공연 상세에 별도의 환불 기준(예: 공연 당일 환불 불가)을
              안내했다면, 직접 취소할 때의 환불은 그 기준을 따르므로 환불이
              제한될 수 있습니다. 호스트가 주문을 거절·취소하거나 공연이 취소된
              경우에는 전액 환불됩니다.
            </li>
            {isPendingApproval && (
              <li>
                입금 후 승인 전에는 앱에서 취소할 수 없습니다. 승인이 늦어지거나
                취소를 원하면 호스트에게 연락해 주세요.
              </li>
            )}
            <li>
              호스트와 연락이 되지 않거나 환불이 늦어지면 두둥 카카오톡 채널로
              알려주세요.
            </li>
          </ul>
        ) : isFree ? (
          <ul>
            <li>취소기한 이전까지 취소할 수 있습니다.</li>
            <li>공연 입장확인이 된 티켓이 있을경우 취소가 불가합니다.</li>
            <li>취소 방법 : 티켓 예매 상세내역 {'>'} 예매취소</li>
          </ul>
        ) : (
          <ul>
            <li>취소기한 이전까지 수수료 없이 환불 가능합니다.</li>
            <li>공연 입장확인이 된 티켓이 있을경우 환불이 불가합니다.</li>
            <li>환불 방법 : 티켓 예매 상세내역 {'>'} 예매취소 </li>
            <li>
              환불 금액 : 당사에서는 주문에 대해 즉시 취소를 하고, 취소 금액에
              대한 입금은 카드사 영업일 기준 4~5일이 소요될 수 있습니다.
            </li>
          </ul>
        )}
      </Padding>
      <FlexBox>
        <Padding size={[20, 0, 20, 0]}>
          <Button
            varient="warn"
            disabled={!refund.availAble}
            onClick={openOverlay}
          >
            {'예매 취소하기'}
          </Button>
        </Padding>
      </FlexBox>
      <Spacing size={16} />

      <OverlayBox open={isOpen} onDismiss={closeOverlay}>
        <RefundConfirmation
          isDudoongTicket={isDudoongTicket}
          eventId={eventId}
          onDismiss={closeOverlay}
          onCancel={() =>
            typeof orderId === 'string' ? (
              ticketRefundMutation.mutate(orderId)
            ) : (
              <></>
            )
          }
        />
      </OverlayBox>
    </Wrapper>
  );
};

export default RefundInfo;

const Wrapper = styled.div`
  background-color: ${theme.palette.gray_100};
  ul {
    margin-top: 8px;
    margin-left: 24px;
    list-style: disc;
    ${({ theme }) => theme.typo.P_Text_14_R}
    color :${({ theme }) => theme.palette.gray_400};
  }
  a {
    text-decoration: underline;
  }
`;

const RefundConfirmation = ({
  isDudoongTicket,
  eventId,
  onDismiss,
  onCancel,
}: {
  isDudoongTicket: boolean;
  eventId: number;
  onDismiss: () => void;
  onCancel: () => void;
}) => {
  return (
    <>
      {isDudoongTicket ? (
        <ListHeader
          title="취소 후 직접 환불을 요청해야 해요"
          description={
            <Text typo="P_Text_16_M" color="gray_400">
              두둥티켓은 호스트 계좌로 입금한 티켓이라 자동으로 환불되지 않아요.
              예매를 취소한 뒤 호스트에게 연락해 환불받을 계좌를 알려주세요.
              호스트가 공연 상세에 별도 환불 기준을 안내했다면, 직접 취소할 때는
              그 기준에 따라 환불이 제한될 수 있어요.
              <HostContactLink href={`/events/${eventId}`} onClick={onDismiss}>
                호스트 연락처 확인하기
              </HostContactLink>
            </Text>
          }
          size="listHeader_18"
          gap={20}
        />
      ) : (
        <ListHeader
          title="예매를 취소할까요?"
          description="언제든 다시 예매할 수 있어요."
          size="listHeader_18"
          gap={20}
        />
      )}
      <ButtonSet varient="horizontal" padding={[20, 24, 20, 24]}>
        <Button varient="tertiary" onClick={onCancel}>
          {isDudoongTicket ? '확인했어요, 취소할게요' : '취소할래요'}
        </Button>
        <Button varient="secondary" onClick={onDismiss}>
          아니요
        </Button>
      </ButtonSet>
    </>
  );
};
