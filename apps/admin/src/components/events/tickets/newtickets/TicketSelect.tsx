import {
  FlexBox,
  ListHeader,
  SelectButton,
  Spacing,
  Tag,
  Text,
} from '@dudoong/ui';
import { ReactComponent as Recommendation } from '@assets/recommendation.svg';

import styled from '@emotion/styled';
import {
  Control,
  Controller,
  FieldValues,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { CreateTicketRequest, payType } from '@lib/apis/ticket/ticketType';
import { useEffect, useState } from 'react';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useNavigate } from 'react-router-dom';

type payInfoType = {
  [key in payType]: string;
};

const PAY_INFO: payInfoType = {
  두둥티켓: '계좌송금 옵션을 통해 수수료 없이 티켓값을 받을 수 있어요.',
  무료티켓: '금액을 받지 않는 무료티켓이에요.',
  유료티켓: '두둥의 결제 서비스를 통해 편하게 티켓값을 받을 수 있어요.',
};

const TicketSelect = ({
  partner,
  control,
  hostId,
  reset,
}: {
  partner: boolean | null;
  control: Control<FieldValues, any>;
  hostId: number | null;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const [payType, setPayType] = useState<payType>();
  const [payInfo, setPayInfo] = useState<string>(
    '새로 생성할 티켓의 종류를 선택해주세요.',
  );
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      payType === '두둥티켓' ||
      payType === '무료티켓' ||
      payType === '유료티켓'
    ) {
      setPayInfo(PAY_INFO[payType]);
    }
    reset({
      ticketName: '',
      description: '',
      price: '',
      approveType: {
        if(payType: payType) {
          payType === '유료티켓' ? '선착순' : '승인';
        },
      },
      purchaseLimit: 1,
      supplyCount: '',
      quantity: '',
      isQuantityPublic: true,
      payType: payType,
      name: '',
    });
  }, [payType]);

  return (
    <Wrapper>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title={
          <FlexBox align="center" gap={16}>
            <div>티켓 종류</div>
            <Tag
              text="유료티켓은 어떻게 이용하나요?"
              color="red"
              size="md"
              onClick={() =>
                openOverlay({
                  content: 'paidTicket',
                  props: {
                    paidTicketHandler: () => {
                      navigate(`/hosts/${hostId}/alliance`);
                      closeOverlay();
                    },
                  },
                })
              }
            />
          </FlexBox>
        }
        description={
          <Text typo="P_Text_16_M" color="gray_400">
            {payInfo}
          </Text>
        }
      />
      <Spacing size={12} />

      <Controller
        rules={{ required: true }}
        control={control}
        name="payType"
        render={({ field: { onChange } }) => (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: '10px',
            }}
          >
            <SelectButton
              text="두둥티켓"
              fullWidth={true}
              isSelected={payType === '두둥티켓'}
              onClick={() => {
                setPayType('두둥티켓');
                onChange('두둥티켓');
              }}
            />
            <SelectButton
              text="무료티켓"
              fullWidth={true}
              isSelected={payType === '무료티켓'}
              onClick={() => {
                setPayType('무료티켓');
                onChange('무료티켓');
              }}
            />
            <SelectButton
              text="유료티켓"
              fullWidth={true}
              isSelected={payType === '유료티켓'}
              disabled={!partner}
              onClick={() => {
                setPayType('유료티켓');
                onChange('유료티켓');
              }}
            />
          </div>
        )}
      />
      <div className="recommendation">
        <Recommendation />
      </div>
    </Wrapper>
  );
};

export default TicketSelect;

const Wrapper = styled.div`
  height: 114px;
  position: relative;

  .recommendation {
    z-index: 1;
    position: absolute;

    width: 33px;
    height: 33px;

    left: 96px;
    top: 54px;
  }
`;
