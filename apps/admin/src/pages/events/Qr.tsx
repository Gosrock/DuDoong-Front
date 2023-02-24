import { useState } from 'react';
import NormalQrScreen from '@components/events/qr/NormalQrScreen';
import FullQrScreen from '@components/events/qr/FullQrScreen';

const Qr = () => {
  const [newView, setNewView] = useState<boolean>(false);
  return newView ? (
    <FullQrScreen setNewView={setNewView} />
  ) : (
    <NormalQrScreen setNewView={setNewView} />
  );
};
export default Qr;
