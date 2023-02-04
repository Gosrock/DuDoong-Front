import BorderBox from '@components/shared/layout/BorderBox';
import HostProfiles from './HostProfiles';
import NewHost from './NewHost';
import { Spacing, Button } from '@dudoong/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstStep = () => {
  const [selectedHostId, setSelectedHostId] = useState<number>(-1);
  const navigate = useNavigate();

  return (
    <>
      <BorderBox padding={[36, 60]}>
        <NewHost />
        <HostProfiles hostId={selectedHostId} setHostId={setSelectedHostId} />
      </BorderBox>
      <Spacing size={100} />
      <Button
        varient="primary"
        fullWidth={true}
        onClick={() => {
          navigate('/new/events/2', {
            state: {
              hostId: selectedHostId,
            },
          });
        }}
        disabled={selectedHostId === -1}
      >
        호스트 만들기
      </Button>
    </>
  );
};

export default FirstStep;
