import { Accordion, ListRow, Tag, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import {
  CartItemResponse,
  OptionAnswer,
  OptionGroupType,
} from '@lib/apis/cart/cartType';

const ItemPreview = ({ item }: { item: CartItemResponse }) => {
  const getOptionTypeCount = (arg: OptionGroupType) =>
    item.answers.filter((v) => v.optionGroupType === arg).length;

  return (
    <Accordion
      rightElement={
        item.eachOptionPrice !== '0원' && (
          <Tag
            size="md"
            color="main"
            text={`각 티켓당 +${item.eachOptionPrice}`}
          />
        )
      }
      title={item.name}
      content={<PreviewContent answers={item.answers} />}
      contentHeight={
        getOptionTypeCount('Y/N') * 80 + getOptionTypeCount('주관식') * 112
      }
      disabled={item.answers.length === 0}
    />
  );
};

export default ItemPreview;

const PreviewContent = ({ answers }: { answers: OptionAnswer[] }) => {
  return (
    <>
      {answers.map((answer, i) => (
        <Answer
          key={`${answer.questionName}-${i}`}
          padding={[12, 24]}
          text={
            <Text typo="P_Text_14_M" color="gray_500">
              {i + 1}. {answer.questionName}
            </Text>
          }
          subText={
            <Text typo="P_Text_14_R" color="gray_400">
              {answer.answer}{' '}
              {answer.additionalPrice !== '0원' &&
                `(+${answer.additionalPrice})`}
            </Text>
          }
        />
      ))}
    </>
  );
};

const Answer = styled(ListRow)`
  background-color: ${({ theme }) => theme.palette.gray_100};
`;
