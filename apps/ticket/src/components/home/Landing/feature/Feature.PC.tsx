import FeaturePCImage from '@assets/landing-renewal/feature-pc.svg';
import { FlexBox, Spacing } from '@dudoong/ui';
import { ImpressionStartSetHeader } from '../ImpressionStartSetHeader';

export const FeaturePC = () => {
  return (
    <FlexBox direction={'column'}>
      <FeaturePCImage />
      <ImpressionStartSetHeader color="white">
        <Spacing size={180} />
      </ImpressionStartSetHeader>
    </FlexBox>
  );
};
