import { Padding, TextArea } from '@dudoong/ui';
import type { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import type { OptionResponse } from '@lib/apis/ticket/ticketType';
import { Dispatch, SetStateAction } from 'react';

interface SubjectiveProps {
  options: OptionResponse[];
  setAnswer: Dispatch<SetStateAction<AddCartOptionAnswer>>;
}

const Subjective = ({ options, setAnswer }: SubjectiveProps) => {
  return (
    <Padding>
      <TextArea
        maxLength={100}
        placeholder="최대 100글자까지 쓸 수 있어요."
        onChange={(e) =>
          setAnswer({ optionId: options[0].optionId, answer: e.target.value })
        }
      />
    </Padding>
  );
};
export default Subjective;
