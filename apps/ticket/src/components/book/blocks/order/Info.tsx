import { Accordion, ListRow, Text } from '@dudoong/ui';
import styled from '@emotion/styled';

const Info = () => {
  return (
    <>
      <Accordion
        textColor={'gray_400'}
        content={
          <Content>
            <ul>
              {/* 혹시 몰라서 주석으로 함 */}
              {/* <li>본 공연은 1인 4매까지 예매 가능합니다.</li> */}
              <li>예매한 티켓의 QR코드를 통해 입장 확인을 진행합니다.</li>
              <li>
                티켓 구매시 선택한 옵션은 추후 변경 불가합니다.
                <br />
                구매 전 신중히 확인 부탁드립니다.
              </li>
              <li>
                이 외 문의사항 발생시 두둥 카카오톡 채널로 문의부탁드립니다.
              </li>
            </ul>
          </Content>
        }
        title={'유의사항'}
      />
      <Accordion
        textColor={'gray_400'}
        content={
          <Content>
            <>
              <ListRow
                text={
                  <Text typo="P_Text_16_R" color="gray_300">
                    취소 기한
                  </Text>
                }
                rightElement={
                  <Text typo="P_Text_16_R" color="gray_300">
                    공연 시작 전 까지
                  </Text>
                }
              />
              <ul>
                <li>취소기한 이전까지 수수료 없이 환불 가능합니다.</li>
                <li>공연 입장확인이 된 티켓이 있을경우 환불이 불가합니다.</li>
                <li>환불 방법 : 티켓 예매 상세내역{'>'}예매취소</li>
                <li>
                  환불 금액 : 당사에서는 주문에 대해 즉시 취소를 하고, 취소
                  금액에 대한 입금은 카드사 영업일 기준 4~5일이 소요될 수
                  있습니다.
                </li>
              </ul>
            </>
          </Content>
        }
        title={'환불규정'}
      />
    </>
  );
};

export default Info;

const Content = styled.div`
  ul {
    padding: 20px 24px;
    padding-left: 44px;
  }
  li {
    list-style: disc;
    ${({ theme }) => theme.typo.P_Text_14_M}
    color :${({ theme }) => theme.palette.gray_300};
  }
`;
