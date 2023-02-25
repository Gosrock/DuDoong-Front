import { FlexBox, ListHeader, Spacing, Text } from '@dudoong/ui';

const ModalTip = () => {
  return (
    <>
      <ListHeader
        padding={[32, 0, 0, 0]}
        size={'listHeader_18'}
        title={'tip'}
        description={
          '아래와 같은 조합으로 검색을 하시면 더욱 정확한 결과가 검색됩니다.'
        }
      ></ListHeader>
      <Spacing size={32} />
      <FlexBox align={'flex-start'} direction={'column'}>
        <Text typo={'P_Text_16_M'} color={'gray_400'}>
          건물명
        </Text>
        <Text typo={'P_Text_16_M'} color={'main_400'}>
          예) 홍익대학교
        </Text>
        <Text typo={'P_Text_16_M'} color={'gray_400'}>
          도로명+건물번호
        </Text>
        <Text typo={'P_Text_16_M'} color={'main_400'}>
          예) 영동대로 502,제주 첨단로 242
        </Text>
        <Text typo={'P_Text_16_M'} color={'gray_400'}>
          지역명(동/리)+번지
        </Text>
        <Text typo={'P_Text_16_M'} color={'main_400'}>
          예) 삼평동 681,삼성동 168-6
        </Text>
        <Text typo={'P_Text_16_M'} color={'gray_400'}>
          지역명(동/리)+건물명(아파트명)
        </Text>
        <Text typo={'P_Text_16_M'} color={'main_400'}>
          예) 분당주공,강릉신도 브래뉴
        </Text>
        <Spacing size={12} />
      </FlexBox>
    </>
  );
};

export default ModalTip;
