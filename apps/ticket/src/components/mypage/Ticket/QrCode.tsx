import { IssuedTicketInfo } from '@lib/apis/order/orderType';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  margin: 8,
  dotsOptions: {
    color: 'black',
    type: 'rounded',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  backgroundOptions: { color: '#f8f8fa' },
  imageOptions: {
    crossOrigin: 'anonymous',
  },
});

const Qrcode = ({ ticket }: { ticket: IssuedTicketInfo }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: ticket.uuid,
    });
  }, []);

  return <div ref={ref} />;
};

export default Qrcode;
