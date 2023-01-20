import { ListHeader, Text, theme } from '@dudoong/ui';

interface BookHeaderProps {
  title: '옵션 선택하기' | '결제하기';
  description: [string, string, number];
}

/**
 *
 * @param title 헤더 제목
 * @param description [공연 이름, 티켓 이름, 티켓 매수 ]
 */
const BookHeader = ({ title, description }: BookHeaderProps) => {
  return (
    <ListHeader
      title={title}
      size={'listHeader_20'}
      description={
        <Text typo="Text_14" color="gray_500">
          {description[0]}
          <span css={{ color: `${theme.palette.main_500}` }}>
            {' '}
            {description[1]} 총 {description[2]}매
          </span>
        </Text>
      }
    />
  );
};

export default BookHeader;
