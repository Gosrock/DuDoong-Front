import type {
  IssuedTicketInfo,
  IssuedTicketStatus,
} from '@lib/apis/order/orderType';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';

const qrCode = new QRCodeStyling({
  width: 178,
  height: 178,
  margin: 0,
  dotsOptions: {
    color: 'black',
    type: 'rounded',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  backgroundOptions: { color: '#ffffff' },
  imageOptions: {
    crossOrigin: 'anonymous',
  },
});

const Qrcode = ({
  ticket,
  status,
}: {
  ticket: IssuedTicketInfo;
  status: IssuedTicketStatus;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: ticket.uuid,
    });
    if (status !== '입장 전') {
      qrCode.update({
        cornersDotOptions: { color: '#e3e4e8' },
        cornersSquareOptions: { color: '#e3e4e8' },
        dotsOptions: { color: '#e3e4e8' },
      });
    }
  }, [ticket]);

  return <div ref={ref} />;
};

export default Qrcode;
