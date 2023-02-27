import {
  ListHeader,
  Spacing,
  theme,
  Text,
  Divider,
  Padding,
  FlexBox,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import { DudoongOne } from '@assets/stickers';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import OptionDropArea from './OptionDropArea';
import OptionApi from '@lib/apis/option/OptionApi';
import { soldOptionState } from '@store/soldOption';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const TicketListOption = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const [soldOptions, setSoldOptions] = useRecoilState(soldOptionState);
  const { data, isSuccess } = useQuery(['AppliedTicket', eventId], () =>
    OptionApi.GET_EVENTS_APPLIEDOPTIONGROUPS(eventId),
  );

  useEffect(() => {
    if (isSuccess && data?.appliedOptionGroups.length > 0) {
      const parsingOption = new Set(
        data.appliedOptionGroups
          .map((item) => {
            if (item.isSold == true)
              return item.optionGroups.map((item) => item.optionGroupId);
          })
          .filter((element) => element)
          .flat(),
      );
      const soldOption = [...parsingOption] as number[];
      const newSoldOption = new Set([...soldOption, ...(soldOptions || [])]);
      setSoldOptions([...newSoldOption]);
    }
  }, [isSuccess]);

  return (
    <Wrapper>
      {isSuccess && (
        <>
          <Spacing size={36} />
          <ListHeader padding={0} size="listHeader_18" title="티켓 목록" />
          <Spacing size={42} />
          {data?.appliedOptionGroups.length === 0 ? (
            <>
              <Spacing size={10} />
              <FlexBox justify={'center'} direction={'column'}>
                <DudoongOne />
                <Padding size={[23, 80, 24, 80]}>
                  <Text typo="Text_16" color="gray_500">
                    두둥! 티켓을 먼저 생성해주세요.
                  </Text>
                </Padding>
              </FlexBox>
            </>
          ) : (
            <>
              {data.appliedOptionGroups?.map((item) => (
                <div key={item?.ticketItemId}>
                  <TicketItem key={item.ticketItemId}>
                    <Text typo={'P_Header_16_SB'}>{item.ticketName}</Text>
                    <Divider line={true} />
                    <OptionDropArea
                      ticketItemId={item.ticketItemId}
                      optionGroups={item.optionGroups}
                    />
                  </TicketItem>
                  <Spacing size={16} />
                </div>
              ))}{' '}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default TicketListOption;

const Wrapper = styled.div``;

const TicketItem = styled.div`
  width: 400px;
  height: auto;
  box-sizing: border-box;
  background-color: ${theme.palette.white};
  border-radius: 12px;
  border: 1px solid ${theme.palette.black};

  padding: 24px 22px;
`;
