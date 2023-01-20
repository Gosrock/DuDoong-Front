import { Accordion, FlexBox, ListRow, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { CartItemResponse, OptionAnswer } from '@lib/apis/cart/cartType';

const ItemPreview = ({ item }: { item: CartItemResponse }) => {
  console.log(item);
  return (
    <Accordion
      title={item.name}
      content={<PreviewContent answers={item.answers} />}
    />
  );
};

export default ItemPreview;

const PreviewContent = ({ answers }: { answers: OptionAnswer[] }) => {
  return (
    <>
      {answers.map((answer, i) => (
        <Answer
          key={answer.questionName}
          padding={[12, 24]}
          text={
            <Text typo="Text_16" color="gray_500">
              {i + 1}. {answer.questionName}
            </Text>
          }
          subText={
            <Text typo="Text_14" color="gray_400">
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
