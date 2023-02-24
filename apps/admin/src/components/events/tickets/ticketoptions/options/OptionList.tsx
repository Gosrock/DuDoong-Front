import { TicketDetailResponse } from '@lib/apis/ticket/ticketType';
import { ListHeader, theme, Spacing, FlexBox } from '@dudoong/ui';
import styled from '@emotion/styled';

const OptionList = ({
  optionItems,
}: {
  optionItems: TicketDetailResponse[] | null;
}) => {
  console.log(optionItems);
  if (!optionItems?.length) {
    return <div>아무것도 없음ㅋ</div>;
  } else {
    return (
      <>
        <FlexBox direction="column" align="flex-start">
          <div>
            <ListHeader padding={0} size="listHeader_18" title="옵션 목록" />
            <Spacing size={42} />
          </div>
          <Wrapper>옵션 내용 어쩌구</Wrapper>
        </FlexBox>
      </>
    );
  }
};

export default OptionList;

const Wrapper = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
