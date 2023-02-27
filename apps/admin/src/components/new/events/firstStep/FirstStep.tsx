import HostButtons from './HostButtons';
import NewHost from './NewHost';
import { Spacing, Button, BorderBox } from '@dudoong/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FirstStepProps {
  setButtonInfo: (props: any) => void;
}

const FirstStep = ({ setButtonInfo }: FirstStepProps) => {
  const [selectedHostId, setSelectedHostId] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setButtonInfo({
      firstHandler: () => {
        navigate('/new/events/2', {
          state: {
            hostId: selectedHostId,
          },
          replace: true,
        });
      },
      firstDisable: selectedHostId === null,
    });
  }, [selectedHostId]);

  return (
    <>
      <BorderBox padding={[36, 60]}>
        <NewHost />
        <HostButtons
          key={selectedHostId}
          hostId={selectedHostId}
          setHostId={setSelectedHostId}
        ></HostButtons>
      </BorderBox>
    </>
  );
};

export default FirstStep;
