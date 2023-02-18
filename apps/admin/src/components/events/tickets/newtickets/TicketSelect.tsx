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
import { Control, Controller, FieldValues } from 'react-hook-form';
import { payType } from '@lib/apis/ticket/ticketType';
import { useState } from 'react';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useNavigate } from 'react-router-dom';

const TicketSelect = ({
  partner,
  control,
  hostId,
}: {
  partner: boolean | null;
  control: Control<FieldValues, any>;
  hostId: number | null;
}) => {
  const [payType, setPayType] = useState<payType>();
  const { isOpen, openOverlay, closeOverlay } = useGlobalOverlay();
  const navigate = useNavigate();

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
            새로 생성할 티켓의 종류를 선택해주세요.
          </Text>
        }
      />
      <Spacing size={24} />

      <Controller
        rules={{ required: true }}
        control={control}
        name="payType"
        render={({ field: { onChange } }) => (
          <FlexBox align="center" justify="flex-start" gap={12}>
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
          </FlexBox>
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
  width: 396px;
  height: 114px;

  .recommendation {
    z-index: 1;
    position: relative;

    width: 33px;
    height: 33px;

    left: 96px;
    top: -72px;
  }
`;
