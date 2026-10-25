import { ListRow, Padding, Text, ToggleButton } from '@dudoong/ui';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import { UserApi } from '@lib/apis/user/UserApi';
import { UserInfo } from '@lib/apis/user/userType';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const formatToday = () => {
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${today.getFullYear()}.${pad(today.getMonth() + 1)}.${pad(
    today.getDate(),
  )}`;
};

const MarketingSetting = ({ initialAgree }: { initialAgree: boolean }) => {
  const { setToast } = useToastify();
  const [agree, setAgree] = useState(initialAgree);
  // ToggleButton 이 내부 상태를 가지므로 실패 시 key 를 바꿔 원래 값으로 되돌린다
  const [resetKey, setResetKey] = useState(0);

  const { mutate, isLoading } = useMutation(UserApi.TOGGLE_MARKETING_AGREE, {
    onSuccess: (info: UserInfo) => {
      setAgree(info.marketingAgree);
      // 정보통신망법 제50조⑧: 수신 동의·철회 처리 결과(전송자, 일자, 처리 내용) 통지
      setToast({
        comment: `${
          info.marketingAgree
            ? '마케팅 정보 수신에 동의했어요'
            : '마케팅 정보 수신을 거부했어요'
        } (${formatToday()}, 두둥)`,
        type: 'success',
      });
    },
    onError: () => {
      setResetKey((key) => key + 1);
      setToast({
        comment: '설정을 바꾸지 못했어요. 잠시 후 다시 시도해주세요.',
      });
    },
  });

  return (
    <>
      <ListRow
        text="이벤트·혜택 정보 받기"
        subText="새 공연 소식과 이벤트 혜택을 보내드려요"
        rightElement={
          <ToggleButton
            key={`${agree}-${resetKey}`}
            toggle={agree}
            disabled={isLoading}
            onToggleClick={() => mutate()}
            aria-label="이벤트·혜택 정보 받기"
          />
        }
      />
      <Padding size={[0, 24, 16, 24]}>
        <Text typo="P_Text_12_R" color="gray_400">
          예매·취소·환불 안내는 설정과 관계없이 보내드려요.
        </Text>
      </Padding>
    </>
  );
};

export default MarketingSetting;
