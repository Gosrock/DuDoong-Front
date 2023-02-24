import styled from '@emotion/styled';
import { theme, ListHeader, Input, Divider, Spacing } from '@dudoong/ui';

const OptionPreview = () => {
  return (
    <div>
      <ListHeader
        padding={[32, 0, 12, 0]}
        title={'미리보기'}
        size={'listHeader_18'}
      />
      <Wrapper>
        <ListHeader
          padding={[0, 12, 0, 0]}
          gap={12}
          title={'1. 주관식 설문 예시'}
          size="listHeader_18"
          description={'티켓 구매자의 학번을 입력해주세요'}
        />
        <Divider line={true} />
        <Spacing size={6} />
        <Input
          disabled={false}
          placeholder="최대 100글자까지 쓸 수 있어요"
        ></Input>
      </Wrapper>
    </div>
  );
};

export default OptionPreview;

const Wrapper = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
