import {
  FirstParagraph,
  LastParagraph,
  SecondParagraph,
  ThirdParagraph,
} from '@components/hosts/alliance/TextFile';
import TempSButtonSet from '@components/hosts/slack/TempSButtonSet';
import { ListHeader, Spacing } from '@dudoong/ui';

const Alliance = () => {
  return (
    <>
      <ListHeader
        padding={[32, 0, 20, 0]}
        size={'listHeader_24'}
        title={'제휴 기능'}
      />
      <FirstParagraph />
      <Spacing size={20} />
      <SecondParagraph />
      <Spacing size={40} />
      <ThirdParagraph />
      <Spacing size={16} />
      <ListHeader
        padding={[32, 0, 20, 0]}
        size={'listHeader_24'}
        title={'제휴 이전'}
      />
      <LastParagraph />
    </>
  );
};
export default Alliance;
