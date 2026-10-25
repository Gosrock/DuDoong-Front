import {
  Button,
  ButtonSet,
  ListHeader,
  ListRow,
  Padding,
  RoundBlock,
  TagButton,
} from '@dudoong/ui';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import { checkName } from '@dudoong/utils';
import styled from '@emotion/styled';
import { AccountInfo } from '@lib/apis/cart/cartType';
import type { CreateOrderRequest } from '@lib/apis/order/orderType';
import useOrderMutation from './useOrderMutation';

const AccountInfoSection = ({
  accountInfo,
  orderPayload,
  closeOverlay,
  name,
}: {
  accountInfo: AccountInfo;
  orderPayload: CreateOrderRequest;
  closeOverlay: () => void;
  name: string;
}) => {
  const { dudoongMutate } = useOrderMutation(null, closeOverlay);
  const { setToast } = useToastify();
  const handleDudoongOrder = () => {
    dudoongMutate({ ...orderPayload, dudoongTicketNoticeConfirmed: true });
  };
  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountInfo?.accountNumber);
    setToast({ comment: '계좌번호가 복사되었어요!', type: 'info' });
  };

  return (
    <>
      <ListHeader
        size="listHeader_18"
        title={'입금 계좌 확인'}
        description={`입금자명이 카카오 닉네임과 다르면 관리자 승인이 어려울 수 있어요. (입금자명: ${name})`}
      />
      <Padding size={[0, 20, 0, 20]}>
        <RoundBlock background="gray_100" padding={0}>
          <ListRow
            text={`${accountInfo.bankName} ${accountInfo.accountNumber}`}
            subText={`(예금주) ${accountInfo.accountHolder}`}
            textTypo={['P_Text_16_M', 'P_Text_14_M']}
            textColor={['black', 'gray_500']}
            rightElement={
              <TagButton
                text="계좌 복사"
                color="secondary"
                size="md"
                onClick={handleCopyAccount}
              />
            }
            textGap={0}
          />
        </RoundBlock>
        <DudoongTicketConsent>
          <li>
            두둥티켓 대금은 호스트에게 직접 지급되며, 두둥은 대금을 받지
            않습니다.
          </li>
          <li>
            예매를 취소해도 자동으로 환불되지 않으며, 환불은 호스트가 직접
            합니다.
          </li>
          <li>
            호스트가 공연 상세에 별도 환불 기준(예: 공연 당일 환불 불가)을
            안내했다면, 직접 취소할 때의 환불은 그 기준이 우선합니다.
          </li>
          <li>
            &apos;입금했어요&apos;를 누르면 위 내용에 동의한 것으로 봅니다.
          </li>
        </DudoongTicketConsent>
      </Padding>
      <ButtonSet varient="horizontal">
        <Button fullWidth varient="tertiary" onClick={closeOverlay}>
          다음에 할래요
        </Button>
        <Button fullWidth onClick={handleDudoongOrder}>
          입금했어요
        </Button>
      </ButtonSet>
    </>
  );
};
export default AccountInfoSection;

const DudoongTicketConsent = styled.ul`
  margin-top: 12px;
  padding-left: 18px;
  list-style: disc;
  ${({ theme }) => theme.typo.P_Text_12_R}
  color: ${({ theme }) => theme.palette.gray_500};
`;
