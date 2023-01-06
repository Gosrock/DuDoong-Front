import { RoundBlock } from '../../layout/RoundBlock';
import { KeyOfPalette, KeyOfTypo } from '../../theme';

const TEXT_PROPS = {
  // 확인 버튼
  confirm: {
    textType: 'Text_12',
    textColor: 'white',
    color: 'main_400',
    text: '확인',
  },
  // 삭제 버튼
  delete: {
    textType: 'Text_12',
    textColor: 'white',
    color: 'red_200',
    text: '삭제',
  },
  // 승인 대기 뱃지
  pending: {
    textType: 'Text_12',
    textColor: 'red_200',
    color: 'red_100',
    text: '승인 대기',
  },
  // 관람 예정 뱃지
  scheduled: {
    textType: 'Text_12',
    textColor: 'main_500',
    color: 'main_100',
    text: '관람 예정',
  },
  // 재고 뱃지
  stock: {
    textType: 'Text_12',
    textColor: 'gray_500',
    color: 'gray_200',
    text: '재고 ',
  },
  // +1000 뱃지
  plus: {
    textType: 'Text_12',
    textColor: 'gray_500',
    color: 'gray_200',
    text: '+ 1000',
  },
};

export interface BadgeProps {
  content: 'confirm' | 'delete' | 'pending' | 'scheduled' | 'stock' | 'plus';
  stock?: string;
}
const Badge = ({ content, stock }: BadgeProps) => {
  const { textType, textColor, text, backgroundColor } = initVariable({
    content,
    stock,
  });
  return (
    <RoundBlock
      content={text}
      color={backgroundColor as KeyOfPalette}
      radius={8}
      textType={textType as KeyOfTypo}
      textColor={textColor as KeyOfPalette}
    />
  );
};

interface initVariableProps {
  content: 'confirm' | 'delete' | 'pending' | 'scheduled' | 'stock' | 'plus';
  stock?: string;
}

const initVariable = ({ content, stock }: initVariableProps) => {
  const textType = TEXT_PROPS[content].textType;
  const textColor = TEXT_PROPS[content].textColor;
  const text =
    content === 'stock'
      ? TEXT_PROPS[content].text + stock
      : TEXT_PROPS[content].text;
  const backgroundColor = TEXT_PROPS[content].color;
  return { textType, textColor, text, backgroundColor };
};
