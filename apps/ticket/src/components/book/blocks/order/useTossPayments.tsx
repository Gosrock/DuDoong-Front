import { getCount } from '@dudoong/utils';
import {
  ANONYMOUS,
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useEffect, useState } from 'react';

export interface TossPaymentWidgets {
  instance: PaymentWidgetInstance | null;
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
    if (totalPrice !== '0원') {
      if (!widgetInstance) {
        initWidget();
      } else {
        console.log(widgetInstance);
        widgetInstance.renderPaymentMethods(
          '#payment-method',
          getCount(totalPrice),
        );
        widgetInstance.renderAgreement('#agreement');
      }
    }
  }, [widgetInstance]);

  return {
    instance: widgetInstance,
  };
};

export default useTossPayments;
