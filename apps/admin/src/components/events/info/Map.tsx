import { FlexBox, Input, ListHeader } from '@dudoong/ui';

//지도
const Map = () => {
  return (
    <>
      <FlexBox align={'normal'} direction={'column'}>
        <ListHeader title={'공연 장소'} size={'listHeader_18'} />
        <Input placeholder={'최대'} width={398} />
      </FlexBox>
    </>
  );
};

export default Map;
