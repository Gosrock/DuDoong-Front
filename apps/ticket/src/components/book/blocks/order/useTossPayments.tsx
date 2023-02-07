import { FlexBox, SyncLoader } from '@dudoong/ui';
import { getCount } from '@dudoong/utils';
import {
  ANONYMOUS,
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useEffect, useState } from 'react';

export interface TossPaymentWidgets {
  instance: PaymentWidgetInstance | null;
  Payment: () => JSX.Element;
}

const useTossPayments = (totalPrice: string): TossPaymentWidgets => {
  const [widgetInstance, setWidgetInstance] =
    useState<PaymentWidgetInstance | null>(null);
  const initWidget = async () => {
    const paymentWidget = await loadPaymentWidget(
      process.env.NEXT_PUBLIC_CLIENT_KEY!,
      ANONYMOUS,
    );
    setWidgetInstance(paymentWidget);
  };

  useEffect(() => {
    if (!widgetInstance) {
      initWidget();
    } else {
      console.log(widgetInstance);
      widgetInstance.renderPaymentMethods(
        '#payment-method',
        getCount(totalPrice),
      );
    }
  }, [widgetInstance]);

  return {
    instance: widgetInstance,
    Payment: () =>
      widgetInstance ? (
        <div id="payment-method" />
      ) : (
        <FlexBox align={'center'} css={{ marginTop: '30px' }}>
          <SyncLoader />
        </FlexBox>
      ),
  };
};

export default useTossPayments;
