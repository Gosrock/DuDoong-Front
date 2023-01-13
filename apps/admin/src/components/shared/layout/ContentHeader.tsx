import { FlexBox, Padding } from '@dudoong/ui';
import styled from '@emotion/styled';
import { Text } from '@dudoong/ui';

interface ContentHeaderProps {
  firstText?: string;
  secondText: string;
  thirdText?: string | null;
}

export const ContentHeader = ({
  firstText = '공연',
  secondText,
  thirdText = null,
}: ContentHeaderProps) => {
  const isThirdExist = !!thirdText;
  return (
    <Padding size={[40, 40, 0, 40]}>
      <FlexBox align={'center'} justify={'flex-start'}>
        <Text typo="Text_14" color="gray_400">
          {firstText}
        </Text>
        <SlashWrapper size={[0, 8]}>
          <Text typo="Text_14" color="gray_400">
            /
          </Text>
        </SlashWrapper>
        <Text typo="Text_14" color={isThirdExist ? 'gray_400' : 'gray_500'}>
          {secondText}
        </Text>
        {isThirdExist ? (
          <>
            <SlashWrapper size={[0, 8]}>
              <Text typo="Text_14" color="gray_400">
                /
              </Text>
            </SlashWrapper>
            <Text typo="Text_14" color={'gray_500'}>
              {thirdText}
            </Text>
          </>
        ) : null}
      </FlexBox>
    </Padding>
  );
};

const SlashWrapper = styled(Padding)``;
