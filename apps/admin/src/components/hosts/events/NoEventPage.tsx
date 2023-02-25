import { DudoongOne } from '@assets/stickers';
import { Button, FlexBox, Padding, Spacing, Text } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';
const NoEventPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/new/events/1`);
  };

  return (
    <>
      <Spacing size={72} />
      <FlexBox align={'center'} direction={'column'}>
        <DudoongOne />
        <Padding size={[24, 124.5, 24, 124.5]}>
          <Text typo="Text_16" color="gray_500">
            두둥!아무것도 없네요
          </Text>
        </Padding>
        <Padding size={[20, 24, 20, 24]}>
          <Button width={342} onClick={handleClick}>
            공연 만들기
          </Button>
        </Padding>
      </FlexBox>
    </>
  );
};

export default NoEventPage;
