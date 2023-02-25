import TextListRow from '@components/shared/TextListRow';
import { FlexBox, SyncLoader, TagButton } from '@dudoong/ui';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import { css } from '@emotion/react';
import { AccountInfo } from '@lib/apis/cart/cartType';
import type { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';

const SelectPayMethod = ({
  instance,
  isDudoong,
  account,
}: {
  instance: PaymentWidgetInstance | null;
  isDudoong: boolean;
  account?: AccountInfo;
}) => {
  const { setToast } = useToastify();
  const handleCopyAccount = () => {
    navigator.clipboard.writeText(account?.accountNumber || '');
    setToast({ comment: '계좌번호가 복사되었어요!' });
  };

  if (isDudoong) {
    return (
      <>
        <TextListRow
          left="입금 계좌"
          right={`(입금자명) ${account?.accountHolder}`}
        />
        <TextListRow
          left={`${account?.bankName} ${account?.accountNumber}`}
          right={
            <TagButton
              text="계좌 복사"
              color="secondary"
              size="md"
              onClick={handleCopyAccount}
            />
          }
          css={css``}
        />
      </>
    );
  } else {
    return (
      <>
        {instance ? (
          <>
            <div id="payment-method" />
            <div id="agreement" />
          </>
        ) : (
          <FlexBox align={'center'} css={{ marginTop: '30px' }}>
            <SyncLoader />
          </FlexBox>
        )}
      </>
    );
  }
};

export default SelectPayMethod;
