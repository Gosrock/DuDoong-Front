import { Text } from '@dudoong/ui';

export const FirstParagraph = () => {
  return (
    <>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        제휴기능을 통해서 유료 티켓을 판매 하실 수 있습니다.
        <br />
        유료 티켓 판매를 하게 된다면, 결제 성공 여부에 따라 자동으로 티켓을
        발급하기 때문에, <br />
        기존 통장입금 확인에 따른 승인 티켓 발급 방식보다 더 간편하게 공연관리를
        진행하실 수 있습니다.
      </Text>
    </>
  );
};

export const SecondParagraph = () => {
  return (
    <>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        다만 유료 티켓 판매를 진행하시게 될 경우 , 결제 대행사 (PG사) 의
        수수료와 부가세가 포함된 금액이
        <br />
        상품의 가격으로 책정됩니다. 따라서 회사는 주최자가 본 서비스를
        이용하면서 발생한 수수료에 대해서
        <br />
        정산서와 세금계산서를 필수적으로 발급하고 있습니다. 유료티켓을
        판매하시게 될 경우 주최자는 참가자 <br />
        모집을 통해 발생한 수익에 대해 세금을 신고하고 납부할 의무가 있습니다.
      </Text>
    </>
  );
};

export const ThirdParagraph = () => {
  return (
    <>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        제휴기능과 , 정산관련 문의는 대표전화번호와, 카카오톡 채널을 통해
        연락주시면 감사하겠습니다.
        <br />
        대표 전화번호: 010-9476-8640
      </Text>
    </>
  );
};

export const LastParagraph = () => {
  return (
    <>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        제휴 이전에도 승인 티켓과 옵션을 활용해서 질문을 통해 <br />
        통장입금을 받아서 관리자의 승인을 통한 티켓발급을 진행 하실 수 있습니다.
      </Text>
    </>
  );
};
